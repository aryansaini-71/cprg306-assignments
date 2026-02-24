"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);

  const handleAddItem = (newItem: ItemType) => {
    setItems([...items, newItem]);
  };

  return (
    <main className="bg-black min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center p-4 rounded-md border-orange-500 border-2">
          Shopping List
        </h1>

        <NewItem onAddItem={handleAddItem} />

        <ItemList items={items} />
      </div>
    </main>
  );
}