"use client";

import { removeEmailFromBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

const EmailAccessList = ({
  boardId,
  userAccesses
}: {
  boardId: string;
  userAccesses:RoomAccesses
}) => {
  console.log("🚀 ~ userAccesses:", userAccesses)
  
  const router = useRouter();
  async function handleDelete(emails: string) {
    await removeEmailFromBoard(boardId, emails);
    router.refresh();
  }

  return (
    <div className="max-w-xs">
      {userAccesses && Object.keys(userAccesses).map((email) => (
        <div
          key={email}
          className="flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg pl-4"
        >
          {email}
          <button className="btn p-1" onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmailAccessList;
