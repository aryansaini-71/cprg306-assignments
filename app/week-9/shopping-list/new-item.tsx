"use client";

import { useState } from 'react';

interface NewItemProps {
  onAddItem: (item: any) => void;
}

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      quantity: quantity,
      category: category,
    };
    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <div className="flex justify-center mb-10 border-orange-500 border-2 rounded-md p-6 ">
      <form onSubmit={handleSubmit} className="p-8 bg-slate-100 rounded-lg shadow-lg w-96 text-black ">
        <div className="mb-4">
          <label className="block mb-1 font-bold">Item Name:</label>
          <input
            type="text"
            placeholder="Enter item name"
            required
            value={name}
            onBlur={() => setNameTouched(true)}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${nameTouched && !name ? "border-red-500" : "border-gray-300"}`}
          />
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-bold">Quantity:</label>
            <input
              type="number" min="1" max="99" required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-bold">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-[42px]"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen">Frozen Foods</option>
              <option value="canned">Canned Goods</option>
              <option value="dry">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={!name} className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-400">
          Add Item
        </button>
      </form>
    </div>
  );
}