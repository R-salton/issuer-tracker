
"use client"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState,useEffect } from "react"
import { User } from "../generated/prisma";


const AssignBtn = () => {
const [users, setUsers] = useState<User[]>([]);


useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3000/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  

  return (
   <Select>
  <SelectTrigger className="w-full md:w-[120px] focus:ring-1 focus:ring-sky-900 focus:ring-offset-sky-900 rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-sky-900">
    <SelectValue placeholder="Assign to..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup className="text-sm">
    {
        users.map((user) => (
          <SelectItem key={user.id } className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value={user.id}>{user.name}</SelectItem>
        ))
    }
      
    </SelectGroup>
  </SelectContent>
</Select>

  )
}

export default AssignBtn