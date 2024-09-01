import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

const Dashboard = () => {
  return (
    <div className='p-5'>
      <div className=" items-center justify-between flex">
      <div className=' justify-between'>
        <h2 className='text-purple-500 font-bold  text-3xl flex items-center justify-between'>
            Dashboard
            </h2> </div>   
            <div className="flex ml-96 my-1 justify-end">
            <CreateForm/>
            </div>
            </div>
            <div className='overflow-auto h-[555px]'>
        <FormList/></div>
    </div>
  )
}

export default Dashboard