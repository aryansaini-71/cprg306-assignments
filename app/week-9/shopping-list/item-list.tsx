"use client";
import { useState } from "react";
import Item from "./item"; 

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface ItemListProps {
  items: ItemType[];
  onItemSelect: (name: string) => void; 
}

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 mb-4 ">
        <button onClick={() => setSortBy("name")} className="bg-blue-600 p-2 rounded">Sort Name</button>
        <button onClick={() => setSortBy("category")} className="bg-blue-600 p-2 rounded">Sort Category</button>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <Item 
            key={item.id} 
            {...item} 
            onSelect={onItemSelect} 
          />
        ))}
      </ul>
    </div>
  );
}