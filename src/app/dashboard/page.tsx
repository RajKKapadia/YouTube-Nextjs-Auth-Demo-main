"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleLogoutAction } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session } = useSession();
    return (
        <div className="flex items-center mt-4 justify-around">
            <Label>Dashboard</Label>
            <div className="flex items-center justify-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h3>{session?.user?.name}</h3>
                    <form action={handleLogoutAction}>
                        <Button type="submit" size={"sm"}>Sign out!</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
