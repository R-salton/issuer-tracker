
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { z } from 'zod';
import bcrypt from "bcrypt";
import { User } from '@/app/generated/prisma';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    
  });

export async function POST(request: Request) {
  const body = await request.json();


  const { email, password } = body;

    // Validate input
    const validData = registerSchema.safeParse(body);
    if (!validData.success) {
      return NextResponse.json(
        { errors: validData.error.errors.map((err) => ({ path: err.path, message: err.message })) },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: validData.data.email,
        hashedPassword: hashedPassword,
        
      },
    });
    return NextResponse.json(newUser,{status:200});


}




// export async function POST(request: Request) {
//   const body = await request.json();


//   const { email, password } = body;
  
//   // Validate input
//   const result = loginSchema.safeParse(body);
//   if (!result.success) {
//     return NextResponse.json(
//       { errors: result.error.errors.map((err) => ({ path: err.path, message: err.message })) },
//       { status: 400 }
//     );
//   }
//   // Check if user exists
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   if (!user) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }
//   // Check if password matches
//   const passwordMatch = await bcrypt.compare(password, user.password);
//   if (!passwordMatch) {
//     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//   }

  

// }
