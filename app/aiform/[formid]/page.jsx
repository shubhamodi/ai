"use client"
import { db } from '@/app/configs'
import { JsonForms } from '@/app/configs/schema'
import FormUI from '@/app/edit-form/_components/FormUI'
import { ColumnAliasProxyHandler, eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LiveAiForm = ({params}) => {
    const [record,setRecord]=useState();
    const [jsonForm,setJsonForm]=useState([]);
    useEffect(()=>{
        //ColumnAliasProxyHandler.
        params&&GetFormData()
    },[params])
    const GetFormData=async()=>{
        console.log(record);
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.id,Number(params?.formid)))
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform))
    }
  return (
    <div className='p-10 flex justify-center items-center'
    style={{backgroundImage:record?.background}}>
        {record&&<FormUI
        jsonForm={jsonForm}
        selectedTheme={record?.theme} 
        onFieldUpdate={()=>console.log} 
        deleteField={()=>console.log}
        editable={false}
        formId={record?.id}
        enabledSignIn={record?.enabledSignIn}/>}
        <Link className='flex gap-2 font-extrabold px-3 py-1 rounded-full fixed bottom-5 right-5 items-center bg-pink-950 text-yellow-700'
        href={'/'}>
            <Image src={'/logo.svg'} width={30} height={30}/>
            Ai-Form Builder by SM
        </Link>
    </div>
  )
}

export default LiveAiForm