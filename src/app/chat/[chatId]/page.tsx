import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/chatcomponent";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
type Props = {
  params: {
    chatId: string;
  };
};

const chatPage = async (props: Props) => {
  const params = await props.params;
  const chatId = params.chatId;
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chat = await db.select().from(chats).where(eq(chats.userId, userId));
  const parsedChatId = Number.parseInt(chatId, 10);
  if (!Number.isInteger(parsedChatId)) {
    return redirect("/");
  }

  if (!_chat.find((chat) => chat.id === parsedChatId)) {
    return redirect("/");
  }

  const currentChat = _chat.find((chat) => chat.id === parsedChatId);

  return (
    <div className="flex max-h-screen">
      <div className="flex w-full max-h-screen rounded-r-full ">
        {/* Chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chat} chatId={parsedChatId} />
        </div>
        {/* pdfviewer} */}
        <div className="max-h-screen p-4 flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* Chat area */}
        <div className="flex-[3] border-1-4 border-1-slate-200">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default chatPage;
