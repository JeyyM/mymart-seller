import Link from "next/link";
import { Fragment, use } from "react";
import { useRouter } from "next/router";


function HomepageButton(props) {
  const router = useRouter()
  const shopId = router.query.givenid
  return (<Fragment>
    <Link className={`homepage-button ${props.item}`} href={{pathname: "/[givenid]/categories", query: { givenid: 'id' },}}>
        <figure className={`${props.item}__logo`}></figure>
      <h2 className="home-label heading-secondary">{props.label}</h2>
      <figure className={`${props.item}__logo-outline`}></figure>
    </Link>
    </Fragment>
  );
}
export default HomepageButton;
