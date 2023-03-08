function NavButton(props){
    return <button className="navbutton" onClick={props.menuHandler}>
        {!props.status && <span className="navbutton__hr">&nbsp;</span>}
        {props.status && <span className="navbutton__hr-2">&nbsp;</span>}
    </button>
    }
    
    export default NavButton