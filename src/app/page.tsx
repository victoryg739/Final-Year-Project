"use client";
import Navbar from "./components/Navbar";
import SymptomsSearch from "./components/SymptomsSearch";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="px-16">
        <div className="max-w-xl mx-auto mt-10 mb-8">
          <h1 className="text-4xl font-bold text-center">Meet Dr Poppy</h1>
          <p className="text-center mt-5 text-gray-600">
            Your teddy bear AI doc! Tell me your symptoms, and I’ll suggest what could be happening. I’m here to help
            you feel understood and cared for!
          </p>
        </div>
        <SymptomsSearch />
      </div>
    </div>
  );
}
