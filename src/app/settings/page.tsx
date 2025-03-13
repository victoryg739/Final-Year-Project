"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function SettingsPage() {
  const [responseDelay, setResponseDelay] = useState(2000);
  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [username, setUsername] = useState(""); // Initially empty username state

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      setUsername(data.user.username); // Set username from the logged-in user
    }
    fetchUser();
  }, []);

  console.log(username);

  useEffect(() => {
    if (username) {
      async function fetchSettings() {
        const res = await fetch(`/api/settings?username=${username}`);
        const data = await res.json();
        if (data) {
          setResponseDelay(data.responseDelay || 2000);
          setOpenAiApiKey(data.openAiApiKey || "");
        }
      }
      fetchSettings();
    }
  }, [username]);

  const handleSave = async () => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, responseDelay, openAiApiKey }),
    });

    if (res.ok) {
      alert("Settings saved!");
    } else {
      alert("Failed to save settings");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-12 text-center"> Settings</h2>

        <div className="mt-6 mb-6 w-full">
          <label htmlFor="responseDelay" className="">
            Response Delay (ms): {responseDelay}
          </label>
          <input
            type="range"
            id="responseDelay"
            min="500"
            max="2500"
            step="100"
            value={responseDelay}
            onChange={(e) => setResponseDelay(Number(e.target.value))}
            className="w-full mt-5"
          />
        </div>
        <label className="block mb-4">OpenAI API Key</label>
        <input
          type="text"
          value={openAiApiKey}
          onChange={(e) => setOpenAiApiKey(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button onClick={handleSave} className="w-full bg-blue-500 text-white p-2 rounded mt-10">
          Save Settings
        </button>
      </div>
    </div>
  );
}
