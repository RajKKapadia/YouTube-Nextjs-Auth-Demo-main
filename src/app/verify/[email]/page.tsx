import { Button } from "@/components/ui/button";
import { handleSendEmailAction } from "@/lib/actions";
import { getUserByEmail, updateUserByEmail } from "@/lib/data";
import { URLS } from "@/lib/urls";
import { decodeData } from "@/lib/utils";
import Link from "next/link";

export default async function VerifyUserPage({ params }: { params: { email: string } }) {
    const decodedData: { email: string, issuedAt: number } = decodeData(params.email);
    if (!decodedData) {
        return (
            <div className="mt-4 flex items-center justify-center">
                <h1>The link is invalid. Please contact admin.</h1>
            </div>
        );
    }
    const now = Date.now();
    const email = decodedData.email;
    const issuedAt = decodedData.issuedAt;
    const user = await getUserByEmail(email);
    if (!user) {
        return (
            <div className="mt-4 flex items-center justify-center">
                <h1>The link is invalid. Please contact admin.</h1>
            </div>
        );
    }
    const hours = Math.abs(now - issuedAt!) / 36e5;
    const action = handleSendEmailAction.bind(null, user.email!, false);
    if (hours > 24) {
        return (
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
                <h1>The link is expired.</h1>
                <h3>{user.name}, please click on the button below to receive the verification link again.</h3>
                <form action={action}>
                    <Button type="submit" size={"sm"}>Receive email again.</Button>
                </form>
            </div>
        );
    }
    await updateUserByEmail(user.email);
    return (
        <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <h1>You are now verified.</h1>
            <h3>{user.name}, please click on the button below to go to the Dashboard.</h3>
            <Link href={URLS.login}>
                <Button type="submit" size={"sm"}>Login</Button>
            </Link>
        </div>
    );
};
