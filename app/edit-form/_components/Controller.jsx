import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import GradientBg from '@/app/_data/GradientBg'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
  
const Controller = ({selectedTheme,selectedBackground,setSignInEnable}) => {
    const [showMore,setShowMore] = useState(6)
    return (
    <div>
        <h2 className='my-1'>Theme</h2>
        <Select onValueChange={(value)=>(selectedTheme(value))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                {/* {Themes.map((theme,index)=>(
                    <SelectItem key={index} value={theme}>
                        <div className='flex'>
                            <div className='h-5 w-5' style={{backgroundColor:theme.primary}}>   
                            </div>{theme.themes}
                        </div>
                    </SelectItem>
                ))} */}
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
        </Select>
        <h2 className='my-1 mt-8'>Background</h2>
        <div className='grid grid-cols-3 gap-1'>
            {GradientBg.map((bg,index)=>(index<showMore)&&(
              <div key={index} onClick={()=>selectedBackground(bg.gradient)} className='items-center justify-center flex rounded-ee-3xl cursor-pointer w-full h-[50px] hover:border-pink-950 hover:border-3' style={{background:bg.gradient}}>
               {index==0&&'None'} 
               </div>
                  
            ))}  
        </div>
        {/* <Button variant="ghost" size="sm" className="bg-purple-300 my-1 w-full" onClick={()=>{setShowMore(showMore===6?10:6);}}>+more</Button> */}
        <Button 
        size="sm" 
        variant="ghost"
        className="bg-purple-300 my-1 w-full" 
        onClick={() => { setShowMore(showMore === 6 ? 10 : 6); }}
        >
        {showMore === 6 ? '+more' : '-less'}
        </Button>
        <div className="flex gap-2 my-4 items-center mt-10">
            <Checkbox onCheckedChange={(e)=>setSignInEnable(e)}/>
            <h2>
                Enable Social Authentication before Submitting
            </h2>
        </div>
    </div>
  )
}

export default Controller