"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: any) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName: string) => {
    const cleanedName = itemName
      .split(',')[0] 
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '') // Remove emojis
      .trim(); 
    
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="bg-black min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping List & Recipes</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
        
        <div className="w-full max-w-md">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="w-full max-w-md">
          <MealIdeas ingredient={selectedItemName} />
        </div>

      </div>
    </main>
  );
}