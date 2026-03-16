"use client";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChatComponent = () => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="relative max-h-screen overflow-scroll">
      {/* HEADER */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      <MessageList message={messages} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white flex items-center"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask Anything About Your PDF"
          className="w-full"
        />
        <Button className="border border-pink-500 bg-transparent ml-2">
          <Send className="h-4 w-4  text-pink-500" />
        </Button>
      </form>
    </div>
  );
};

export default ChatComponent;
