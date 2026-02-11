import ChallengeCard from './components/ChallengeCard';
import { useState } from "react";
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState(10);
  const [advantage, setAdvantage] = useState(0);
  return <>
    <form className='challenge-form'>
      <label>
        DC
        <input
        type="number" 
        className="form-control" 
        defaultValue={10}
        onChange={e=>setDifficulty(parseInt(e.target.value))}
        />
      </label>
    </form>
    <ChallengeCard rollName={"Guiding Bolt"} difficulty={difficulty} advantage={-1}/>
    <ChallengeCard rollName={"Emperor"} difficulty={difficulty} advantage={0}/>
    <ChallengeCard rollName={"Acrobatics"} difficulty={difficulty} advantage={1}/>
  </>
}
export default App
