"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SendForgotPasswordFormSchema } from "@/lib/schemas";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import { useState } from "react";
import { handleSendEmailAction } from "@/lib/actions";

export default function SendForgotPasswordEmailPage() {
    const form = useForm<z.infer<typeof SendForgotPasswordFormSchema>>({
        resolver: zodResolver(SendForgotPasswordFormSchema),
        defaultValues: {
            email: ""
        },
    });
    const [error, setError] = useState<string | undefined>('');
    const [emailSent, setEmailSent] = useState<boolean>(false);
    async function onSubmit(values: z.infer<typeof SendForgotPasswordFormSchema>) {
        const response = await handleSendEmailAction(values.email, true);
        setError(response?.message);
        setEmailSent(response.status);
    };
    return (
        <>
            <div className="flex items-center justify-end m-4 gap-4">
                <Link href={URLS.login} className="gap-4">
                    <Button>Login</Button>
                </Link>
                <Link href={URLS.register}>
                    <Button variant={"default"}>Get started!</Button>
                </Link>
            </div>
            {
                error && <span className="flex items-center justify-center text-orange-600">{error}</span>
            }
            <div className="flex flex-col items-center justify-center gap-4 h-[350px]">
                <div className="flex flex-col gap-2 text-justify">
                    <Label>Enter your registered email address</Label>
                    <Label>and recieve a link to reset your password.</Label>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your registered email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gamil.com" {...field} disabled={emailSent} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your registered email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            <Button disabled={emailSent} type="submit">Send email</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};
