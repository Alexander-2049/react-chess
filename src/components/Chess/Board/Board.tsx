import { useEffect, useState, useRef, useCallback } from 'react';
import { PieceInterface } from "./types/PieceInterface";
import { CellInterface } from './types/CellInterface';
import styles from './styles/Board.module.scss';
import Row from './Row';
import { collectPiecesErrors } from '../utils/collectPiecesErrors';
import { getBoardWithPieces } from '../utils/getBoardWithPieces';
import { movePieceFromToType } from '..';
import { soundCapture, soundMoveSelf } from '../utils/sounds';
import Piece from './Piece';
import { SelectContext } from './context/SelectContext';

interface BoardProps {
    pieces: PieceInterface[];
    isBoardWhiteSide: boolean;
    movePieceFromTo: movePieceFromToType;
}

const Board = ({pieces, isBoardWhiteSide, movePieceFromTo}: BoardProps) => {
    const [board, setBoard] = useState<CellInterface[][] | null>(null);
    const [selectedPiece, setSelectedPiece] = useState<PieceInterface | null>(null);
    const [grabbedPiece, setGrabbedPiece] = useState<PieceInterface | null>(null);

    // used for grabbed piece
    // piece sticks to the cursor
    // piece is locating in the cell and cell have 1/8 size of the board
    const [grabbedPieceWidth, setGrabbedPieceWidth] = useState<number>(0);
    const [grabbedPieceHeight, setGrabbedPieceHeight] = useState<number>(0);
    const [grabbedPieceX, setGrabbedPieceX] = useState<number>(0);
    const [grabbedPieceY, setGrabbedPieceY] = useState<number>(0);
    const [isMouseOnTheBoard, setIsMouseOnTheBoard] = useState(false);
  
    const boardRef = useRef<HTMLInputElement>(null);

    // setting up piece width, height
    // tracking mouse position and setting up X and Y coordinates
    const setupGrabbedPieceSettings = useCallback((event: React.MouseEvent<HTMLElement>) => {
        // Setup grabbed piece width and height
        const width = !boardRef.current?.offsetWidth ? 0 : boardRef.current.offsetWidth;
        const height = !boardRef.current?.offsetHeight ? 0 : boardRef.current.offsetHeight;
    
        setGrabbedPieceWidth(width / 8)
        setGrabbedPieceHeight(height / 8)
    
        
        if(!boardRef.current) return;
        const { clientX, clientY } = event;
        const { left, top } = boardRef.current.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
    
        setGrabbedPieceX(x);
        setGrabbedPieceY(y);
    }, [boardRef]);

    // tracking PIECES prop update and board flip prop
    // building new board and filling cells with updated pieces
    // flipping the board if required
    useEffect(() => {
        const piecesErrors = collectPiecesErrors(pieces);
        if(piecesErrors) return console.warn(piecesErrors);

        const board = getBoardWithPieces(pieces);
        if(!isBoardWhiteSide) {
            for(const row of board) {
                row.reverse();
            }
            board.reverse();
        }
        setBoard(board);
    }, [pieces, isBoardWhiteSide]);

    const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
        if(!grabbedPiece) return;
        setupGrabbedPieceSettings(event);
    }, [grabbedPiece, setupGrabbedPieceSettings]);
    const onMouseDown = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setupGrabbedPieceSettings(event);
    }, [setupGrabbedPieceSettings]);

    // when we drop piece to a possibleMoves cell
    // piece is getting instantly located in that cell
    // then we are waiting for PIECES prop change
    // so user is gonna see that he moved a piece instantly
    // also he hears a sound
    // TOOD: should be added opponent move tracking to make a sound for it
    const movePieceFromToHandler = useCallback((from: string, to: string) => {
        if(board === null) return;
        let pieceCaptured = false;
        let fromCell_i_j = [0, 0];
        let toCell_i_j = [0, 0];
        let movingPiece: PieceInterface | null = null;

        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                const cell = board[i][j];
                if(cell.coordinates === to && cell.piece !== null) {
                    pieceCaptured = true;
                }
                if(cell.coordinates === from) {
                    fromCell_i_j = [i, j];
                    movingPiece = cell.piece;
                }
                if(cell.coordinates === to) toCell_i_j = [i, j];
            }
        }
        const updatedBoard: CellInterface[][] = board;

        updatedBoard[fromCell_i_j[0]][fromCell_i_j[1]].piece = null;
        updatedBoard[toCell_i_j[0]][toCell_i_j[1]].piece = movingPiece;

        setBoard(updatedBoard);

        if(pieceCaptured) {
            soundCapture();
        } else {
            soundMoveSelf();
        }
        movePieceFromTo(from, to);
    }, [board, movePieceFromTo]);

    const onMouseLeave = useCallback(() => {
        setIsMouseOnTheBoard(false);
    }, []);
    const onMouseEnter = useCallback(() => {
        setIsMouseOnTheBoard(true);
    }, []);
    const onMouseUpOutsideOfTheBoard = useCallback(() => {
        setGrabbedPiece(null);
    }, []);
    const handleMouseMoveListener = useCallback((event: MouseEvent) => {
        if(!boardRef.current) return;
        const { clientX, clientY } = event;
        const { left, top, width, height } = boardRef.current.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        if(x > width) setGrabbedPieceX(width);
        else if(x < 0) setGrabbedPieceX(0);
        else setGrabbedPieceX(x);
        if(y > height) setGrabbedPieceY(height);
        else if(y < 0) setGrabbedPieceY(0);
        else setGrabbedPieceY(y);
    }, [boardRef]);

    useEffect(() => {
        if(!isMouseOnTheBoard && grabbedPiece !== null) {
            window.addEventListener('mousemove', handleMouseMoveListener);
            window.addEventListener('mouseup', onMouseUpOutsideOfTheBoard);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMoveListener);
            window.removeEventListener('mouseup', onMouseUpOutsideOfTheBoard);
        }
    }, [isMouseOnTheBoard, grabbedPiece, handleMouseMoveListener, onMouseUpOutsideOfTheBoard])

    if(board === null) return;
    return (
        <SelectContext.Provider value={{ grabbedPiece, setGrabbedPiece, movePieceFromToHandler, selectedPiece, setSelectedPiece }}>
            <div
                className={[
                    styles.boardWrapper,
                    grabbedPiece === null ? '' : styles.boardHover
                ].join(' ')}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                ref={boardRef}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
            >
                {board.map((row, index) => <Row key={`row-${index}`} row={row} rowIndex={index}/>)}

                {grabbedPiece !== null ? <Piece piece={grabbedPiece} grab={{posX: grabbedPieceX, posY: grabbedPieceY, width: grabbedPieceWidth, height: grabbedPieceHeight}}/> : ''}
            </div>
        </SelectContext.Provider>
    );
};

export default Board;