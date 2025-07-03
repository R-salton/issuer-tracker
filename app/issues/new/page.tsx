'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Callout, TextArea, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { set } from 'zod'
import { createIssueSchema } from '@/app/validationSchemas'
import ErrorMessage from '@/app/components/errorMessage'

const NewIssuePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [error, setError] = useState<{ title?: string; description?: string }>({});

  const router = useRouter();

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


      if (response.status == 400) {
        const data = await response.json().catch(() => ({}));
        // Reset errors first
        setTitleError('');
        setDescriptionError('');

        // If Zod error, it should be in data.errors or data.fieldErrors
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { path: string[]; message: string }) => {
            if (err.path.includes('title')) setTitleError(err.message);
            if (err.path.includes('description')) setDescriptionError(err.message);
          });
          return;
        }
        // fallback for other error formats
        setTitleError(data?.message || 'Invalid input');
        return;
      }


      setTitle('');
      setDescription('');
      router.push('/issues');
    } catch (error: any) {
      
      if (error.message !== 'Validation error') {
        setError(error.message || 'Something went wrong');
      }
     
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

        <ErrorMessage>
          {titleError}
        </ErrorMessage>
        {
          descriptionError && (
            <Callout.Root color='red' className="mb-2">
	<Callout.Icon>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
    </svg>
	</Callout.Icon>
	<Callout.Text className="text-sm">
            <p className="text-sm">{descriptionError}</p>
	</Callout.Text>
</Callout.Root>
          )
        }

        
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
            
          />
         
        </div>
       
       <Button
        type="submit"
        
          className="pointer-cursor items-center rounded secondary-bg py-5 text-lg text-zinc-400 hover:bg-sky-700 hover:text-zinc-600 transition-all duration-300 cursor-pointer"
          disabled={loading}
          
          >
          { 
            loading && <div
            className="inline-block h-6 w-6 mr-2 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"></div>
            
          }
            {loading ? "Creating..." : "Create new Issue"}

 
        </Button>
      </form>
    </section>
  )
}

export default NewIssuePage