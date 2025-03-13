"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Signup successful! You can now login.");
    } else {
      setMessage(data.error || "Signup failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-10 text-center">Sign Up</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-6"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
          {message && <p className="mt-3 text-red-500">{message}</p>}
          {/* Sign Up Link */}
          <p className="mt-8 mb-3 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
