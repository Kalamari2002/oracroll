interface Props{
    title:string,
    onPressed: (item: string) => void
}

function CustomButton({title, onPressed}:Props){
    return(
        <button type="button" className="btn" onClick={()=>onPressed(title)}>${title}</button>
    );
}
export default CustomButton