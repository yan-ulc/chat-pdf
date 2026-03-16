import { cn } from "@/lib/utils";
import { Message } from "ai/react";

type Props = {
  message: Message[];
};

const MessageList = ({ message }: Props) => {
  if (message.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 px-4">
      {message.map((messaage) => {
        return (
          <div
            key={messaage.id}
            className={cn("flex", {
              "justify-end pl-10": messaage.role === "user",
              "justify-start pr-10": messaage.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-xl px-3 text-sm  py-2 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-purple-600 text-white": messaage.role === "assistant",
                  "bg-fuchsia-400 text-white": messaage.role === "user",
                },
              )}
            >
              {messaage.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
