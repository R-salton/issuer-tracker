'use client'
import React, { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

const DeleteIssueBtn = ({
  issue,
 
}: {
  issue: Issue;
 
}) => {
  const [open, setOpen] = useState(false);
 
  const handleDelete = async (id: number) => {
    await fetch(`/api/issues?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setOpen(false);
    alert('Issue deleted successfully');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-800 transition"
        title="Delete Issue"
      >
        <FiTrash2 size={20} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-2 flex flex-col items-center">
            <h3 className="text-lg font-semibold secondary-text mb-4 text-center">
              Are you sure you want to delete this issue <span className="font-bold">"{issue.title}"</span>?
            </h3>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleDelete(issue.id)}
                className="cursor-pointer px-8 py-2 bg-red-500  text-white rounded-full  hover:bg-red-600 transition-all duration-400"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer px-4 py-2 bg-white border-1 rounded-full hover:bg-sky-950 hover:text-white transition-all duration-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteIssueBtn