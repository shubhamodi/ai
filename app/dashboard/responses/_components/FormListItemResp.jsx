import { db } from '@/app/configs'
import { userResponses } from '@/app/configs/schema'
import { Button } from '@/components/ui/button'
import { eq } from 'drizzle-orm'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
const FormListItemResp = ({jsonForm,formRecord}) => {
  const [loading,setLoading]=useState(false);
    const ExportData=async()=>{
        let jsonData=[];
        setLoading(true);
    const result=await db.select().from(userResponses)
    .where(eq(userResponses.formRef,formRecord.id));
    console.log(result);
    if(result){result.forEach((item)=>{
        const jsonItem=JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem)
    })
        setLoading(false);}
        excelData(jsonData);
  }
  const excelData=(jsonData)=>{
    const worksheet=XLSX.utils.json_to_sheet(jsonData);
    const workbook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
    XLSX.writeFile(workbook,(jsonForm?.formTitle||jsonForm?.fieldTitle||jsonForm?.title)+"ResponseData.xlsx")
  }
    return (
    <div className='border shadow-sm rounded-lg p-6'>
     
      <h2 className='text-orange-500 font-bold text-lg'>
        {jsonForm?.formTitle}
        {/* // ?(jsonForm?.formTitle):(jsonForm?.fieldTitle)} */}
      </h2>
      <h2 className='text-pink-700 text-sm font-sans'>
        {jsonForm?.formSubheading||jsonForm?.formHeading}
        {/* // ?(jsonForm?.formTitle):(jsonForm?.fieldTitle)} */}
      </h2>
      <hr className='my-4'></hr>
      <div className='flex justify-between'>
        <h2 className='text-green-200 text-sm'><strong>NaN</strong> Responses</h2>
        <Button className="" size="sm" disabled={loading} onClick={()=>ExportData()}>
        {loading?<Loader2 className="animate-spin"/>:'Export'}
        </Button>
      </div>
    </div>
  )
}

export default FormListItemResp