import IssueStatusBadge from '@/app/components/issueStatusBadge';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';
import Editbtn from './Editbtn';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/app/auth/AuthOptions';
import AssignBtn from '../AssignBtn';

interface Props {
  params: Promise<{
    id: string;
  }>
}



const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt((await params).id);

  const session  = await getServerSession(AuthOptions);

  const res = await fetch(`http://localhost:3000/api/issues/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    return <div className="text-red-600 p-8">Issue not found.</div>;
  }


  const issue = await res.json();

  

  return (
    <div className=" mx-auto mt-10 bg-white rounded-xl p-8">
        <Link href="/issues" className="text-blue-600 hover:underline mb-4 inline-block" >
         <i className="absolute top-20 left-12 text-white hover:text-sky-700  transition-colors duration-400 btn-circle bg-sky-950 p-2  fa-solid fa-arrow-left"></i>
        </Link>
      <Heading className="text-3xl font-bold secondary-text mb-4">{issue.title}</Heading>
       <p className='text-gray-600 text-sm'><span className='text-sky-900 font-bold'>Assigned to: </span>{issue.assignedUser?.name || "Unassigned"}</p>
      <Flex className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 mt-4">
        
       
         
          <IssueStatusBadge status={issue.status} />
          <Text className="text-gray-500 text-sm">
            {new Date(issue.createdAt).toLocaleString()}
          </Text>
        
        {/* You can add more meta info here if needed */}
      </Flex>
      <Card className="mb-8 text-lg">
      
        <p className="mt-2 text-gray-700">{issue.description}</p>
      </Card>
      {/* Actions Section */} 
      {
        session && 
          <div className=" pt-6 flex flex-col sm:flex-row gap-4">
       <Editbtn id={issue.id} />
       <AssignBtn issue={issue} />
        <DeleteBtn id={issue.id} />
       
      </div>
        
      }
    </div>
  )
}

export default IssueDetailsPage