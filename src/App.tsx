import ChallengeCard from './components/ChallengeCard';
import DifficultyDisplay from './components/DifficultyDisplay';
import { useState } from "react";
import { FaDiceD20 } from "react-icons/fa";
import './App.css';
import './style/components/RollTable.css';

interface Ability{
  id : number,
  name : string
}

function App() {
  const [difficulty, setDifficulty] = useState(11);
  const [advantage, setAdvantage] = useState(0);
  const [abilityRows, setAbilityRows] = useState<Ability[]>([{id:0, name:"Regular d20"}]);
  const [idCounter, setIdCounter] = useState(1);

  const addRow = () =>{
    setIdCounter(idCounter + 1);
    console.log(idCounter);
    setAbilityRows([
      ...abilityRows,
      {
        id: idCounter,
        name: "Ability Check"
      }
    ]);
  };

  const removeRow = (rowId : number) => {
    console.log(`Remove ${rowId}`)
    setAbilityRows(
      abilityRows.filter(a => a.id !== rowId)
    );
  }

  return (<>
    <main>
      <DifficultyDisplay difficulty={difficulty} setDifficulty={setDifficulty} setAdvantage={setAdvantage}/>
      <div className='table-content'>
        
        <button onClick={addRow} className='round-button'> <FaDiceD20/> + </button>
        <table>
          <thead>
          <tr>
            <th className='medium-cell'>Success Rate</th>
            <th className='long-cell'>Roll</th>
            <th className='short-cell'>Modifier</th>
            <th className='short-cell'>d4</th>
            <th className='short-cell'>d6</th>
            <th className='short-cell'>d8</th>
            <th className='short-cell'>d10</th>
            <th className='short-cell'>d12</th>
          </tr>
          </thead>
          <tbody>
            {
              abilityRows.map(ability => (
              <ChallengeCard 
              key={ability.id} 
              rollName={ability.name} 
              rollId={ability.id} 
              difficulty={difficulty} 
              advantage={advantage} 
              onDelete={ () => removeRow(ability.id) }
              />
            ))}
          </tbody>
        </table>
      </div>

    </main>
  </>);
}
export default App
