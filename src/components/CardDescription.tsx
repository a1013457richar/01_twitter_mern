import { useRoom } from "@/app/liveblocks.config";
import { Liveblocks } from "@liveblocks/node";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Doc } from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import DescriptionEditor from "./DesciptionEdiotr";

const CardDescription = () => {
  const { cardId } = useParams();
  const room = useRoom();
  const [doc, setDoc] = useState<Doc>();
  const [provider, setProvider] = useState<any | null>(null);
  useEffect(() => {
    const yDoc = new Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };

  }, [room]);
  if (!doc || !provider) {
    return null;
  }
  return (
    <>
      <DescriptionEditor
        doc={doc}
        provider={provider}
        cardId={cardId.toString()}
      />
    </>
  );
};

export default CardDescription;
