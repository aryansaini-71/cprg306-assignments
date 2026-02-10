"use client";

import { useState } from "react";
import Item from "./items";
import itemsData from "./items.json";

interface ItemObject {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const items = [...itemsData];

  items.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = itemsData.reduce((acc: any, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="flex flex-col items-center w-full border-orange-500 border-2 rounded-md p-6">
      
      <div className="mb-8 flex flex-wrap justify-center items-center gap-3 ">
        <label className="text-white font-small">Sort by:</label>
        
        <button
          onClick={() => setSortBy("name")}
          style={{ backgroundColor: sortBy === "name" ? "#0587dd" : "#000000" }}
          className="px-5 py-2 text-white rounded shadow-md transition-all"
        >
          Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          style={{ backgroundColor: sortBy === "category" ? "#0587dd" : "#000000" }}
          className="px-5 py-2 text-white rounded shadow-md transition-all"
        >
          Category
        </button>

        <button
          onClick={() => setSortBy("grouped")}
          style={{ backgroundColor: sortBy === "grouped" ? "#0587dd" : "#000000" }}
          className="px-5 py-2 text-white rounded shadow-md transition-all"
        >
          Grouped Category
        </button>
      </div>

      <ul className="w-full max-w-md ">
        {sortBy === "grouped" ? (
          sortedCategories.map((cat) => (
            <div key={cat} className="mb-6">
              <h2 className="text-blue-400 text-2xl capitalize border-b border-blue-900 mb-2">
                {cat}
              </h2>
              {groupedItems[cat].sort((a: any, b: any) => a.name.localeCompare(b.name)).map((item: any) => (
                <Item key={item.id} {...item} />
              ))}
            </div>
          ))
        ) : (
          items.map((item) => (
            <Item key={item.id} {...item} />
          ))
        )}
      </ul>
    </div>
  );
}