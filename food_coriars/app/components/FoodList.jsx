"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import serverUrl from '@/config/server';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    (async function fetchFoods() {
      const res = await axios.get(`${serverUrl}/api/foods`);
      setFoods(res.data);
    })();
  }, []);

  return (
    <section id="foods" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">Popular Foods</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </section>
  );
};

export default FoodList;
