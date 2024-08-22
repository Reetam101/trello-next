import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="p-4 px-8 pt-0">
      <div className="flex justify-between items-center">
        <Link href="/" className="logo">
          <Image alt="logo" src={"/trello.png"} width={100} height={10} />
        </Link>
        <div>
          {session && (
            <>
              Hello, {session.user?.name}
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              Not logged in
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
