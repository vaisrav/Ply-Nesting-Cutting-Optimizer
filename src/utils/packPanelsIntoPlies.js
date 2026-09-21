// src/utils/packPanelsIntoPlies.js

export default function packPanelsIntoPlies(ply, panels) {
  const plyWidth = Number(ply.length);
  const plyHeight = Number(ply.breadth);
  const kerf = Number(ply.kerf);
  const kerfPadding = kerf * 2;

  // 1. Expand quantities → flatten list
  let expandedPanels = [];
  panels.forEach((p) => {
    for (let i = 0; i < Number(p.quantity); i++) {
      expandedPanels.push({
        name: p.name,

        // REAL panel size (for output)
        realWidth: Number(p.length),
        realHeight: Number(p.breadth),

        //EFFECTIVE panel size (for packing)
        width: Number(p.length) + kerfPadding,
        height: Number(p.breadth) + kerfPadding,
      });
      console.log("expandedPanels:", expandedPanels)
    }
  });

  // 2. Sort by longest side (descending)
  expandedPanels.sort((a, b) => {
    const longestA = Math.max(a.width, a.height);
    const longestB = Math.max(b.width, b.height);
    return longestB - longestA;
  });

  let plies = [];

  // Start first ply
  let currentPly = createNewPly(plyWidth, plyHeight);

  for (const panel of expandedPanels) {
    const placement = findBestPlacement(panel, currentPly.freeRects);

    if (!placement) {
      // Start a new ply
      plies.push(currentPly);
      currentPly = createNewPly(plyWidth, plyHeight);

      const newPlacement = findBestPlacement(panel, currentPly.freeRects);
      if (!newPlacement) {
        console.error("Panel does not fit even in empty ply:", panel);
        continue;
      }
      placePanel(newPlacement, currentPly);
    } else {
      placePanel(placement, currentPly);
    }
  }

  // Push last ply
  plies.push(currentPly);

  return {
    pliesRequired: plies.length,
    plies,
  };
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function createNewPly(width, height) {
  return {
    width,
    height,
    panels: [],
    freeRects: [
      { x: 0, y: 0, width, height }
    ],
    wasteRectangles: []
  };
}

function findBestPlacement(panel, freeRects) {
  let best = null;

  freeRects.forEach((rect, index) => {
    const fitsNormal = panel.width <= rect.width && panel.height <= rect.height;
    const fitsRotated = panel.height <= rect.width && panel.width <= rect.height;

    if (!fitsNormal && !fitsRotated) return;

    const leftoverNormal = fitsNormal
      ? rect.width * rect.height - panel.width * panel.height
      : Infinity;

    const leftoverRotated = fitsRotated
      ? rect.width * rect.height - panel.height * panel.width
      : Infinity;

    const shapePenalty = Math.abs(rect.width - rect.height);

    const scoreNormal = leftoverNormal + shapePenalty;
    const scoreRotated = leftoverRotated + shapePenalty;

    let chosenScore = Math.min(scoreNormal, scoreRotated);
    let rotated = scoreRotated < scoreNormal;

    if (!best || chosenScore < best.score) {
      best = {
        rectIndex: index,
        rect,
        rotated,
        score: chosenScore,
        width: rotated ? panel.height : panel.width,
        height: rotated ? panel.width : panel.height,
        panel
      };
    }
  });

  return best;
}

function placePanel(placement, ply) {
  const { rectIndex, rect, width, height, panel, rotated } = placement;

  // 1. Add placed panel
  ply.panels.push({
    name: panel.name,
    x: rect.x,
    y: rect.y,
    width: panel.realWidth,
    height: panel.realHeight,
    rotated
  });

  // 2. Remove used rectangle
  ply.freeRects.splice(rectIndex, 1);

  // 3. Split into right + bottom rectangles
  const rightRect = {
    x: rect.x + width,
    y: rect.y,
    width: rect.width - width,
    height: height
  };

  const bottomRect = {
    x: rect.x,
    y: rect.y + height,
    width: rect.width,
    height: rect.height - height
  };

  // 4. Add valid rectangles
  [rightRect, bottomRect].forEach((r) => {
    if (r.width > 0 && r.height > 0) {
      ply.freeRects.push(r);
    }
  });

  // 5. Track waste rectangles (optional)
  ply.wasteRectangles = [...ply.freeRects];

  // 6. Remove rectagles that dont fit with in kerf
  ply.freeRects = ply.freeRects.filter(r => r.width >= 20 && r.height >= 20);

}
