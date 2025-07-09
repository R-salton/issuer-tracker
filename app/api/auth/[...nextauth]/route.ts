
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";


const handler = NextAuth({
     adapter: PrismaAdapter(prisma),
  providers: [
    // Add your providers here
    CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string };
                if (!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email } });
               if (!user) return null;

                const valid = await bcrypt.compare(password, user.hashedPassword!);
                if (!valid) return null;

                return user;
            },
        }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    },  
})

export { handler as GET, handler as POST }
