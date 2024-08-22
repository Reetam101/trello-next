import Board from "@/components/Board";
import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

type PageProps = {
  params: {
    boardId: string;
  };
};

async function BoardPage(props: PageProps) {
  const { boardId } = props.params;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo?.usersAccesses?.[userEmail as string];
  const hasAccess = userAccess && [...userAccess].includes("room:write");
  if (!hasAccess) {
    return <div>Access denied</div>;
  }
  return (
    <div>
      <Board name={boardInfo.metadata.boardName as string} id={boardId} />
    </div>
  );
}

export default BoardPage;
