import React from "react";
import { Message } from "../types/message";
import parse from "html-react-parser"; // Library for parsing raw HTML into React elements

interface Props {
  message: Message;
}

// Helper function to clean up raw HTML responses
const cleanHtml = (text: string) => {
  if (text.startsWith("```html")) {
    // Remove ```html and ``` from the text
    return text
      .replace(/^```html*/, "")
      .replace(/```$/, "")
      .trim();
  }
  return text;
};

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className="flex max-w-xl">
        {!isUser && (
          <div className="mr-2">
            {/* Assistant Avatar */}
            <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">A</div>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-lg"
          }`}
        >
          {/* Clean and render the sanitized HTML */}
          {parse(cleanHtml(message.content))}
        </div>
        {isUser && (
          <div className="ml-2">
            {/* User Avatar */}
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">U</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
