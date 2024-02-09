"use server";

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { useParams } from "next/navigation";

type Props = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage(props: Props) {
  const boardId = props.params.boardId;
  const email = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const emailWhoHasAccess = [];

  const userAccess = boardInfo.usersAccesses?.[email];
  
  const hasAccess = userAccess && [...userAccess].includes("room:write");
  if (!hasAccess) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      
      <Board id={boardId} name={boardInfo.metadata.boardName.toString()}/>
    </div>
  );
}
