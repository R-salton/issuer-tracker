"use client";
import { ErrorMessage } from "@/app/components";
import { Callout, TextField, TextArea, Button, Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IssueStatus } from "@/app/generated/prisma"; // <-- import your enum

interface Params {
  id: string;
}

// Dynamically get status options from IssueStatus enum
const statusOptions = Object.entries(IssueStatus).map(([value, label]) => ({
  value,
  label: label.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
}));

const UpdatingIssuePage = ({ params }: { params: Params }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusOptions[0]?.value || "OPEN");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState<{ title?: string; description?: string }>({});

  // Fetch current issue data
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(`/api/issues/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch issue");
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status || statusOptions[0]?.value || "OPEN");
      } catch (err) {
        setError({ title: "Failed to load issue." });
      }
    };
    fetchIssue();
    // eslint-disable-next-line
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTitleError("");
    setDescriptionError("");
    setError({});
    try {
      const response = await fetch(`/api/issues/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });

      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err: { path: string[]; message: string }) => {
            if (err.path.includes("title")) setTitleError(err.message);
            if (err.path.includes("description")) setDescriptionError(err.message);
          });
          return;
        }
        setTitleError(data?.message || "Invalid input");
        return;
      }

      router.push("/issues/" + params.id);
    } catch (error: any) {
      setError({ title: error.message || "Something went wrong" });
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
        <h2 className="text-2xl font-bold secondary-text text-center mb-2">Update Issue</h2>

        <ErrorMessage>{titleError}</ErrorMessage>
        {descriptionError && (
          <Callout.Root color="red" className="mb-2">
            <Callout.Icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
              </svg>
            </Callout.Icon>
            <Callout.Text className="text-sm">
              <p className="text-sm">{descriptionError}</p>
            </Callout.Text>
          </Callout.Root>
        )}

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
        <div>
          <label htmlFor="status" className="block secondary-text text-lg font-semibold mb-1">
            Status
          </label>
          <Select.Root value={status} onValueChange={setStatus}>
            <Select.Trigger className="w-full" />
            <Select.Content>
              {statusOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <Button
          type="submit"
          className="pointer-cursor items-center rounded secondary-bg py-5 text-lg text-gray-400 hover:bg-sky-700 hover:text-zinc-600 transition-all duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading && (
            <div
              className="inline-block h-6 w-6 mr-2 text-gray-400 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          )}
          {loading ? "Updating..." : "Update Issue"}
        </Button>
      </form>
    </section>
  );
};

export default UpdatingIssuePage;