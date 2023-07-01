interface ControlsInterface {
    turnBoard: () => void;
}

function Controls({turnBoard}: ControlsInterface) {
    return ( 
        <div><button onClick={turnBoard}>TURN BOARD</button></div>
     );
}

export default Controls;