"use client"
import { db } from "@/app/configs"
import { AiChatSession, model } from "@/app/configs/AiModal"
import { JsonForms } from "@/app/configs/schema"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import moment from "moment"
// import { routeModule } from "next/dist/build/templates/pages"
// import { routeModule } from "next/dist/build/templates/app-page"
// import { RouteModule } from "next/dist/server/future/route-modules/route-module"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"
// import { useRouter } from "next/router"
// import { useRouter } from "next/router"
import { useState } from "react"
async function run() {
    const prompt = "Write a story about an AI and magic"
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
  }
  
const PROMPT=", on the basis of description please give the form in json format with form title, form subheading with Form having form field, form name, placeholder name, and form label, fieldType, field required in json format keeping the key same every time"
const CreateForm = () => {
    const [openDialog,setOpenDialog]=useState(false);
    const [userInput,setUserInput]=useState();
    const [loading,setLoading] = useState();
   const {user}=useUser();
   const route=useRouter();
    const onCreateForm=async()=>{
        setLoading(true);
        const result =await AiChatSession.sendMessage("Description:"+userInput+PROMPT);
        console.log(result.response.text());
        if(result.response.text()){
            const respo=await db.insert(JsonForms)
            .values({
                jsonform:result.response.text(),
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('dd/mm/yyyy')
            }).returning({id:JsonForms.id});
            console.log("FORM ID",respo[0].id);
            if(respo[0].id)
            {
                route.push('/edit-form/'+respo[0].id);
            }
            setLoading(false);
        }
        setLoading(false);
    }
    return (
        <div><Button onClick={()=>setOpenDialog(true)}>+ New Form</Button>
           <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Excited to Create New Form?</DialogTitle>
      <DialogDescription>
        Create New.......
      <Textarea className="my-2" placeholder="Write description of your form" onChange={(event)=>setUserInput(event.target.value)}/> 
      <div className='flex gap-2 my-3 justify-end'>
        <Button onClick={()=>setOpenDialog(false)}
         variant="destructive">Cancel</Button>
        <Button disabled={loading} onClick={()=>{onCreateForm();}}>
            {loading?<Loader2 className='animate-spin'/>:"Create"}
            </Button>
      </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
        </div>
    )
}

export default CreateForm




