import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { StyleNames } from "../models/StyleNames";

const BoardComponent = ({style = StyleNames.DEFAULT}) => {
    const cells: any = [];
    let counter = 0;
    for(let i = 0; i < 8; i++) {
        cells.push([]);
        for(let j = 0; j < 8; j++) {
            counter++;

            if(counter % 2 === 1) cells[i].push(new Cell( Colors.WHITE ))
            else cells[i].push(new Cell( Colors.BLACK ))
        }
    }

    console.log(cells);

    return (
        <div>
            
        </div>
    );
};

export default BoardComponent;