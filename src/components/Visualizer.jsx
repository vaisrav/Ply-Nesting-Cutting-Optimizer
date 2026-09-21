import { useEffect, useRef } from "react";

export default function Visualizer({ plies }) {
  return (
    <div className="space-y-10 mt-10">
      {plies.map((ply, index) => (
        <PlyCanvas key={index} ply={ply} index={index} />
      ))}
    </div>
  );
}

function PlyCanvas({ ply, index }) {
  const canvasRef = useRef(null);
  const kerf = ply.kerf;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas size
    canvas.width = 900;
    canvas.height = 450;

    // Scale factor to fit ply inside canvas
    const scaleX = canvas.width / ply.width;
    const scaleY = canvas.height / ply.height;
    const scale = Math.min(scaleX, scaleY);

    // Draw ply background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw panels
    ply.panels.forEach((panel) => {
      const x = panel.x * scale;
      const y = panel.y * scale;
      const w = panel.width * scale;
      const h = panel.height * scale;

      // Draw panel rectangle
      ctx.fillStyle = panel.rotated ? "#4ade80" : "#60a5fa"; // green or blue
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = "#000";
      ctx.strokeRect(x, y, w, h);

      // Draw panel labels
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(panel.name, x + 4, y + 14);
      ctx.fillText(`${panel.width}×${panel.height}`, x + 4, y + 28);

      // -------------------------------
      // ⭐ Draw kerf boundary (effective size)
      // -------------------------------
      const kerfW = (panel.width + kerf * 2) * scale;
      const kerfH = (panel.height + kerf * 2) * scale;

      ctx.strokeStyle = "red";
      ctx.setLineDash([4, 4]); // dashed kerf line
      ctx.strokeRect(x - 10 * scale, y - 10 * scale, kerfW, kerfH);

      ctx.setLineDash([]); // reset dash
    });

    // Draw waste rectangles with dimensions
    ctx.strokeStyle = "#aaa";
    ply.wasteRectangles.forEach((w) => {
      const x = w.x * scale;
      const y = w.y * scale;
      const width = w.width * scale;
      const height = w.height * scale;

      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = "#555";
      ctx.font = "12px Arial";
      ctx.fillText(`${w.width}×${w.height}`, x + 4, y + 14);
    });
  }, [ply]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Ply {index + 1}</h2>
      <canvas ref={canvasRef} className="border rounded" />

      <button
        onClick={() => exportCanvas(canvasRef)}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export as PNG
      </button>
    </div>
  );
}

function exportCanvas(canvasRef) {
  const canvas = canvasRef.current;
  const link = document.createElement("a");
  link.download = "ply-layout.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
