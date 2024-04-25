import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/data";
import { z } from "zod";
import { LoginFormSchema } from "@/lib/schemas";
import { URLS } from "@/lib/urls";
import bcrypt from "bcryptjs";


export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            authorize: async (credentials) => {
                const email = String(credentials?.email);
                const password = String(credentials?.password);
                const loginData: z.infer<typeof LoginFormSchema> = {
                    email: email,
                    password: password
                }
                const user = await getUserByEmail(loginData.email);
                if (!user) {
                    return null
                }
                const hashedPassword = bcrypt.hashSync(password, 10);
                const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
                if (email === user.email && isPasswordMatched) {
                    return user;
                }
                return null;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: URLS.login,
        signOut: URLS.home
    },
    session: { strategy: "jwt", maxAge: 3600 },
    callbacks: {
        async jwt({ token, user }) {
            return {
                ...token,
                ...user
            };
        },
        signIn: async ({ user }) => {
            //@ts-ignore
            if (user.isVerified) {
                return true;
            } else {
                return URLS.newUser;
            }
        },
        session(params) {
            return {
                ...params.session,
                user: {
                    ...params.session.user,
                    id: params.token.sub,
                    isVerified: params.token.isVerified
                }
            }
        }
    }
});
