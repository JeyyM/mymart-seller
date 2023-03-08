import { Fragment } from "react";

function NavMenuItem(props) {
  return (
    <Fragment>
      <button className="navmenu-item">
        <div className={`menu-${props.logo}`}>&nbsp;</div>
        <h2 className="heading-secondary">{props.label}</h2>
      </button>
    </Fragment>
  );
}

export default NavMenuItem;
