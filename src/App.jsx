import { useState } from "react";
import PlyInput from "./components/PlyInput";
import PanelInput from "./components/PanelInput";
import packPanelsIntoPlies from "./utils/packPanelsIntoPlies";
import "./App.css";
import Visualizer from "./components/Visualizer";

export default function App() {
  const [ply, setPly] = useState(null);
  const [panels, setPanels] = useState([]);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    if (!ply) {
      alert("Please enter ply dimensions first");
      return;
    }
    if (panels.length === 0) {
      alert("Please enter at least one panel");
      return;
    }

    const output = packPanelsIntoPlies(ply, panels);
    setResult(output);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Ply Cut Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlyInput onSubmit={setPly} />
        <PanelInput onPanelsChange={setPanels} />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Generate
      </button>

      {/* Results */}
      {result && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Packing Results</h2>

          <p className="mb-4">
            <strong>Total Plies Required:</strong> {result.pliesRequired}
          </p>

          {result.plies.map((ply, index) => (
            <div key={index} className="mb-6 p-4 border rounded bg-white">
              <h3 className="font-bold mb-2">Ply {index + 1}</h3>

              <p>
                <strong>Dimensions:</strong> {ply.width} × {ply.height}
              </p>

              <h4 className="font-semibold mt-3">Panels Placed:</h4>
              <ul className="list-disc ml-6">
                {ply.panels.map((panel, i) => (
                  <li key={i}>
                    {panel.name} — {panel.width}×{panel.height} at ({panel.x},
                    {panel.y}){panel.rotated && " (rotated)"}
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold mt-3">Waste Rectangles:</h4>
              <ul className="list-disc ml-6">
                {ply.wasteRectangles.map((w, i) => (
                  <li key={i}>
                    {w.width}×{w.height} at ({w.x},{w.y})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {result && <Visualizer plies={result.plies} />}
    </div>
  );
}
