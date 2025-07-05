'use client'
import Link from 'next/link'
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const DeleteBtn = () => {

  return (
    <>
   <Dialog>
      
        <DialogTrigger asChild>
          <Button variant="outline">
            <i className="fa-solid fa-trash-can mr-2 text-red-600"></i>
            <p className='text-sm text-red-600'>Delete</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className='text-lg text-sky-950'>Do you want to delete this issue?</DialogTitle>
            <DialogDescription className='text-sm text-gray-500'>
                This action cannot be undone. Are you sure you want to delete this issue?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
             
            </div>
            <div className="grid gap-3">
              
            </div>
          </div>
          <DialogFooter className='flex justify-between items-center'>
            <DialogClose asChild className=''>
              <Button className='text-sky-900 w-xm' variant="outline">Cancel</Button>
            </DialogClose>
            <Button className='text-red-600' variant="outline">Delete</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
</>
  )
}

export default DeleteBtn