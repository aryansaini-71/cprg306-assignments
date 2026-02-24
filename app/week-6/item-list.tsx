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
}

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center w-full border-orange-500 border-2 rounded-md p-6">
      <div className="mb-8 flex flex-wrap justify-center items-center gap-3">
        <label className="text-white">Sort by:</label>
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-2 text-white rounded ${sortBy === "name" ? "bg-blue-600" : "bg-black border"}`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-5 py-2 text-white rounded ${sortBy === "category" ? "bg-blue-600" : "bg-black border"}`}
        >
          Category
        </button>
      </div>

      <ul className="w-full max-w-md">
        {sortedItems.map((item) => (
          <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
        ))}
      </ul>
    </div>
  );
}