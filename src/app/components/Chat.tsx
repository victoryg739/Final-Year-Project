import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "../types/message";
import { IoMdSend } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";

const Chat: React.FC = ({ diagnosis }: any) => {
  const cleanHtmlContent = (content: string) => {
    return content.replace(/```html\n|```/g, "").trim();
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: diagnosis[diagnosis.length - 1]["content"],
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [gptMessages, setGptMessages] = useState<Message[]>(
    diagnosis.map((msg) => ({
      role: msg.role,
      content: msg.role === "assistant" ? cleanHtmlContent(msg.content) : msg.content,
    }))
  );

  const [loading, setLoading] = useState(false); // Add a loading state
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [openAiApiKey, setOpenAiApiKey] = useState("");

  useEffect(() => {
    async function fetchUsername() {
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

    fetchUsername();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      content: newMessage,
    };

    setGptMessages((prevGptMessages) => [...prevGptMessages, userMessage]);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/chatGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gptMessages: [...gptMessages, userMessage],
          openAiApiKey: openAiApiKey, // Send the username here
        }),
      });

      const gptResponse: Message[] = await response.json();

      setMessages(gptResponse.slice(2));
      setGptMessages(gptResponse);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-blue-100">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
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
          <button
            className="flex items-center rounded-xl bg-blue-500 py-1 px-2 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? (
              <>
                <IoMdRefresh className="animate-spin text-white mr-2" />
                <span className="text-white">Sending...</span>
              </>
            ) : (
              <>
                <IoMdSend className="text-white" />
                <span className="text-white font-medium ml-2">Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
