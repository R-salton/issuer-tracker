import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { createIssueSchema } from "../../validationSchemas"

export async function POST(Request: NextRequest){
const body = await Request.json()
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
    }
});

return NextResponse.json(newIssue,{status:201});

}