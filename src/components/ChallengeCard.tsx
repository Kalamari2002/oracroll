import { useState } from "react";

interface Props{
    rollName : string,
    rollId : number,
    difficulty : number,
    advantage : number,
    onDelete : () => void
}

function ChallengeCard({ rollName, rollId, difficulty, advantage, onDelete} : Props){
    
    const [name, setName] = useState(rollName);
    const [modifier, setModifier] = useState(0);
    const [id] = useState(rollId);

    const rateText = () => {
        const subtraction = 20 - (difficulty - 1 - modifier);
        const base = Math.max(0.05, Math.min(0.95, subtraction / 20));
        const result = advantage == -1 ? Math.pow(base, 2) : ( 
                advantage == 1 ?  1 - Math.pow(1 - base, 2) :
                base
        ); 
        return (result * 100).toFixed(2); 
    }

    return (
        <tr>
            <td>{id} { rateText() }%</td>
            <td>
                <input name="abilityTitle" 
                type="text" 
                className="form-control" 
                defaultValue={name}
                onChange={e=>setName(e.target.value)}
                />
            </td>
            <td>
                <input name="modifierVal" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>setModifier(parseInt(e.target.value))}
                />
            </td>
            <td><button onClick={onDelete}> X </button></td>
        </tr>

    );
}
export default ChallengeCard;