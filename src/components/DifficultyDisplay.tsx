import { useState } from 'react';
import Select from 'react-select';

interface Props{
    difficulty : number,
    setDifficulty : (n : number) => void,
    setAdvantage : (n : number) => void
}

interface Option{
    value : number,
    label : string
}

function DifficultyDisplay({difficulty, setDifficulty, setAdvantage} : Props){
    const options = [
        { value: -1, label: 'Disadvantage' },
        { value: 0, label: 'Straight Roll' },
        { value: 1, label: 'Advantage' }
    ];
    const [selectedOption, setOption] = useState(options[1]);
    
    const onSelectOption = (option : Option) => {
        setOption(option);
        setAdvantage(option.value);
    }
    
    return(
        <form className='challenge-form'>
        <label>
            <h5>DC</h5>
            <input
            type="number" 
            className="form-control dc-display" 
            defaultValue={difficulty}
            onChange={e=>setDifficulty(parseInt(e.target.value))}
            />
        </label>
        
        <Select<Option>
        className='advantageSelect'
        classNamePrefix='selectChild'
        unstyled
        options={options} 
        onChange={(option) => onSelectOption(option ? option : options[1])}
        value={selectedOption}
        />
        </form>
    );
}
export default DifficultyDisplay;