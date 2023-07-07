import { MoveInterface } from "./types/MoveInterface";

interface MoveHistoryInterface {
    moveHistory: MoveInterface[],
    display?: boolean
}

function MoveHistory({moveHistory, display}: MoveHistoryInterface) {
    if(!display) return;

    

    return ( 
        <div>{moveHistory.map(e => (
            <p>{e.from}</p>
        ))}</div>
     );
}

export default MoveHistory;