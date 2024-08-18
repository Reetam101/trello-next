import Board from "@/components/Board";
import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LoginView />;
  }
  return (
    <div>
      <h1 className="text-4xl mb-4">Your boards</h1>
      <Boards />
      <div className="mt-4">
        <Link
          className="btn primary inline-flex gap-2 items-center"
          href={"/new-board"}
        >
          Create new board <FaArrowRight className="h-4" />
        </Link>
      </div>
    </div>
  );
}
