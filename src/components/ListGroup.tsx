import { useState } from "react";

import CustomButton from "./CustomButton";

interface Props{
    items: string [],
    heading: string,
}
function ListGroup({items, heading} : Props){

    const [selectedIdx, setSelectedIndex] = useState(-1);
    const printName = (name:string) => console.log(name);

    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No items</p>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li className={ selectedIdx === index ? "list-group-item active" : "list-group-item"} 
                    key={item} 
                    onClick={()=>{setSelectedIndex(index);}}>
                        {item}
                    </li>
                ))}
            </ul>
            <CustomButton title="Button" onPressed={printName}/>

        </>
    );
}
export default ListGroup;