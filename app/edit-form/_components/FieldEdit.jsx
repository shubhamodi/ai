import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  

  
const FieldEdit = ({defaultValue,onUpdate,deleteField}) => {
    const [label,setLabel]=useState(defaultValue?.formLabel||defaultValue?.label);
   const [placeholder,setPlaceholder]=useState(defaultValue?.placeholderName||defaultValue?.placeholder);
  return (
  // This component will render a button that, when clicked, will
    <div className='flex gap-2'>
        <AlertDialog>
        <AlertDialogTrigger><Trash className=' text-red-600 h-4 w-4'/></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteField()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        
        <Popover>
            <PopoverTrigger><Edit className='h-4 w-4 text-pink-950'/></PopoverTrigger>
            <PopoverContent><h2>Edit Field</h2>
            <div>
                <label className='text-xs'>Label Name</label>
                <Input type="text" defaultValue={defaultValue?.formLabel||defaultValue?.fieldLabel||defaultValue?.label}
                onChange={(e)=>setLabel(e.target.value)}/>
            </div>
            <div>
                <label className='text-xs'>PlaceHolder Name</label>
                <Input type="text" defaultValue={defaultValue.placeholder||defaultValue?.placeholderName}
                onChange={(e)=>setPlaceholder(e.target.value)}/>
            </div>
            <Button className="mt-3" size="sm" onClick={()=>onUpdate({
                label:label,
                placeholder:placeholder
            })}>Update</Button>
            </PopoverContent>
        </Popover>

    </div>
  )
}

export default FieldEdit