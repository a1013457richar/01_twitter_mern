"use client";

import React, { FormEvent, useState } from "react";
import NewColumn from "./forms/NewColumn";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Column from "./Column";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { metadata } from "@/app/layout";
import { updateBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { BoardContext, BoardProvider } from "./BoardContext";

const Board = ({ id, name }: { id: string; name: string }) => {
  const [rename, setRename] = useState(false);
  const router = useRouter();
  async function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLInputElement).querySelector("input");

    if (input) {
      const newName = input.value;
      await updateBoard(id, {
        metadata: {
          boardName: newName,
        },
      });
      input.value = "";
      setRename(false);
      router.refresh();
    }
  }
  return (
    <BoardProvider>
      <RoomProvider
        id={id}
        initialPresence={{
          cardId: null,
          boardId: null,
        }}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        <ClientSideSuspense fallback={<div>loading...</div>}>
          {() => (
            <>
              <div className="flex gap-2 justify-between items-center mb-6">
                <div>
                  {!rename && (
                    <h1 className="text-2xl" onClick={() => setRename(true)}>
                      Boards:{name}
                    </h1>
                  )}
                  {rename && (
                    <form onSubmit={handleNameSubmit}>
                      <input type="text" defaultValue={name} />
                    </form>
                  )}
                </div>
                <Link
                  href={`/board/${id}/setting`}
                  className="flex gap-2 items-center btn"
                >
                  <FontAwesomeIcon icon={faCog} />
                  Setting
                </Link>
              </div>
              <Column />
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardProvider>
  );
};

export default Board;
