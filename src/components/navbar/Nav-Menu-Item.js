import { Fragment } from "react";
import Link from "next/link"
import { useRouter } from "next/router"

function NavMenuItem(props) {
  const router = useRouter()
  const handleClick = () => {
    props.exit()
    router.push(`/${router.query.shopid}/${props.link}`);
  };

  return (
    <div title={props.title} style={{ textDecoration: 'none' }} onClick={handleClick}>
      <button className="navmenu-item" onClick={props.function}>
        <div className={`menu-${props.logo} svg-color`} style={{marginLeft:"-1.5rem"}}>&nbsp;</div>
        <h2 className="heading-secondary">{props.label}</h2>
      </button>
    </div>
  );
}

export default NavMenuItem;
