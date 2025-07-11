
"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Issue, User } from "../generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';




const AssignBtn = ({issue}: {issue: Issue}) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


const {data : users, error , isLoading} = useQuery<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await fetch(`http://localhost:3000/api/users`);
    
    if (!res.ok) throw new Error("Failed to fetch users");
    
    return res.json();
  },
  staleTime: 60 * 1000, // 1 minute

})

if (error) {
  return null
}

if (isLoading) {
  return <Skeleton  width={100} height={30}  />
}






  

  return (
   <Select defaultValue={issue.assignedToUserId || ""} onValueChange={(userId) => {

    
    if (userId === "unassigned") {
      return axios.patch(`http://localhost:3000/pi/issues/${issue.id}`, {
        assignedToUserId: null // Unassign the issue
      }).then(() => {
        router.refresh();
      }).catch(()=>{

        toast.error("Failed to unassign issue. Please try again.");
    })
    }
    else{
    
    // Update the issue with the selected user ID
  return axios
    .patch(`http://localhost:3000/api/issues/${issue.id}`, {
      assignedToUserId: userId
    }).catch(()=>{

      toast.error("Failed to assign issue. Please try again.");
    }).then(() => {
      router.refresh();
      toast.success("Issue assigned successfully");
    }
    );
    
    
  }

   
    
      
    }}>
  <SelectTrigger className="w-full md:w-[120px] focus:ring-1 focus:ring-sky-900 focus:ring-offset-sky-900 rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-sky-900">
    <SelectValue placeholder={ "Assign to..."} />
  </SelectTrigger>
  <SelectContent >
    <SelectGroup className="text-sm">
      <SelectItem
    value="unassigned"
    className="hover:!bg-red-100 hover:text-red-800 text-red-700 text-sm transition-all duration-300"
  >
    Unassign
  </SelectItem>

      
    {
        users?.map((user) => (
          <SelectItem key={user.id } className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value={user.id}>{user.name}</SelectItem>
        ))
    }
      
    </SelectGroup>
  </SelectContent>
</Select>

  )
}

export default AssignBtn