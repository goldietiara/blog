import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./action";

// 01:26:00

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // jwt: {
    //     encode: ({ secret, token }) => {

    //     },
    //     decode: async { secret, token }() => {

    //     }
    // },
    theme: {
        colorScheme: 'light'
    },
    callbacks: {
        async session({ session }) {
            return session
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // if exist, get user
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }

                // if not exist, create user
                if (!userExists.user) {
                    await createUser(user.name as string, user.email as string, user.image as string)
                }

                return true
            } catch (error: any) {
                console.log(error)
                return false
            }
        }
    }
}

// export interface SessionInterface extends Session {
//     user: User & {
//         id: string;
//         name: string;
//         email: string;
//         avatarUrl: string;
//     };
// }

// export interface Session extends DefaultSession {}

// export interface DefaultSession {
//     user?: {
//       name?: string | null
//       email?: string | null
//       image?: string | null
//     }
//     expires: ISODateString
//   }

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface
    return session
}