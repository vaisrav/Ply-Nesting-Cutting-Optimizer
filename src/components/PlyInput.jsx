import { useState } from "react";

export default function PlyInput({ onSubmit }) {
  const [form, setForm] = useState({
    length: "2440",
    breadth: "1220",
    thickness: 18,
    kerf: 3,
  });

  const [savedPly, setSavedPly] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.length || !form.breadth) {
      alert("Please enter ply dimensions");
      return;
    }

    const plyData = {
      length: Number(form.length),
      breadth: Number(form.breadth),
      thickness: Number(form.thickness),
      kerf: Number(form.kerf),
    };

    setSavedPly(plyData);
    onSubmit(plyData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Enter Ply Dimensions</h2>

      <form className="space-y-4 max-w-md p-4 border rounded-lg bg-white">
        <div>
          <label className="block mb-1 font-medium">Length (mm)</label>
          <input
            type="number"
            name="length"
            value={form.length}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Breadth (mm)</label>
          <input
            type="number"
            name="breadth"
            value={form.breadth}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Thickness</label>
          <input
            type="number"
            name="thickness"
            value={form.thickness}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Kerf (mm)</label>
          <input
            type="number"
            name="kerf"
            value={form.kerf}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Enter Ply
        </button>
      </form>

      {savedPly && (
        <div className="mt-6 p-4 border rounded-lg ">
          <h2 className="font-bold mb-2">Ply Entered</h2>

          <ul className="space-y-2">
            <li className="border p-3 rounded ">
              <p><strong>Length:</strong> {savedPly.length} mm</p>
              <p><strong>Breadth:</strong> {savedPly.breadth} mm</p>
              <p><strong>Thickness:</strong> {savedPly.thickness}</p>
              <p><strong>Kerf:</strong> {savedPly.kerf} mm</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
