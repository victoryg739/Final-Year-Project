"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link"; 
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-10 text-center">Login</h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-6 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-6 border rounded"
              required
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 mb-3 text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
