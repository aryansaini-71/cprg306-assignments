"use client";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
        <p className="mb-4">You must be logged in to view this page.</p>
        <Link href="/week-8" className="text-blue-400 hover:underline">
          Return to Login Page
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
      </div>
    </main>
  );
}