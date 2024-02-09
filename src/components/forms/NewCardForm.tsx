"use client";
import { Card, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

const NewCardForm = ({ columnId }: {columnId: string}) => {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        })
      );
    },
    [columnId]
  );

  const handleCardFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleCardFormSubmit}>
       <input type="text" placeholder="card name"/>
    </form>
  );
};

export default NewCardForm;
