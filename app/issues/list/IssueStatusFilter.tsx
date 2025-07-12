

'use client'
import { IssueStatus } from '@/app/generated/prisma'
import { Select } from '@radix-ui/themes'




const statusOptions : {label: string, value?: IssueStatus}[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},

    {label: 'Closed', value: 'CLOSED'},
    {label: 'On Progress', value: 'ON_PROGRESS'},
]

const IssueStatusFilter = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Filter by status' />

          <Select.Content>
            {statusOptions.map((option) => (
              <Select.Item key={option.value || 'all'} value={option.value || 'all'}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter