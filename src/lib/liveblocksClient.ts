import { Liveblocks } from "@liveblocks/node";

export const liveblocksClient = new Liveblocks({
  secret: process.env.local.LIVEBLOCKS_SECRET_KEY as string,
});
