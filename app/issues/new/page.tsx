import React from 'react'
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-softblue px-2">
      <form className="bg-white p-6 sm:p-8 rounded-lg secondary-shadow  border-1 border-zinc-300 w-full max-w-md  flex flex-col gap-6">
        <h2 className="text-2xl font-bold secondary-text text-center mb-2">Create New Issue</h2>
        <div>
          <label htmlFor="title" className="block secondary-text font-semibold mb-1">
            Title
          </label>
          <TextField.Root size="2" placeholder="Title…" />
        </div>
        <div>
          <label htmlFor="description" className="block secondary-text font-semibold mb-1">
            Description
          </label>
          <TextArea placeholder='Description…' className="w-full min-h-[100px]" />
        </div>
        <Button type="submit" className="w-full secondary-bg text-zinc-400 hover:bg-sky-700 hover:text-zinc-100 transition-all duration-300 cursor-pointer">
          Create Issue
        </Button>
      </form>
    </section>
  )
}


export default NewIssuePage