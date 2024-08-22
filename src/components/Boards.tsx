import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { Liveblocks } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Boards() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email });

  return (
    <div className="my-4 grid md:grid-cols-4 gap-2">
      {rooms?.length > 0 &&
        rooms.map((room) => (
          <Link
            className="bg-gray-300 border p-4 rounded-md block text-gray-950"
            href={`/boards/${room.id}`}
            key={room.id}
          >
            {room.metadata.boardName}
          </Link>
        ))}
    </div>
  );
}

export default Boards;
