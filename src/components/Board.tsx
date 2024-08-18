"use client";

import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const defaultColumns = [
  {
    id: "col1",
    name: "todo",
    index: 0,
  },
  {
    id: "col2",
    name: "in progress",
    index: 1,
  },
  {
    id: "col3",
    name: "done",
    index: 2,
  },
];

export type CardType = {
  name: string;
  id: string | number;
  index: number;
  columnId: string;
};

const defaultCards = [
  {
    id: "card1",
    name: "task 1",
    index: 0,
    columnId: "col1",
  },
  {
    id: "card2",
    name: "task 2",
    index: 1,
    columnId: "col1",
  },
  {
    id: "card3",
    name: "task 3",
    index: 2,
    columnId: "col2",
  },
  {
    id: "card4",
    name: "task 4",
    index: 3,
    columnId: "col3",
  },
];

export default function Board() {
  const [cards, setCards] = useState(defaultCards);
  const [columns, setColumns] = useState(defaultColumns);
  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <Column
          key={column.id}
          {...column}
          id={column.id}
          setCards={setCards}
          cards={cards
            .sort((a, b) => a.index - b.index)
            .filter((c) => c.columnId === column.id)}
        />
      ))}
      <NewColumnForm />
    </div>
  );
}
