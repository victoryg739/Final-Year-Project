import React, { useState, useRef, useEffect } from "react";
import useWebRTCAudioSession from "../../../utils/use-webrtc";
import Image from "next/image";
import drPoppy from "/public/dr_poppy.png";
import { FaMicrophone } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";

export default function VoiceChat() {
  const { status, isSessionActive, handleStartStopClick, sendTextMessage } = useWebRTCAudioSession("alloy", []);
  const videoRef = useRef(null); // Reference to control the video element

  // Ensure video loops and plays when session is active
  useEffect(() => {
    if (videoRef.current) {
      if (isSessionActive) {
        videoRef.current.play(); // Start playing when session is active
      } else {
        videoRef.current.pause(); // Pause when session is inactive
        videoRef.current.currentTime = 0; // Reset to start
      }
    }
  }, [isSessionActive]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Static image shown when inactive, hidden when active */}
      <Image
        src={drPoppy}
        alt="Dr Poppy"
        width={260}
        height={260}
        style={{ display: isSessionActive ? "none" : "block" }}
      />
      {/* Animated video shown when active, hidden when inactive */}
      <video
        ref={videoRef}
        src="/dr_poppy_speech.mp4"
        width={200}
        height={200}
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          display: isSessionActive ? "block" : "none",
          clipPath: "inset(0px 0px 10px 0px)",
        }}
      />
      <h1 className="text-3xl font-semibold text-blue-600 mb-6 mt-4">Hi, I am Dr Poppy</h1>
      <p className="text-gray-700 mb-10 px-12">
        I’m an AI counselor specializing in Cognitive Behavioral Therapy (CBT), psychology, and therapeutic guidance.
        Ask me about mental health or CBT techniques!
      </p>
      <button
        onClick={handleStartStopClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center mx-auto"
        aria-label={isSessionActive ? "Stop session" : "Start session"}
      >
        {isSessionActive ? "Stop" : "Start"}
        <span className="ml-2">{isSessionActive ? <FaStopCircle /> : <FaMicrophone />}</span>
      </button>
      <p className="mt-4 text-sm text-gray-600 flex items-center justify-center">
        <span className={`w-2 h-2 rounded-full mr-2 ${isSessionActive ? "bg-green-500" : "bg-red-500"}`}></span>
        Status: {status}
      </p>{" "}
    </div>
  );
}
