import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server";
import Link from "next/link"
import {LogIn} from "lucide-react"
import FileUpload from "@/components/FileUpload";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home () { 
  const {userId} = await auth()
  const isAuth = !!userId 
  const user = await currentUser()
  const name = user?.lastName || "User"

  return (
    <div  className="w-screen min-h-screen bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 ...">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         <div className="flex flex-col items-center text-center">
          <div className="flex items-center"> 
            {isAuth ? (
              <h1 className="mr-3 text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600">
                Lets Have A Chats With Your PDF {name}
              </h1>
            ) : (
              <h1 className="mr-3 text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600">Chat with any PDF
              </h1>
            )}
      
          </div>
          <div className="flex mt-2">
            {isAuth && <Button className="bg-purple-600 text-white">Go To Chats</Button>}
          </div>
               <p className="max-w-xxl mt-1 text-lg text-white">Join millions of students,reserchers and professionals to instanly answer question and understand reserch with AI </p> 
          <div className="w-full mt-4">
            { isAuth ? (<FileUpload/>):(
        
              <Link href="/sign-in">
                <Button>Log in to get  started! <LogIn className="ml-2 h-4 w-4"/></Button>
              </Link>
            )}
            
          </div>
         </div>
      </div>
    </div>
    )
}   