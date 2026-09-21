import { useState } from "react";

export default function PlyInput({ onSubmit }) {
  const [form, setForm] = useState({
    length: "",
    breadth: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.length || !form.breadth) {
      alert("Please enter ply dimensions");
      return;
    }

    onSubmit({
      length: Number(form.length),
      breadth: Number(form.breadth),
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className="p-4">
      <h2>Enter Ply dimensions</h2>
      <form className="space-y-4 max-w-md p-4 border rounded-lg">
        <div>
          <label className="block mb-1 font-medium">Length</label>
          <input
            type="number"
            name="length"
            value={form.length}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter length"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Breadth</label>
          <input
            type="number"
            name="breadth"
            value={form.breadth}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter breadth"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="1"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
