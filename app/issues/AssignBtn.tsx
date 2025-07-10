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
const AssignBtn = () => {
  return (
   <Select>
  <SelectTrigger className="w-full md:w-[120px] focus:ring-1 focus:ring-sky-900 focus:ring-offset-sky-900 rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-sky-900">
    <SelectValue placeholder="Assign to..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup className="text-sm">
      <SelectItem className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value="apple">Apple</SelectItem>
      <SelectItem className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value="banana">Banana</SelectItem>
      <SelectItem className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value="grapes">Grapes</SelectItem>
      <SelectItem className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value="blueberry">Blueberry</SelectItem>
      <SelectItem className="hover:!bg-blue-950 hover:text-white transition-all duration-500 text-sky-950 text-sm" value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

  )
}

export default AssignBtn