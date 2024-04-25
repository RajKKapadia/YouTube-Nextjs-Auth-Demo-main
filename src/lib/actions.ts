"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schemas";
import { URLS } from "@/lib/urls";
import { createNewUser, getUserByEmail } from "@/lib/data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createTransport } from "nodemailer";
import { encodeData } from "./utils";

export const handleLoginAction = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
        await signIn(
            'credentials',
            {
                email: data.email,
                password: data.password,
                redirectTo: URLS.dashboard
            }
        );
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Unknown error." }
            }
        }
        throw error;
    }
};

export const handleLogoutAction = async () => {
    await signOut({
        redirectTo: URLS.home
    });
};

export const handleRegisterAction = async (data: z.infer<typeof RegisterFormSchema>) => {
    try {
        await createNewUser(data);
        await signIn(
            'credentials',
            {
                email: data.email,
                password: data.password,
                redirectTo: URLS.dashboard
            }
        );
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Unknown error." };
            }
        }
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: "Email is already in use." };
        }
        throw error;
    }
};

export const handleSendEmailAction = async (email: string, isSendEmailAgain: boolean) => {
    let isValidEmail = true;
    if (isSendEmailAgain) {
        const user = await getUserByEmail(email);
        if (!user) {
            isValidEmail = false;
            return { message: "Invalid Email address.", status: false };
        }
    }
    if (isValidEmail) {
        const encodedData = encodeData({
            email: email,
            issuedAt: Date.now()
        });
        const URL = `http://localhost:3000/verify/${encodedData}`;
        const transporter = createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
                user: process.env.GMAIL_FROM,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })
        try {
            await transporter.sendMail({
                from: `${process.env.GMAIL_FROM}`,
                to: email,
                subject: `Verify your account.`,
                text: 'Hello, thank you for registering to our services. Please use the following link to verify your email address.',
                html: `<b>Here is the link</b>\n<a target="_blank" href="${URL}">Link</a>`
            });
            return { message: "Email sent.", status: true };
        } catch (err) {
            console.log(err)
            return { message: "Email not sent.", status: false };
        }
    }
    return { message: "Invalid Email address.", status: false };
};
