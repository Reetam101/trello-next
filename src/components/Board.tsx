"use client";

import { useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FaCog } from "react-icons/fa";

export default function Board({ id, name }: { id: string; name: string }) {
  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{
        columns: new LiveList([]),
        cards: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={<p className="text-white">Loading...</p>}>
        <>
          <div className="flex gap-2 justify-between items-center mb-4">
            <h1>Board: {name}</h1>
            <Link
              className="flex gap-2 items-center rounded-md px-4 py-2 bg-gray-300 text-gray-950"
              href={`/boards/${id}/settings`}
            >
              <FaCog />
              Board Settings
            </Link>
          </div>
          <Columns />
        </>
      </ClientSideSuspense>
    </RoomProvider>
  );
}
