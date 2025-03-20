"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [responseDelay, setResponseDelay] = useState(2000);
  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [username, setUsername] = useState(""); // Initially empty username state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      setUsername(data.user.username); // Set username from the logged-in user
    }
    fetchUser();
  }, []);

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

  const handleDeleteAccount = async () => {
    const res = await fetch("/api/auth/delete-account", {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Account deleted successfully.");
      // Redirect to homepage
      router.push("/");
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-12 text-center">Settings</h2>

        <div className="mt-6 mb-6 w-full">
          <label htmlFor="responseDelay">Response Delay (ms): {responseDelay}</label>
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

        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="w-full bg-red-700 text-white p-2 rounded mt-6"
        >
          Delete Account
        </button>

        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold">Are you sure you want to delete your account?</h3>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-4"
                >
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
