"use client";

import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useState } from "react";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        <h1 className="text-2xl font-bold">You must be logged in to view this page.</h1>
        <a href="/week-8" className="text-blue-400 underline mt-4 block">Click here to login</a>
      </div>
    );
  }

 
  const handleAddItem = (newItem: any) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName: string) => {
    const cleanedName = itemName.split(',')[0].replace(/[^\w\s]/gi, '').trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="bg-black min-h-screen p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Shopping List</h1>
        <p className="text-sm text-gray-400">Logged in as: {user.email}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}