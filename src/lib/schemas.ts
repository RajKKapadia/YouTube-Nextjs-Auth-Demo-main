import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().refine(
        (val) => {
            if (val.includes("@")) {
                return true;
            } else {
                return false;
            }
        },
        { message: `Please enter a valid email address.` }
    ),
    password: z.string().min(1, {
        message: "Password is required."
    })
});

export const RegisterFormSchema = z.object({
    email: z.string().email().refine(
        (val) => {
            if (val.includes("@")) {
                return true;
            } else {
                return false;
            }
        },
        { message: `Please enter a valid email address.` }
    ),
    password: z.string().min(6, {
        message: "Password is required and must be more than 6 character long."
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm is required and must be more than 6 character long."
    }),
    name: z.string().min(1, {
        message: "Name is required."
    })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please check them.",
        path: ["confirmPassword"]
    });

export const SendForgotPasswordFormSchema = z.object({
    email: z.string().email().refine(
        (val) => {
            if (val.includes("@")) {
                return true;
            } else {
                return false;
            }
        },
        { message: `Please enter a valid email address.` }
    )
});

export const ResetPasswordFormSchema = z.object({
    password: z.string().min(6, {
        message: "Password is required and must have 6 characters."
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm password is required."
    })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please check them.",
        path: ["confirmPassword"]
    });
