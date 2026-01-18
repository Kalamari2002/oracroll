import { useState } from "react";
import RollButton from "./RollButton";
import type { Roll } from "../classes/Roll";

interface Props{
    rollName : string
}

function ChallengeCard({ rollName } : Props){
    
    const [target, setTarget] = useState(10);
    const [name, setName] = useState(rollName);
    const [baseType, setBaseType] = useState(20);
    const [modifier, setModifier] = useState(0);
    const [chanceText, setChanceText] = useState("");
    
    const beat = (roll : Roll, target:number) => {
        const type = roll.baseType;
        const goal = target - 1 - roll.modifier;
        const result = Math.min( Math.max(1 - ( goal / type ), 0.05), 0.95 );
        
        setChanceText(`${(result * 100).toFixed(2)}%`);

        return result;
    }

    return( <>
        <h2>{name}</h2>
        <form>
            <label>
                Dice
                <select defaultValue={"20"} className="form-select" aria-label="Default select example">
                    <option value="4">d4</option>
                    <option value="6">d6</option>
                    <option value="8">d8</option>
                    <option value="10">d10</option>
                    <option value="12">d12</option>
                    <option value="20">d20</option>
                    <option value="100">d100</option>
                </select>
            </label>
            <label>
                Modifier
                <input name="modifierVal" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setModifier(parseInt(e.target.value));}}
                />
            </label>
            <label>
                Target
                <input name="targetVal" 
                type="number" 
                className="form-control" 
                defaultValue={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setTarget(parseInt(e.target.value));}}
                />
            </label>
            <RollButton 
            roll={{
                name : name,
                baseType : baseType,
                modifier : modifier
            }} 
            target={target} 
            computeChallenge={beat}/>
        </form>
        <h3>{chanceText}</h3>
        </>
    );
}
export default ChallengeCard;