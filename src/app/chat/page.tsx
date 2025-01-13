"use client";
import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

export default function Page() {
  const [diagnosis, setDiagnosis] = useState("");

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem("chatData");
    if (storedData) {
      setDiagnosis(JSON.parse(storedData));
    } else {
      console.error("No data found in sessionStorage.");
    }
  }, []);

  console.log(diagnosis);
  if (!diagnosis) {
    // Render a loading state while waiting for diagnosis
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Chat diagnosis={diagnosis} />
    </div>
  );
}
