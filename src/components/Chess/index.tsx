import Board from "./Board";

export function Chess() {
    const board = [
        [[32, 21, "a4"], null, null, null, [32, 21, "a4", "a4", "a4", "a4"], null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
        [[32, 21, "a4"], null, null, null, null, null, null, null],
    ]

    return (
        <Board board={board}/>
    );
}

export default Chess;