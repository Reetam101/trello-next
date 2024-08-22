import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  // publicApiKey: process.env.LIVEBLOCKS_PUBLIC_KEY as string,
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {};

type Column = {
  name: string;
  index: number;
  id: string;
};

export type CardType = {
  name: string;
  id: string | number;
  index: number;
  columnId: string;
};

type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<CardType>>;
};

export const { RoomProvider, useMyPresence, useStorage, useMutation } =
  createRoomContext<
    Presence,
    Storage
    /* UserMeta, RoomEvent, ThreadMetadata */
  >(client);
