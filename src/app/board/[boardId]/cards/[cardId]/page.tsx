
import BoardPage from "../../../../board/[boardId]/page";

type BoardPageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

export default function Page({ params }: BoardPageProps) {
  return <BoardPage params={params} />;
}
