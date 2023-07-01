import Piece from './Piece';
import styles from './styles/Cell.module.scss';
import { CellInterface } from './types/CellInterface';
import React from 'react';

import { useContext, useState } from 'react';
import { SelectContext } from './Board';
import { Hint } from './Hint';
import { HintTypes } from './types/HintTypes';

interface CellProps {
    cell: CellInterface;
}

const blackCells = ['a1','a3','a5','a7','b2','b4','b6','b8','c1','c3','c5','c7','d2','d4','d6','d8',
                'e1','e3','e5','e7','f2','f4','f6','f8','g1','g3','g5','g7','h2','h4','h6','h8',]

export function Cell({cell}: CellProps) {
    const { 
            grabbedPiece,
            setGrabbedPiece,
            selectedPiece,
            setSelectedPiece,
            movePieceFromToHandler
        } = useContext(SelectContext);
    const [isPreventDeselect, setIsPreventDeselect] = useState(true);

    function onMouseDown(e: React.MouseEvent<HTMLElement>) {
        if(e.button === 0) {
            if(selectedPiece === null) {
                if(cell.piece === null) {
                    setSelectedPiece(null);
                } else if(cell.piece !== null) {
                    setSelectedPiece(cell.piece);
                    setGrabbedPiece(cell.piece);
                }
                setIsPreventDeselect(true);
            } else if(selectedPiece !== null) {
                const canMove = selectedPiece.possibleMoves.includes(cell.coordinates);
                if(canMove) {
                    movePieceFromToHandler(selectedPiece.coordinates, cell.coordinates);
                    setSelectedPiece(null);
                    setGrabbedPiece(null);
                    setIsPreventDeselect(true);
                } else if(!canMove) {
                    if(cell.piece !== null) {
                        if(selectedPiece.coordinates === cell.coordinates) {
                            setIsPreventDeselect(false);
                        } else {
                            setIsPreventDeselect(true);
                        }
                        setSelectedPiece(cell.piece);
                        setGrabbedPiece(cell.piece);
                    } else if(cell.piece === null) {
                        setSelectedPiece(null);
                        setGrabbedPiece(null);
                        setIsPreventDeselect(true);
                    }
                }
            }
        }
        if(e.button === 2) {
            console.log('RIGHT', cell.coordinates);
        }
    }

    function onMouseUp(e: React.MouseEvent<HTMLElement>) {
        if(e.button === 0) {
            if(grabbedPiece === null) return;
            else if(grabbedPiece !== null) {
                if(grabbedPiece.possibleMoves.includes(cell.coordinates)) {
                    movePieceFromToHandler(grabbedPiece.coordinates, cell.coordinates);
                    setSelectedPiece(null);
                } else if(grabbedPiece.coordinates === cell.coordinates) {
                    if(isPreventDeselect) {
                        setIsPreventDeselect(false);
                    } else {
                        setSelectedPiece(null);
                        setIsPreventDeselect(true);
                    }
                }
            }
            setGrabbedPiece(null);
        }
        if(e.button === 2) {
            console.log('RIGHT UP', cell.coordinates);
        }
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
        // prevent the right-click menu from appearing
        e.preventDefault();
    };

    return ( <div
        onContextMenu={handleContextMenu}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={[
            styles.cellWrapper,
            blackCells.includes(cell.coordinates) ? styles.black : styles.white,
            cell.coordinates === selectedPiece?.coordinates ? styles.selected : '',
            grabbedPiece === null ? '' : styles.hoverEffectOnGrab
    ].join(' ')}>
        {cell.piece === null ? '' : <Piece piece={cell.piece}/>}
        {selectedPiece !== null && selectedPiece.possibleMoves.includes(cell.coordinates) ?
        (cell.piece === null ? <Hint type={HintTypes.cell}/> : <Hint type={HintTypes.piece}/>) : ''}
    </div> );
}

export default Cell;