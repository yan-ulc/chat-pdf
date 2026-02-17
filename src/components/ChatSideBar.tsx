import Link from "next/link";
import { PlusCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrizzleChat } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import React from "react";


type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen  text-gray-500 bg-gray-900 p-4  rounded-r-xl flex flex-col">
      
      <Link href="/">
        <Button className="w-full border-dashed  border-pink-500 border text-pink-400">
          <PlusCircle className="mr-2 w-4 h-4 text-pink-400" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4  ">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                "rounded-lg p-3 text-slate-300 flex items-center gap-2 cursor-pointer",
                {
                  "bg-purple-600 text-white": chat.id === chatId,
                  "hover:bg-fuchsia-400 hover:text-white": chat.id !== chatId,
                }
              )}
            >
              <MessageCircle className="w-4 h-4" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
          <div className=" absolute bottom-4 left-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
              <Link href="/">home </Link >
              <Link href= "/" >Source</Link>
              {/*Strips Button*/}

            </div>

          </div>

    
  </div>
  );
};

export default ChatSideBar;