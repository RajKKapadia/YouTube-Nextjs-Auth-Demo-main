"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { RegisterFormSchema } from "@/lib/schemas";

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
};

export const createNewUser = async (data: z.infer<typeof RegisterFormSchema>) => {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        }
    });
    return newUser;
};

export const updateUserByEmail = async (email: string) => {
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            isVerified: true
        }
    });
    return user;
};
