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
    const [advType, setAdvType] = useState(0);
    
    const beat = (roll : Roll, target:number) => {
        const MIN = roll.advType == 0 ? .05 : (roll.advType == -1 ? 0.0975 : 0.0025);
        const MAX = roll.advType == 0 ? 0.95 : (roll.advType == -1 ? 0.9025 : 0.9975);
        const bound = target - 1 - roll.modifier;
        const type = roll.baseType;

        if(bound <= 0) { setChanceText(`${(MAX * 100).toFixed(2)}%`); return MAX; }
        if(bound >= type ) { setChanceText(`${(MIN * 100).toFixed(2)}%`); return MIN; }
        
        const complementary = roll.advType == 1 ? Math.pow(( bound / type ), 2 ) : ( bound / type);

        console.log(`Goal : ${bound}`);
        const baseResult = 1 - complementary;
        const result = roll.advType == -1 ? Math.pow(baseResult, 2) : baseResult;

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
                onChange={e=>setModifier(parseInt(e.target.value))}
                />
            </label>
            <label>
                Roll
                <select 
                defaultValue={0} 
                className="form-select" 
                aria-label="Default select example"
                onChange={e=>setAdvType(parseInt(e.target.value))}
                >
                    <option value={1}>Advantage</option>
                    <option value={0}>Straight Roll</option>
                    <option value={-1}>Disadvantage</option>
                </select>
            </label>
            <label>
                Difficulty Class
                <input name="targetVal" 
                type="number" 
                className="form-control" 
                defaultValue={10}
                onChange={e=>setTarget(parseInt(e.target.value))}
                />
            </label>
            <RollButton 
            roll={{
                name : name,
                baseType : baseType,
                modifier : modifier,
                advType : advType
            }} 
            target={target} 
            computeChallenge={beat}/>
        </form>
        <h3>{chanceText}</h3>
        </>
    );
}
export default ChallengeCard;