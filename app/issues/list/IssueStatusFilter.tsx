

'use client'
import { IssueStatus } from '@/app/generated/prisma'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'




const statusOptions : {label: string, value?: IssueStatus | "ALL"}[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},

    {label: 'Closed', value: 'CLOSED'},
    {label: 'On Progress', value: 'ON_PROGRESS'},
]


const IssueStatusFilter = () => {
    const router = useRouter();
    
  return (
    <Select.Root onValueChange={(value) =>   { 
      
        if(value === 'ALL'){
            router.push('/issues');
            
        }
        else{
            const query = value ? `?status=${value}` : '';
            router.push(`/issues/${query}`);
            
        }
       
    }}>
        <Select.Trigger placeholder='Filter by status' />

          <Select.Content>
            {statusOptions.map((option) => (
              <Select.Item key={option.value} value={option.value || 'ALL'}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter