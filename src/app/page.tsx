"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import SymptomsSearch from "./components/SymptomsSearch";
import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState([]);

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold text-center">Welcome to the Chat Application!</h1>
      <SymptomsSearch setSymptoms={setSymptoms} />
    </div>
  );
}
