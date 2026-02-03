"use client";

import {useState} from 'react';

export default function NewItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('Produce');
    const [nameTouched, setNameTouched] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(name.length < 2) {
            alert("Name Lenghth must be Greater than 2");
            return;
        }
        const item = {
          name: name,
          quantity: quantity,
          category: category,
        };
        console.log(item);
        alert(`Added: ${name} | Quantity: ${quantity} | Category: ${category}`);
        setName("");
        setQuantity(1);
        setCategory("Produce");
        setNameTouched(false);
    };

return (
    <div className="flex justify-center mt-10">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-slate-100 rounded-lg shadow-lg w-96 text-black"
      >
        <div className="mb-4">
          <label className="block mb-1 font-bold">Item Name:</label>
          <input
            type="text"
            placeholder="Enter item name"
            required
            value={name}
            onBlur={() => setNameTouched(true)}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${
              nameTouched && !name ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex gap-4 mb-4">
          {/* Quantity Field */}
          <div className="flex-1">
            <label className="block mb-1 font-bold">Quantity:</label>
            <input
              type="number"
              min="1"
              max="99"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))} // Convert text to a number!
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
          {nameTouched && !name && (
            <p className="text-red-500 text-sm mt-1">Name is required!</p>
          )}
        </div>
        <p className="text-gray-500 text-xs italic">More fields coming soon...</p>

        <button
        type="submit"
        disabled={!name}
        className="w-full py-2 px-4 mt-4 bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
        Add Item
        </button>
      </form>
      
    </div>
  );
}