import type { Roll } from "../classes/Roll";

interface Challenge {
    roll : Roll,
    target : number,
    computeChallenge : (roll:Roll, target:number) => number;
}

function RollButton({roll, target, computeChallenge} : Challenge){
    return(
        <button type="button" className="btn btn-primary" onClick={()=>computeChallenge(roll,target)}>Compute</button>
    );
}
export default RollButton;