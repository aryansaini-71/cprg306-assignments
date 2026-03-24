"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import Link from "next/link";

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState<any[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (user) {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleAddItem = async (newItem: any) => {
    if (user) {
      const id = await addItem(user.uid, newItem);
      const itemWithId = { ...newItem, id: id };
      setItems((prevItems) => [...prevItems, itemWithId]);
    }
  };

  const handleItemSelect = (name: string) => {
    const cleanedName = name.split(",")[0].trim().replace(/[^\w\s]/gi, "");
    setSelectedItemName(cleanedName);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link href="/week-9" className="text-blue-400 hover:underline">
          Return to Login Page
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500">Shopping List</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
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