function NavItem(props){
    return <button className="navitem">{props.svg}
    <h3>{props.label}</h3></button>
}

export default NavItem