import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function InfoDiv() {
  const [show, setShow] = useState(true);

  const markdown = `
## 📘 How to Use Ply Cutting Optimizer

This tool helps you generate an optimized plywood cutting layout based on the panels you need.

---

## 🪵 1. Enter Ply Dimensions
Fill in the following fields:

- **Length (mm)** — The full length of your plywood sheet  
- **Breadth (mm)** — The full width of your plywood sheet  
- **Quantity** — Number of identical sheets available  
- **Kerf (mm)** — Blade thickness.  
  - This spacing is automatically added around every panel.

After entering, click **Enter Ply**.  
You will see a summary box confirming the ply details.

---

## 📐 2. Enter Panel Dimensions
For each panel you need:

- **Name** — Any label (e.g., “Side Panel”, “Door A”)  
- **Length (mm)** — Height of the panel  
- **Breadth (mm)** — Width of the panel  
- **Quantity** — How many identical pieces you need  

Click **Add Panel**.  
Each panel will appear in the “Panels Entered” list.

---

## ⚙️ 3. Generate Cutting Layout
Click **Generate** to run the optimizer.

The algorithm will:

- Sort panels by size  
- Apply kerf spacing  
- Rotate panels when beneficial  
- Place panels efficiently  
- Create new plies if needed  
- Show waste rectangles  

---

## 🎨 4. View the Visual Layout
Each ply is drawn as a diagram:

- **Blue panels** → normal orientation  
- **Green panels** → rotated  
- **Red dashed lines** → kerf spacing  
- **Grey outlines** → waste rectangles  
- All dimensions are scaled automatically  

---

## 📤 5. Export Your Layout
You can export:

- **Individual ply** → PNG  
- **All plies together** → one combined PNG  

Perfect for printing or sharing with workshop staff.

---

## 👍 You're Ready!
Enter your ply and panels, click **Generate**, and your optimized cutting layout will appear.
`;

  if (!show) return null;

  return (
    <div className="prose prose-lg max-w-none p-6 border rounded-lg shadow">
      <button
        onClick={() => setShow(false)}
        className="float-right bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Close
      </button>

      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
