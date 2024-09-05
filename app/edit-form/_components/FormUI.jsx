// import { Input } from 'postcss'
import { JsonForms, userResponses } from '@/app/configs/schema';
import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import FieldEdit from './FieldEdit';
import { db } from '@/app/configs';
import moment from 'moment';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';


const FormUI = ({jsonForm,onFieldUpdate,selectedTheme,deleteField,editable=true,formId=0,enabledSignIn=false}) => {
  console.log(jsonForm);
  const [formData,setFormData]=useState();
  let formRef=useRef();
  const{user,isSignedIn}=useUser();
  const handleSignInSuccess = () => {
    // Navigate to the form page after successful sign-in
    router.push(`/aiform/${formId}`);
    // onFormSubmit(); // Call the form submission function
  };
  const handleInputChange=(event)=>{
  const{name,value}=event.target;
  setFormData({
    ...formData,
    [name]:value})
 }
 const handleSelectChange=(name,value)=>{
  setFormData({
    ...formData,
    [name]:value})
 }
 const onFormSubmit=async(event)=>{
  event.preventDefault();
  console.log(formData);
  // console.log(formId);
  const result=await db.insert(userResponses).values({
    jsonResponse:formData,
    createdAt:moment().format('DD/MM/YYYY'),
    formRef:formId,
  })
  if(result){
    formRef.reset();
    toast("📣 Form Submitted Successfully");
  }
  else{
    toast("⚠️ Error Submitting Form ⚠️");
  }
 }
 const handleCheckboxChange=(fieldName,itemName,value)=>{
    console.log(fieldName,itemName,value);
    const list=(formData?.[fieldName])?formData?.[fieldName]:[];
    if(value){
      list.push({
        label:itemName,
        value:value,
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }else{
      const result=list.filter((item)=>item.label==itemName);
      setFormData({
        ...formData,
        [fieldName]:result
      })
    }
    console.log(formData);
 }
  return (
    <form ref={(e)=>formRef=e} onSubmit={onFormSubmit} className='border p-5 md:w-[800px] rounded-xl ' data-theme={selectedTheme}>
      <h2 className='font-extrabold text-purple-900 text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm my-2 text-pink-900 font-serif text-center'>{(jsonForm?.formSubheading||jsonForm?.formSubHeading)}</h2>
      {jsonForm?.form?(jsonForm?.form) : (jsonForm?.formFields)?.map((field,index)=>(
        <div key={index} className='my-6 flex items-center text-purple-800'>
          {field.fieldType=='select'?
            <div className='my-3 shadow-xl w-full'>
              <label className='text-xs font-bold text-pink-800'>{field.formLabel||field?.fieldLabel}</label>
            <Select onValueChange={(v)=>handleSelectChange(field.name?(field.name):(field.formName),v)}required={(field?.fieldRequired)?(field?.fieldRequired):(field?.isRequired)}>
            <SelectTrigger className="w-full my-3 shadow-lg bg-transparent">
              <SelectValue placeholder={field?.placeholderName||field?.placeholder} />
            </SelectTrigger>
            <SelectContent>
              { 
                field.options.map((item,index)=>(
                    // console.log();
                    <SelectItem key={index} value={item}>{item}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
            </div>
            :field.fieldType=='radio'?
            <div>
              <label className='text-xs text-black'>{field.formLabel||field?.fieldLabel}</label>
              <RadioGroup required={field?.fieldRequired} defaultValue={options.formLabel}>
              {field.options.map((item,index)=>(
              <div className="flex items-center space-x-2">
                <RadioGroupItem onClick={()=>handleSelectChange(item.fieldName,item.label?(item.label):(item.fieldLabel))}value={options.formLabel} id={options.formLabel} />
                <Label htmlFor={options.formLabel}>{options.formLabel}</Label>
              </div>))}
            </RadioGroup>
            </div>
          :field.fieldType=='checkbox'?
          <div className='w-full'>
            <label className='text-xs text-black'>{field?.formLabel||field?.fieldLabel}</label>
            {field?.options?field?.options?.map((item,index)=>(
              <div className='flex gap-2'>
              <Checkbox onCheckedChange={(v)=>handleCheckboxChange(field?.fieldLabel,item,v)}/><h2>{item.label||item.fieldLabel}</h2>
              <h2>{item}</h2>
              </div>
            ))
          :<div className='flex gap-2 items-center'><Checkbox/>
          <h2>{field?.formLabel||field?.fieldLabel}</h2>
          </div>}
          </div>
          :
          <div className='w-full my-3 shadow-xl items-center'>
          <label className='text-xs font-bold text-pink-800'>{field?.formLabel||field?.fieldLabel}...</label>
          <Input onChange={(e)=>handleInputChange(e)} className='bg-transparent' type={field?.fieldType||field?.formType} 
          placeholder={field?.placeholderName||field?.placeholder} name={field?.fieldName||field?.formName} 
          required={(field?.fieldRequired)?(field?.fieldRequired):(field?.isRequired)}/>
          </div>}
          {editable&&<div>   
            <FieldEdit defaultValue={field} onUpdate={(value)=>{onFieldUpdate(value,index)}} deleteField={()=>deleteField(index)}/>
          </div>}
        </div>
      ))}
      {!enabledSignIn?
      (<button type='submit' className='btn btn-primary'>Submit..</button>):
      (isSignedIn?
      (<button type='submit' className='btn btn-primary'>Submit..</button>):(<Button><SignInButton onSuccess={handleSignInSuccess} mode='modal'>SignIn to Submit</SignInButton></Button>))}
    </form>
  )
}

export default FormUI