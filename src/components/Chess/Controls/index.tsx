interface ControlsInterface {
    flipBoard: () => void;
}

function Controls({flipBoard}: ControlsInterface) {
    return ( 
        <div><button onClick={flipBoard}>TURN BOARD</button></div>
     );
}

export default Controls;