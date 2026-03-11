import logo from '../assets/icons/OracrollIcon.png';

function PageHeader(){
    return (
        <div className="page-header">
            <img src={logo}></img>
            <h1>Oracroll</h1>
        </div>
    );
}
export default PageHeader;