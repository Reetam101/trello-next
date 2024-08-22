import { ItemInterface, ReactSortable } from "react-sortablejs";
import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";

interface ColumnPropsInterface {
  id: string;
  name: string;
}

function Column({ id, name }: ColumnPropsInterface) {
  const columnCards = useStorage<CardType[]>((root) => {
    return root.cards
      .filter((card) => card.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index);
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof CardType, updateData[key]);
      }
    }
  }, []);

  const setTaskOrderForColumn = useMutation(
    ({ storage }, sortedCards: CardType[], newColumnId) => {
      const isOfSortedCards = sortedCards.map((c) => c.id.toString());
      const allCards: CardType[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ];
      isOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );

  return (
    <div className="w-48 bg-white shadow-sm rounded-md p-2 text-gray-950">
      <h3 className="font-bold">{name}</h3>
      {(columnCards?.length as number) > 0 && (
        <ReactSortable
          list={columnCards as CardType[]}
          setList={(cards) => setTaskOrderForColumn(cards, id)}
          group="cards"
          className="min-h-12"
          ghostClass="opacity-40"
        >
          {columnCards?.map((card) => (
            <div
              key={card.id}
              className="border border-gray-300 bg-white my-2 p-4 rounded-md"
            >
              <span>{card.name}</span>
            </div>
          ))}
        </ReactSortable>
      )}
      <NewCardForm columnId={id} />
    </div>
  );
}

export default Column;
