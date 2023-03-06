
function NavItem(props){
    return <button className="navitem">{props.svg}
    <h3 className="navtext">{props.label}</h3></button>
}

export default NavItem