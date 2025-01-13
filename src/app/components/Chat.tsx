import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "../types/message";
import { IoMdSend } from "react-icons/io";

const Chat: React.FC = ({ diagnosis }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: diagnosis[diagnosis.length - 1]["content"],
      sender: "assistant",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    // Prepare messages for API
    const gptMessages = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Include the latest user message
    gptMessages.push({ role: "user", content: newMessage });

    const response = await fetch("/api/chatGpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gptMessages }),
    });
    // Get the updated conversation from the API
    const allMessages = await response.json();

    // Update the state with all messages
    setMessages(
      allMessages.map((msg, index) => ({
        id: index + 1,
        text: msg.content,
        sender: msg.role === "user" ? "user" : "assistant",
      }))
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white">
        <div className="flex items-center border rounded-lg px-4 py-2">
          <input
            type="text"
            className="flex-1 focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <div className="flex items-center rounded-xl bg-blue-500 py-1 px-2">
            <IoMdSend className="text-white" />
            <button className="text-white font-medium ml-2" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
