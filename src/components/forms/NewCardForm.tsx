"use client";

import { CardType, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

function NewCardForm({ columnId }: { columnId: string }) {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<CardType>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        })
      );
    },
    [columnId]
  );

  const handleNewCardFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      <input className="text-gray-900" type="text" placeholder="card name" />
    </form>
  );
}

export default NewCardForm;
