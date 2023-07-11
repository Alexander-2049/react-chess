import { createContext } from "react";
import { PieceInterface } from "../types/PieceInterface";
import { movePieceFromToType } from "../..";

interface SelectContextProps {
    movePieceFromToHandler: movePieceFromToType;
    grabbedPiece: PieceInterface | null;
    setGrabbedPiece: React.Dispatch<React.SetStateAction<PieceInterface | null>>;
    selectedPiece: PieceInterface | null;
    setSelectedPiece: React.Dispatch<React.SetStateAction<PieceInterface | null>>;
}

export const SelectContext = createContext<SelectContextProps>({
    grabbedPiece: null,
    selectedPiece: null,
    setGrabbedPiece: () => { console.warn('setGrabbedPiece has to be a useState function') },
    setSelectedPiece: () => { console.warn('setSelectedCell has to be a useState function') },
    movePieceFromToHandler: () => { console.warn('movePieceFromToHandler has to be changed') }
});