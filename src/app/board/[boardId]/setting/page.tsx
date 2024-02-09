"use server";

import NewBoardAccess from "@/components/forms/NewBoardAccess";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
// import BoardDeleteButton from "@/components/BoardDeleteButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getUserEmail } from "@/lib/userClient";
import EmailAccessList from "@/components/EmailAccessList";
import BoardDeleteButton from "@/components/BoardDeleteButton";
type PageProps = {
  params: {
    boardId: string;
  };
};
const page = async ({ params }: PageProps) => {
  const { boardId } = params;
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const email = await getUserEmail();
  if (!boardInfo.usersAccesses[email]) {
    return <div>Not authorized</div>;
  }
  return (
    <div>
      <div className="flex justify-between">
        <Link
          className="inline-flex gap-1 items-center btn mb-4"
          href={`/boards/${boardId}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go back to board
        </Link>
        <BoardDeleteButton boardId={boardId} />
      </div>
      <h1 className="text-2xl">
        Access to board:{boardInfo.metadata.boardName}
      </h1>
      <div className="mt-8">
        <EmailAccessList 
        boardId={boardId}
        userAccesses={boardInfo.usersAccesses} 
        />
      </div>
      <NewBoardAccess boardId={boardId} />
    </div>
  );
};

export default page;
