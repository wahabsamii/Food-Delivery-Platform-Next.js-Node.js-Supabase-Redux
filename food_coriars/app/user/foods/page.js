"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { serverUrl } from "../../lib/api";

export default function FoodsPage() {
    const router = useRouter();
    const [foods, setFoods] = useState([]);
    useEffect(() => {
    (async function fetch() {
      const res = await axios.get(`${serverUrl}/api/foods`);
      setFoods(res.data);
    })();
  }, []);

return (
<div>
    <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Foods</h1>
        </div>
        
    </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {foods.map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-orange-500">
            ${item.price}
          </span>

          <button className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


</div>
);
}