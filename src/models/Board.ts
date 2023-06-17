import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

export class Board {
    cells: Cell[][] = [];    
    
    public initCells() {
        for(let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for(let j = 0; j < 8; j++) {
                if((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // Белые ячейки
                }
            }
            this.cells.push(row);
        }
    }

    public initPieces() {
        this.initBishops()
        this.initPawns()
        this.initRooks()
        this.initKings()
        this.initQueens()
        this.initKnights()
    }

    public initBishops() {
        new Bishop(this.cells[0][2], Colors.BLACK)
        new Bishop(this.cells[0][5], Colors.BLACK)
        new Bishop(this.cells[7][2], Colors.WHITE)
        new Bishop(this.cells[7][5], Colors.WHITE)
    }

    public initPawns() {
        for(let i = 0; i < this.cells.length; i++) {
            new Pawn(this.cells[1][i], Colors.BLACK)
            new Pawn(this.cells[6][i], Colors.WHITE)
        }
    }

    initKings() {
        new King(this.cells[0][4], Colors.BLACK)
        new King(this.cells[7][4], Colors.WHITE)
    }

    initQueens() {
        new Queen(this.cells[0][3], Colors.BLACK)
        new Queen(this.cells[7][3], Colors.WHITE)
    }

    initKnights() {
        new Knight(this.cells[0][1], Colors.BLACK)
        new Knight(this.cells[0][6], Colors.BLACK)
        new Knight(this.cells[7][1], Colors.WHITE)
        new Knight(this.cells[7][6], Colors.WHITE)
    }

    initRooks() {
        new Rook(this.cells[0][0], Colors.BLACK)
        new Rook(this.cells[0][7], Colors.BLACK)
        new Rook(this.cells[7][0], Colors.WHITE)
        new Rook(this.cells[7][7], Colors.WHITE)
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }
}