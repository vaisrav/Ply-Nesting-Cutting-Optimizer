import { useState } from "react";

export default function PanelInput() {
  const [form, setForm] = useState({
    name: "",
    length: "",
    breadth: "",
    quantity: "",
  });

  const [panels, setPanels] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // numeric validation
    if (["length", "breadth", "quantity"].includes(name)) {
      if (value === "" || Number(value) > 0) {
        setForm({ ...form, [name]: value });
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleAddPanel = () => {
    // basic validation
    if (!form.name || !form.length || !form.breadth || !form.quantity) {
      alert("please fill all fields");
      return;
    }

    // add panel to list
    setPanels([...panels, form]);

    //clearing form for next input
    setForm({
      name: "",
      length: "",
      breadth: "",
      quantity: "",
    });
  };

  return (
    <div className="p-4">
      <h2 className="p-4">Enter Panel dimensions</h2>
      <form
        className="space-y-4 max-w-md p-4 border rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter name"
          />
        </div>

        {/* Length */}
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

        {/* Breadth */}
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

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter quantity"
            min="1"
          />
        </div>

        <button
          type="button"
          onClick={handleAddPanel}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Add Panel
        </button>
      </form>

      {/* Output panel list*/}
      {panels.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="font-bold mb-2">Panels Entered</h2>

          <ul className="space-y-2">
            {panels.map((panel, index) => (
              <li key={index} className="border p-3 rounded bg-white">
                <p>
                  <strong>Name:</strong> {panel.name}
                </p>
                <p>
                  <strong>Length:</strong> {panel.length}
                </p>
                <p>
                  <strong>Breadth:</strong> {panel.breadth}
                </p>
                <p>
                  <strong>Quantity:</strong> {panel.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
