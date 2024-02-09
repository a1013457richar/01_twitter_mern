"use server"
import BoardsTiles from "../components/BoardsTiles";
import {liveblocksClient} from "@/lib/liveblocksClient";
import {getUserEmail} from "@/lib/userClient";
const Borads = async() => {
    const email = await getUserEmail();
    const {data:rooms} = await liveblocksClient.getRooms({userId: email});
    return (
      <BoardsTiles boards={rooms} />
    );
}

export default Borads