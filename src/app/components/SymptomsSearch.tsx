import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { symptomsTemplate } from "../../../utils/prompts";
import { IoMdRefresh } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import drPoppy from "/public/dr_poppy.png";

const SymptomsSearch = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openAiApiKey, setOpenAiApiKey] = useState("");

  useEffect(() => {
    async function fetchOpenAiApiKey() {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      if (data.isLoggedIn) {
        const res = await fetch(`/api/settings?username=${data.user.username}`);
        const dataSettings = await res.json();
        if (dataSettings && dataSettings.openAiApiKey) {
          setOpenAiApiKey(dataSettings.openAiApiKey);
        }
      }
    }
    fetchOpenAiApiKey();
  }, []);

  const handleSubmit = async () => {
    if (description.trim().length < 12) {
      setError("Description must be at least 12 characters long.");
      return;
    }

    setError(""); // Reset the error state when description is valid
    setLoading(true);

    try {
      const gptMessages = [
        { role: "system", content: symptomsTemplate },
        { role: "user", content: description },
      ];

      const response = await fetch("/api/chatGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gptMessages, openAiApiKey }),
      });

      if (!response.ok) {
        // Check if the response status is not OK and throw an error
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch data from ChatGPT.");
      }

      const data = await response.json();
      sessionStorage.setItem("chatData", JSON.stringify(data));
      router.push("/chat");
    } catch (error) {
      // Display specific error message based on where the error occurred
      if (error instanceof Error) {
        setError(`Something went wrong: ${error.message}`);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Image src={drPoppy} alt="Dr Poppy" width={260} height={260} />

      <main className="flex flex-col items-center w-full max-w-xl mt-10">
        <textarea
          placeholder="Type here!"
          className="w-full h-32 p-4 border-2 border-blue-600 rounded-md text-black"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className="text-sm text-gray-400 mt-2">
          For the best results, please describe the symptoms and how long they have persisted.
        </p>
        {error && <div className="text-red-500 mt-1">{error}</div>}
        <button
          className="mt-4 mb-10 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <IoMdRefresh className="animate-spin text-white mr-2" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Search</span>
              <IoIosSearch className="text-white ml-2" />
            </div>
          )}
        </button>
      </main>
    </div>
  );
};

export default SymptomsSearch;
