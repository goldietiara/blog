import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "./action";
import { SessionInterface, UserProfile } from "@/common.types";

// keep all data of currently login user

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign(
                {
                    ...token,
                    iss: "grafbase",
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                },
                secret
            );

            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret);
            return decodedToken as JWT;
        },
    },
    theme: {
        colorScheme: 'light'
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string
            try {
                const data = await getUser(email) as { user?: UserProfile }

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }
                return newSession
            } catch (error) {
                console.log("error retrieving user data", error)
                return session
            }
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