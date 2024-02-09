import { ReactSortable } from "react-sortablejs";
import { useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { Card, useMutation } from "@/app/liveblocks.config";
import NewCardForm from "./forms/NewCardForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { default as ColumnCard } from "@/components/Card";
import CancelButton from "./CancelButton";

type ColumnProps = {
  id: string;
  name: string;
};

const Columns = ({ id, name }: ColumnProps) => {
  const [rename, setRename] = useState(false);
  const columnCards = useStorage<Card[]>((root) => {
    return root.cards
      .filter((card) => card.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index);
  }, shallow);
  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index); //get the card index
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);
  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((c) => c.toObject().id === id)?.set("name", newName);
  }, []);
  const setTasksOrderForColumn = useMutation(
    ({ storage }, sortedCards: Card[], newColumnId) => {
      //idsOfSortedCards，該陣列包含了 sortedCards 中所有卡片的 ID
      const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
      //從存儲中獲取所有的卡片，並將它們轉換為物件，然後將這些物件存儲在 allCards 陣列中。
      const allCards: Card[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ];

      //update the colindex and
      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        //allCards 陣列中 ID 為 sortedCardId 的卡片的索引，索引存儲在 cardStorageIndex 變數中。
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );

        //update the column id and the col index
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );
  const deleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns");
    const columnIndex = columns.findIndex((c) => c.toObject().id === id);
    columns.delete(columnIndex);
  }, []);

  const handleNameSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const input = (ev.target as HTMLInputElement).querySelector("input");

    if (input) {
      const newName = input.value;
      updateColumn(id, newName);
      setRename(false);
    }
  };
  return (
    <div className="w-48 shadow-sm bg-white rounded-md p-2">
      {!rename && (
        <div className="flex justify-between">
          <h3>{name}</h3>
          <button className="text-gray-300" onClick={() => setRename(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {rename && (
        <div className="mb-8">
          Edit name:
          <form onSubmit={handleNameSubmit} className="mb-2">
            <input type="text" defaultValue={name} />
            <button type="submit" className="w-full mt-2">
              Save
            </button>
          </form>
          <button
            onClick={() => deleteColumn(id)}
            className="bg-red-500 text-white p-2 flex gap-2 w-full items-center rounded-md justify-center"
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete column
          </button>
          <CancelButton onClick={() => setRename(false)} />
        </div>
      )}
      {!rename && columnCards && (
        <>
          <ReactSortable
            list={columnCards}
            setList={(items) => setTasksOrderForColumn(items, id)}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40"
          >
            {/* {columnCards.map((card) => (
              <div
                key={card.id}
                className="border bg-white my-2 p-4 rounded-md"
              >
                <span>{card.name}</span>
              </div>
            ))} */}
            {columnCards.map((card) => (
              <ColumnCard key={card.id} id={card.id} name={card.name} />
            ))}
          </ReactSortable>
        </>
      )}
      {!rename && <NewCardForm columnId={id} />}
    </div>
  );
};

export default Columns;
