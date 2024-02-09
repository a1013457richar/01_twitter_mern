"use client";
// import {BoardContext} from "@/components/BoardContexts.tsx";
import PresenceAvatars from "../components/PresenceAvatars";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BoardContext } from "./BoardContext";

export default function Card({ id, name }: { id: string; name: string }) {
  const params = useParams();
  const router = useRouter();
  const { openCard } = useContext(BoardContext);
  

  useEffect(() => {
    const {boardId, cardId} = params;
    
    if(cardId && !openCard){
      router.push(`/board/${boardId}/cards/${cardId}`);
    }
    
    if (!cardId && openCard) {
      router.push(`/board/${boardId}`);
    }
  }, [params, openCard, router]);

  return (
    <Link
      href={`/board/${params.boardId}/cards/${id}`}
      className="relative border block bg-green-300 my-2 py-4 px-4 rounded-md"
    >
      <span>{name}</span>
      <div className="absolute bottom-1 right-1">
        <PresenceAvatars presenceKey={'cardId'} presenceValue={id} />
      </div>
    </Link>
  );
}
