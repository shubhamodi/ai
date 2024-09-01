import { Button } from '@/components/ui/button'
import { Edit, Share, Trash } from 'lucide-react'
// import { Share } from 'next/font/google'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/app/configs'
import { JsonForms } from '@/app/configs/schema'
import Link from 'next/link'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from "react-web-share";

const FormListItem = ({formRecord,jsonForm,refreshData}) => {
  const {user}=useUser();
  const onDeleteForm=async()=>{
    const result=await db.delete(JsonForms)
    .where(and(eq(JsonForms.id,formRecord.id),eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
    if(result){toast("🗑️ Deleted from Data 🗑️")
      refreshData();
    }
  }
  return (
    <div className='border shadow-sm rounded-lg p-4'>
      <div className='flex justify-between '>
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger><Trash className='text-red-600 cursor-pointer hover:scale-105 transition-all'/></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle><h1>⚠️</h1>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>onDeleteForm()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
      <h2 className='font-bold text-lg'>
        {jsonForm?.formTitle}
        {/* // ?(jsonForm?.formTitle):(jsonForm?.fieldTitle)} */}
      </h2>
      <h2 className='text-sm font-sans'>
        {jsonForm?.formSubheading}
        {/* // ?(jsonForm?.formTitle):(jsonForm?.fieldTitle)} */}
      </h2>
      <hr className='my-4'></hr>
      <div className='flex justify-between'>
      
      <RWebShare
        data={{
          text: jsonForm?.formSubheading + "Build Your customised AiForm...👇",
          url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+formRecord?.id,
          title: jsonForm?.formTitle,
        }}
        onClick={() => console.log("🚀..Shared Successfully..🚀")}
      >
        <Button variant="outline" size="sm" className="text-purple-600 flex gap-2"><Share className="h-5 w-5"/>Share</Button>
      </RWebShare>

        
        <Link href={'/edit-form/'+formRecord?.id}>
        <Button size="sm" className="flex gap-2"><Edit className="h-5 w-5"/>Edit</Button>
        </Link>
      </div>
    </div>
  )
}

export default FormListItem