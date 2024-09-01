"use client"
import { JsonForms } from '@/app/configs/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormListItem from './FormListItem';
import { useUser } from '@clerk/nextjs';
import { db } from '@/app/configs';

const FormList = () => {
    const {user}=useUser();
    const [formList,setFormList]=useState([]);
    useEffect(()=>{
        user&&GetFormList();
    },[user])
    const GetFormList=async()=>{
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));
        setFormList(result);
        console.log(result);
    }
    return (
    <div className='mt-5 ml-5 min-w-[1220px] grid grid-cols-5 md:grid-cols-3 gap-5'>
        {formList.map((form,index)=>(
            <div className=" text-red-300 mx-1 my-1 rounded-xl border-2 border-pink-950">
                <FormListItem formRecord={form} jsonForm={JSON.parse(form?.jsonform)}
                refreshData={GetFormList}/>
            </div>
        ))}
    </div>
  )

}


export default FormList