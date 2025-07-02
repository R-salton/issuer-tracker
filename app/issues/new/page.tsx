'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create issue');
      }

      // Optionally handle success (e.g., show a message or redirect)
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-softblue px-2">
      <form
        className="bg-white p-6 sm:p-8 rounded-lg secondary-shadow border-1 border-zinc-300 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold secondary-text text-center mb-2">Create New Issue</h2>
        <div>
          <label htmlFor="title" className="block secondary-text text-lg font-semibold mb-1">
            Title
          </label>
          <TextField.Root
            size="2"
            placeholder="Title…"
            className="text-sm w-full"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block secondary-text text-lg font-semibold mb-1">
            Description
          </label>
          <TextArea
            placeholder="Description…"
            className="w-full min-h-[100px] text-sm"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full secondary-bg py-5 text-lg text-zinc-400 hover:bg-sky-700 hover:text-zinc-100 transition-all duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Issue"}
        </Button>
      </form>
    </section>
  )
}

export default NewIssuePage