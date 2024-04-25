import { Button } from "@/components/ui/button";
import { URLS } from "@/lib/urls";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-end mt-4 mr-4 gap-4">
      <Link href={URLS.login} className="gap-4">
        <Button>Login</Button>
      </Link>
      <Link href={URLS.register}>
        <Button variant={"default"}>Get started!</Button>
      </Link>
    </div>
  );
};
