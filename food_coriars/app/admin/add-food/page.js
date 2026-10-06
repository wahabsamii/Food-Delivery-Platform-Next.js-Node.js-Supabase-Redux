"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { serverUrl } from "../../lib/api";
export default function AddFoodPage() {
  
  const [allcat, setAllCats] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("image", image);

      await axios.post(
        `${serverUrl}/api/foods`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Food added successfully");
      setFormData({ name: "", description: "", price: "", category: "" });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
      (async function fetch() {
        const res = await axios.get(`${serverUrl}/api/category`);
        setAllCats(res.data);
      })();
    }, []);

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Food</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {
            allcat.map((item, i) => (
              <option value={item.name}>{item.name}</option>
            ))
          }
         
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="w-full"
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}
