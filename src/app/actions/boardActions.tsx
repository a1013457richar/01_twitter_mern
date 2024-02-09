"use server";

import { authOptions } from "@/lib/authOptions";
import { getLiveblocksClient, liveblocksClient } from "@/lib/liveblocksClient";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import exp from "constants";
import { getServerSession } from "next-auth";
import uniqid from "uniqid";

type CreateBoardResult = {
  id: string;
};

export async function createBoard(name: string): Promise<RoomInfo | boolean> {
  const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
  });
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  if (email) {
    const roomId = uniqid.time();
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
      },
    });
  }
  return false;
}

export async function addEmailToBaord(boardId: string, email: string) {
  const rooms = await liveblocksClient.getRoom(boardId);
  const usersAccesses = rooms.usersAccesses;

  usersAccesses[email] = ["room:write"];
  await liveblocksClient.updateRoom(boardId, {
    usersAccesses: usersAccesses,
  });
  return true;
}

export async function removeEmailFromBoard(boardId: string, email: string) {
  const rooms = await liveblocksClient.getRoom(boardId);
  // const usersAccesses = rooms.usersAccesses;
  // delete usersAccesses[email];
  const usersAccesses: any = rooms.usersAccesses;
  usersAccesses[email] = null;
  await liveblocksClient.updateRoom(boardId, {
    usersAccesses: usersAccesses,
  });
  return true;
}

export async function deleteBoard(boardId: string) {
  await liveblocksClient.deleteRoom(boardId);
  return true;
}
export async function updateBoard(boardId:string, updateData:any) {
  const result = await liveblocksClient.updateRoom(boardId, updateData);
  console.log({result});
  return true;
}

