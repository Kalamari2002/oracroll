import { useState } from "react";

import type { Roll } from "../interfaces/Roll";

interface Props{
    rollName : string,
    difficulty : number,
    advantage : number
}

function ChallengeCard({ rollName, difficulty, advantage} : Props){
    
    const [name, setName] = useState(rollName);
    const [modifier, setModifier] = useState(0);

    const rateText = () => {
        const subtraction = 20 - (difficulty - 1 - modifier);
        const base = Math.max(0.05, Math.min(0.95, subtraction / 20));
        const result = advantage == -1 ? Math.pow(base, 2) : ( 
                advantage == 1 ?  1 - Math.pow(1 - base, 2) :
                base
        ); 
        return (result * 100).toFixed(2); 
    }

    return( <>
        <form>
            <label>
                { rateText() }%
            </label>
            <label>
                Title
                <input name="abilityTitle" 
                type="text" 
                className="form-control" 
                defaultValue={rollName}
                onChange={e=>setName(e.target.value)}
                />
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
        </form>
        </>
    );
}
export default ChallengeCard;