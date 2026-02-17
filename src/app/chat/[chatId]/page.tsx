import react from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/chatcomponent";
type Props = {
    params: {
        chatId: string;
    };
};

const chatPage = async (props: Props) => {
    const{pdfUrl} = chats
    const params = await props.params
    const chatId = params.chatId; 
    const {userId} = await auth();
    if (!userId) {
       return redirect("/sign-in");
    }

    const _chat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (!_chat) {
        return redirect("/");
    }
    if (!_chat.find(chat => chat.id === parseInt(chatId))) {
        return redirect("/");   
    }


    const currentChat = _chat.find(chat => chat.id === parseInt(chatId));
    return(
     <div className="flex max-h-screen">
        <div className="flex w-full max-h-screen rounded-r-full ">
             {/* Chat sidebar */}
            <div className="flex-[1] max-w-xs">
                 <ChatSideBar chats={_chat} chatId={parseInt(chatId)} />
            </div>
            {/* pdfviewer} */}
            <div className="max-h-screen p-4 flex-[5]">
                  <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
            </div>
            {/* Chat area */}
            <div className="flex-[3] border-1-4 border-1-slate-200">
                <ChatComponent/>
            </div>
        </div>  
    </div>
 )

}

export default chatPage;