import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { createIssueSchema } from "../../validationSchemas"
import { getServerSession } from 'next-auth'
import { AuthOptions } from "@/app/auth/AuthOptions"


export async function POST(Request: NextRequest){
const body = await Request.json()
const session = await getServerSession(AuthOptions);


// Check if user is authenticated
if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

const validation = createIssueSchema.safeParse(body)


if(!validation.success){

    const errors = validation.error.errors.map(err => ({
      path: err.path,
      message: err.message,
    }));

    return NextResponse.json({ errors }, { status: 400 });
}
    


const newIssue = await prisma.issue.create({
    data: {
        title: body.title,
        description: body.description,
        createdByUserId: body.createdByUserId,
    }
});

console.log(newIssue)

return NextResponse.json(newIssue,{status:201});

}


export async function GET() {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return NextResponse.json(issues, { status: 200 });
}


interface Issue {
    id: Promise<number>;
    title: Promise<string>;
    description: Promise<string>;
    status: Promise<string>;
}

export async function DELETE(request: NextRequest,{ params }: { params:Promise< { id: string }> }) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const session = await getServerSession(AuthOptions);
    // Check if user is authenticated
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
        return NextResponse.json({ error: 'Issue ID is required' }, { status: 400 });
    }

    try {
        const deletedIssue = await prisma.issue.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json(deletedIssue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
}