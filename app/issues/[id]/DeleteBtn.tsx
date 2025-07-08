'use client';
import React, { useState } from 'react'
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
import { useRouter } from 'next/navigation'

interface Props {
  id: number;
}

const DeleteBtn = ({ id }: Props) => {
  const router = useRouter()
  const [successOpen, setSuccessOpen] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/issues/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to delete issue');
      return;
    }
    setSuccessOpen(true);
    setTimeout(() => {
      setSuccessOpen(false);
      router.push('/issues');
    }, 1500);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='text-red-600 hover:bg-red-400 hover:text-white transition-all duration-300'>
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
          <DialogFooter className='flex justify-between items-center'>
            <DialogClose asChild>
              <Button className='text-sky-900 w-xm hover:bg-sky-900 hover:text-white transition-all duration-300' variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} className='text-red-600 hover:bg-red-400' variant="outline">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successOpen}>
        <DialogContent showCloseButton={false} className=" sm:max-w-[200px] h-[200px] rounded-full  bg-white flex flex-col justify-center items-center">
          <DialogHeader>
            <DialogTitle className='text-green-700 text-lg text-center'>Issue deleted successfully!</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center mt-2">
            <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteBtn