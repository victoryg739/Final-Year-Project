import React from "react";
import { Message } from "../types/message";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.sender === "user";

  const formatText = (text: string) => {
    // Use marked to parse the Markdown
    let html = marked(text);

    // Add Tailwind classes to headings while preserving the `id` attributes
    html = html.replace(/<h1 id="([^"]+)">/g, '<h1 id="$1" class="mt-4 mb-6 text-2xl font-bold">'); // Heading 1
    html = html.replace(/<h2 id="([^"]+)">/g, '<h2 id="$1" class="mt-4 mb-5 text-xl font-bold">'); // Heading 2
    html = html.replace(/<h3 id="([^"]+)">/g, '<h3 id="$1" class="mt-4 mb-2 text-lg font-bold">'); // Heading 3
    html = html.replace(/<h4 id="([^"]+)">/g, '<h4 id="$1" class="mt-4 mb-2 text-base font-bold">'); // Heading 4
    html = html.replace(/<h5 id="([^"]+)">/g, '<h5 id="$1" class="mt-4 mb-2 text-base font-bold">'); // Heading 5
    html = html.replace(/<h6 id="([^"]+)">/g, '<h6 id="$1" class="mt-4 mb-2 text-sm font-bold">'); // Heading 6

    // Add margin to paragraphs
    html = html.replace(/<p>/g, '<p class="mb-4">'); // Margin after paragraphs

    // Add margin to list items
    html = html.replace(/<li>/g, '<li class="mb-3">'); // Margin for list items

    // Optional: Add bold and italic text styling
    html = html.replace(/<strong>/g, '<strong class="font-semibold">'); // Bold text styling
    html = html.replace(/<em>/g, '<em class="italic">'); // Italic text styling

    // Ensure blockquotes have margin and italic style
    html = html.replace(/<blockquote>/g, '<blockquote class="mb-4 italic border-l-4 pl-4 border-gray-500">'); // Blockquote style

    // Add spacing to inline elements like spans
    html = html.replace(/<span>/g, '<span class="inline-block mb-2">'); // Add margin to spans

    // Ensure code blocks and inline code are styled
    html = html.replace(/<code>/g, '<code class="bg-gray-200 p-1 rounded-sm">'); // Inline code styling
    html = html.replace(/<pre>/g, '<pre class="bg-gray-200 p-4 rounded-sm overflow-x-auto">'); // Preformatted code block styling

    // Add styling to images, if any
    html = html.replace(/<img /g, '<img class="max-w-full h-auto" '); // Ensure images are responsive

    // Use DOMPurify to sanitize the HTML output
    html = DOMPurify.sanitize(html);

    return html;
  };

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
            isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-300 text-gray-800 rounded-bl-none"
          }`}
          dangerouslySetInnerHTML={{
            __html: formatText(message.text), // Render formatted text as HTML
          }}
        />
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
