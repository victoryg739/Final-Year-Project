import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { symptomsTemplate } from "../../../utils/prompts";

const SymptomsSearch = ({ setSymptoms }) => {
  const [description, setDescription] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter(); // Router for navigation
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async () => {
    if (description.trim().length < 12) {
      setError(true); // Set error message
      return;
    }

    setError(false);
    setLoading(true); // Set loading state

    try {
      // Make the API call to ChatGPT
      const gptMessages = [
        { role: "system", content: symptomsTemplate },
        { role: "user", content: description },
      ];
      const response = await fetch("/api/chatGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gptMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from ChatGPT.");
      }

      const data = await response.json(); // Parse the response
      sessionStorage.setItem("chatData", JSON.stringify(data));

      // Navigate to the Chat page
      router.push("/chat");
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Clear loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Main content */}
      <main className="flex flex-col items-center w-full max-w-xl">
        <textarea
          placeholder="Type here!"
          className="w-full h-32 p-4 border-2 border-red-500 rounded-md text-black"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className="text-sm text-gray-400 mt-2">
          For best results, indicate when and why you think the symptoms appeared.
        </p>
        {error && <div className="text-red-500 mt-1">Description must be at least 12 characters long.</div>}
        <button
          className="mt-4 px-6 py-2  bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => handleSubmit()}
        >
          Search
        </button>
      </main>
    </div>
  );
};

export default SymptomsSearch;
