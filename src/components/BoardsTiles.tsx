import Link from "next/link";
import React from "react";
import {RoomInfo} from "@liveblocks/node";

const BoardsTiles = ({boards}:{boards:RoomInfo[]}) => {
  return (
    <div className="my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
      {boards?.length > 0 &&
        boards.map((board) => (
          <Link className="bg-gray-200 p-4 rounded-md block " href={`/board/${board.id}`} key={board.id}>
            {board.metadata.boardName}
          </Link>
        ))}
    </div>
  );
};

export default BoardsTiles;
