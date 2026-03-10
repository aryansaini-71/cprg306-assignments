"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Shopping List App</h1>

      <div className="bg-slate-900 p-8 rounded-lg shadow-2xl border border-slate-800">
        {!user ? (
          <div className="text-center">
            <p className="mb-6 text-slate-400 italic">Please sign in to manage your list.</p>
            <button
              onClick={handleLogin}
              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-all"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-2 font-semibold text-blue-400">
              Hello, {user.displayName}!
            </p>
            <p className="text-sm text-slate-400 mb-6">{user.email}</p>
            
            <div className="flex flex-col gap-4">
              <Link 
                href="/week-8/shopping-list" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-md transition-colors"
              >
                Go to Shopping List
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-400 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}