import Link from "next/link";
import { Fragment } from "react";
import { useLocation, useSearchParams } from "react-router-dom";


function HomepageButton(props) {
  // location = useLocation().search
  return (<Fragment>
    <Link className={`homepage-button ${props.item}`} href="/categories">
        <figure className={`${props.item}__logo`}></figure>
      <h2 className="home-label heading-secondary">{props.label}</h2>
      <figure className={`${props.item}__logo-outline`}></figure>
    </Link>
    </Fragment>
  );
}
export default HomepageButton;
