"use client"
import { db } from '@/app/configs'
import { JsonForms } from '@/app/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUI from '../_components/FormUI'
import { fromJSON } from 'postcss'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from "react-web-share";
// import Link from 'next/link';

const EditForm = ({params}) => {
    const {user}=useUser();
    const route=useRouter();
    const [record,setRecord]=useState([]);
    const [jsonForm,setJsonForm]=useState([]);
    const [updateTrigger,setUpdateTrigger]=useState();
    const [selectedTheme,setSelectedTheme]=useState('light');
    const [selectedBackground,setSelectedBackground]=useState();

    useEffect(()=>{
        user&&GetFormData();
    },[user]) 
    const GetFormData=async()=>{
        const result = await db.select().from(JsonForms)
        .where(and(eq(JsonForms.id,params?.formId),
        eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)));
        setRecord(result[0]);      
        console.log(JSON.parse(result[0].jsonform));
        setJsonForm(JSON.parse(result[0].jsonform))
        setSelectedBackground(result[0].background)
    }
    useEffect(()=>{if(updateTrigger){setJsonForm(jsonForm);updateJsonFormInDb();}},[updateTrigger])
    const onFieldUpdate=(value,index)=>{
    //    var p=jsonForm?.form[index]?.formLabel; 
        // p=jsonForm?.formField[index]?.formLabel;
        // p=value.label;
        //(jsonForm.form ? jsonForm.form[index].formLabel : jsonForm.formFields[index]?.formLabel) = value.label;
        if (jsonForm.form) {
            jsonForm.form[index].formLabel = value.label;
        } else if (jsonForm.formFields) {
            jsonForm.formFields[index].formLabel = value.label;
        }
        
        if (jsonForm.form) {
            jsonForm.form[index].placeholderName = value.placeholder;
        } else if (jsonForm.formFields) {
            jsonForm.formFields[index].placeholderName = value.placeholder;
        }
        
        setUpdateTrigger(Date.now());
    }
    const updateJsonFormInDb=async()=>{    
        try {
            const result = await db.update(JsonForms)
                .set({
                    jsonform: jsonForm
                })
                .where(and(
                    eq(JsonForms.id, record.id),
                    eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
                ));
            
            toast("UPDATED SUCCESSFULLY");
        } catch (error) {
            console.log("Error updating JSON form in DB:", error);
            toast("Error updating form!");
        }
    };
        const deleteField=(indexRemove)=>{
        const result = (jsonForm.formFields?.filter((item,index)=>index!=indexRemove))||jsonForm.form?.filter((item,index)=>index!=indexRemove)||(jsonForm.fields?.filter((item,index)=>index!=indexRemove))
        jsonForm.formFields ? (jsonForm.formFields = result) : (jsonForm.form = result);
        setUpdateTrigger(Date.now());
    }
    const updateControllerFields=async(value,colName)=>{
        const result=await db.update(JsonForms).set({
            [colName]:value
        }).where(and(eq(JsonForms.id,record.id),
    eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress)))
    .returning({id:JsonForms.id})
    toast("...Updated...")
    }

  return (
    <div className="p-10">
        <div className='flex justify-between items-center'>
        <h2 onClick={()=>route.back()} className='flex gap-2 items-center my-5 cursor-pointer hover:scale-105 transition-all hover:font-bold'>
            <ArrowLeft/>Back
        </h2>
        <div className="m-2 flex">
            <Link href={'/aiform/'+record?.id} target="_blank">
            <Button className='mx-1 rounded-xl hover:bg-purple-500'><SquareArrowOutUpRight className='h-5 w-5 mx-1'/>Live Preview</Button>
            </Link>

            <RWebShare
                data={{
                text: jsonForm?.formSubheading + "Build Your customised AiForm...👇",
                url: process.env.NEXT_PUBLIC_BASE_URL+"/aiform/"+record?.id,
                title: jsonForm?.formTitle,
                }}
                onClick={() => console.log("🚀..Shared Successfully..🚀")}
            >
                <Button className='mx-1 rounded-xl hover:bg-purple-500 '>🔗Share</Button>
            </RWebShare>
            
        </div>
        </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className='p-5 border rounded-2xl shadow-2xl'>
                    <Controller 
                        selectedTheme={(value)=>{updateControllerFields(value,'theme');setSelectedTheme(value)}}
                        selectedBackground={(value)=>{
                            updateControllerFields(value,'background');
                            setSelectedBackground(value)}}
                            setSignInEnable={(value)=>{updateControllerFields(value,'enabledSignIn');}}
                            />
                </div>
                <div className='md:col-span-2 border rounded-2xl p-5 shadow-xl h-full flex items-center justify-center' style={{backgroundImage:selectedBackground}}>
                    <FormUI jsonForm={jsonForm}
                    onFieldUpdate={onFieldUpdate}
                    selectedTheme={selectedTheme}
                    deleteField={(index)=>(deleteField(index))}
                    formId={record?.id}/>
                </div>
            </div>
    </div>
  )
}

export default EditForm