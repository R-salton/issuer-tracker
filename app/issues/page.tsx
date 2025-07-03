'use client'
import React, { useEffect, useState } from 'react'
import { Button, Table } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { FiEye } from 'react-icons/fi'
import DeleteIssueBtn from './DeleteIssueBtn'

interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    const { data } = await axios.get<Issue[]>('/api/issues');
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <section className="px-2 py-4 sm:px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-center mb-6">
        <Button className="w-full sm:w-auto">Issues Page</Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <Table.Root variant="surface" className="min-w-[400px] w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">Loading...</Table.Cell>
              </Table.Row>
            ) : issues.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">No issues found.</Table.Cell>
              </Table.Row>
            ) : (
              issues.map((issue: Issue) => (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                  <Table.Cell>{issue.description}</Table.Cell>
                  <Table.Cell>{issue.status}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="text-secondary hover:text-softblue transition"
                        title="View Issue"
                      >
                        <FiEye size={20} />
                      </Link>
                      <DeleteIssueBtn issue={issue} onDeleted={fetchIssues} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </section>
  )
}

export default IssuesPage