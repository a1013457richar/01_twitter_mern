import Board from "@/components/Board";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LoginViews from "@/components/views/LoginViews";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import Borads from "@/components/Borads";
// import Board from "@/components/Board";
export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <LoginViews />;
  }
  return (
    <div>
      <h1 className="text-4xl mb-4">Your Boards</h1>
     <Borads />
      <div className="mt-4">
      <Link href={"/new-board"}
      className="btn primary inline-flex gap-2"
      >
        Create new board <FontAwesomeIcon className="h-6" icon={faArrowRight}/>
      </Link>
      </div>
     
      {/* <Board /> */}
    </div>
  );
}
