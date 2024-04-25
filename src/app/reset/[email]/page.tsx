"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordFormSchema } from "@/lib/schemas";

export default function ResetPasswordPage() {
    const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });
    function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
        console.log(values)
    };
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[350px]">
            <div className="flex flex-col gap-2 text-justify">
                <Label>Reset your password.</Label>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <Input placeholder="xxxxxxxx" {...field} type="password" />
                                </FormControl>
                                <FormDescription>
                                    Enter a strong new password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat the password</FormLabel>
                                <FormControl>
                                    <Input placeholder="xxxxxxxx" {...field} type="password" />
                                </FormControl>
                                <FormDescription>
                                    Enter the same password as the password field.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button type="submit">Reset</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
