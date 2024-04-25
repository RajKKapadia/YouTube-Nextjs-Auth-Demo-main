import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { handleSendEmailAction } from "@/lib/actions";
import { URLS } from "@/lib/urls";
import Link from "next/link";

export default async function NewUserPage() {
    return (
        <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <h1>Hi there!</h1>
            <h3>If you have registered with us and havn't receive the email, please click on the button below to receive the verification email again. Otherwise Login using the Login button.</h3>
            <div className="flex gap-4">
                <Link href={URLS.sendEmail}>
                    <Button type="submit" size={"sm"}>Receive Email Again</Button>
                </Link>
                <Link href={URLS.login}>
                    <Button type="submit" size={"sm"}>Login</Button>
                </Link>
            </div>
        </div>
    );
};
