"use client"
import { db } from '@/app/configs'
import { JsonForms } from '@/app/configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp';
import { useUser } from '@clerk/nextjs';

const Responses = () => {
    const {user}=useUser();
    const [formList,setFormList]=useState();
    useEffect(()=>{user&&getFormList();},[user]);
    const getFormList=async()=>{
        const result =await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
        setFormList(result);
    }
    return formList&&(
    <div className='p-10'>
        <div><h2 className='text-purple-500 font-bold text-3xl flex items-center justify-between'>Responses</h2>
        </div>
        <div className='h-[530px] overflow-auto mt-5 ml-5 min-w-[1220px] grid grid-cols-5 md:grid-cols-4 gap-5'>
            {formList.map((form,index)=>(
            <FormListItemResp
            formRecord={form}
            jsonForm={JSON.parse(form.jsonform)}/>

            ))}
        </div>
    </div>
  )
}

export default Responses