import { Board } from "../models/Board";
import {FC} from 'react';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

    return (
        <div>
            test
        </div>
    );
};

export default BoardComponent;