"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Shopping List App</h1>
      
      {!user ? (
        // User is NOT logged in
        <button 
          onClick={handleLogin}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with GitHub
        </button>
      ) : (
        // User IS logged in
        <div className="text-center">
          <p className="mb-4">Welcome, {user.displayName} ({user.email})</p>
          <div className="flex gap-4 justify-center">
            <Link href="/week-8/shopping-list" className="hover:underline text-blue-400">
              Go to Shopping List
            </Link>
            <button onClick={handleLogout} className="hover:underline text-red-400">
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}