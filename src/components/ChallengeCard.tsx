import { useState } from "react";
import { compute } from "./ComputeTest";

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

    const [bonus, setBonus] = useState({
        d4 : 0,
        d6 : 0,
        d8 : 0,
        d10 : 0,
        d12 : 0
    });

    const prob = compute(difficulty - modifier, advantage, bonus.d4, bonus.d6, bonus.d8, bonus.d10, bonus.d12);
    
    const rateCellStyle = {
        color: `hsl(${prob * 100 * 1.2}, 80%, 50%)`,
        fontSize: `1.2rem`
    }

    const changeBonus = (dice : string, value : number) => {
        setBonus(prev => ({...prev,[dice] : value}));
    }

    return (
        <tr>
            <td style={rateCellStyle}>{ (prob * 100).toFixed(2) }%</td>
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
            <td>
                <input name="d4" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>changeBonus("d4",parseInt(e.target.value))}
                />
            </td>
            <td>
                <input name="d6" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>changeBonus("d6",parseInt(e.target.value))}
                />
            </td>
            <td>
                <input name="d8" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>changeBonus("d8",parseInt(e.target.value))}
                />
            </td>
            <td>
                <input name="d10" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>changeBonus("d10",parseInt(e.target.value))}
                />
            </td>
            <td>
                <input name="d12" 
                type="number" 
                className="form-control" 
                defaultValue={0}
                onChange={e=>changeBonus("d12",parseInt(e.target.value))}
                />
            </td>
            <td><button onClick={onDelete} className='round-button'> X </button></td>
        </tr>

    );
}
export default ChallengeCard;