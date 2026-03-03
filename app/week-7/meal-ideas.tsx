"use client";

import React, { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals; 
}

interface MealIdeasProps {
  ingredient: string;
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {

  const [meals, setMeals] = useState<any[]>([]);

  const loadMealIdeas = async () => {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals || []);
  };

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  return (
    <div className="p-4 bg-slate-900 rounded-lg shadow-xl text-white border-orange-500 border-2 rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Meal Ideas for "{ingredient}"</h2>
      
      {meals.length === 0 ? (
        <p className="text-gray-400 italic">Select an item to see meal ideas.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-2">
          {meals.map((meal) => (
            <li 
              key={meal.idMeal} 
              className="p-3 bg-slate-800 hover:bg-orange-500 transition-colors rounded cursor-default"
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}