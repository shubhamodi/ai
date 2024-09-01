"use client"
import { db } from '@/app/configs'
import { JsonForms } from '@/app/configs/schema'
import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import {Lock, Badge, LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import CreateForm from './CreateForm.jsx'
const SideNav = () => {
    const menuList=[
        {
            id:1,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard',
        },
        {
            id:2,
            name:'Responses',
            icon:MessagesSquare,
            path:'/dashboard/responses',
        },
        {
            id:3,
            name:'Analytics',
            icon:LineChart,
            path:'/dashboard/analytics',
        },
        {
            id:4,
            name:'Level Up ^^',
            icon:Shield,
            path:'/dashboard/upgrade',
        },
        {
            id:5,
            name:'Help',
            icon:Badge,
            path:'/dashboard/help',
        },
    ]
    const{user}=useUser();
    const [formList,setFormList]=useState();
    const [percentFilled,setPercentFilled]=useState(0);
    const path=usePathname();
    useEffect(()=>{
        user&&GetFormList();
    },[user])
    const GetFormList=async()=>{
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));
        setFormList(result);
        const percent=(result.length/40)*100;
        setPercentFilled(percent);
        console.log(result);
    }
  return (
    <div className='h-screen shadow-md border-r-2'>
        <div className='p-3 mx-9 my-7'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path} key={index} className={`flex items-center gap-1 p-5 hover:bg-pink-950 hover:text-orange-500  rounded-lg mb-2 cursor-pointer  ${path==menu.path?'bg-pink-950 text-orange-600':"text-yellow-300"}`}>
                    <menu.icon/>
                    {menu.name}
                </Link>
            ))}
        </div>
        <div className=' fixed -bottom-0.5 p-5 w-64 '>
            <Link href={'/'}><Button className="w-full">+ Create Form</Button></Link>
            <div className="my-5">
                <ProgressBar percentFilled={percentFilled}/>
                <h2 className='flex text-sm mt-2 mx-7 text-rose-300'><strong className="mx-1 flex">{formList?.length}</strong> of <strong className="mx-1">40</strong> Files Created</h2>
                <h2 className='flex items-center text-sm mt-2 mx-1 text-yellow-700'><Lock className="mx-1"/>   <div className="mt-1 text-cyan-700">Unlock more AI forms</div></h2>
            </div>
        </div>
    </div>
  )
}

export default SideNav