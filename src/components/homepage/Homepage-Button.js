import Link from "next/link";
import { Fragment, use } from "react";
import { useRouter } from "next/router";


function HomepageButton(props) {
  const router = useRouter()
  const shopId = router.query.shopid
  return (<Fragment>
    <Link className={`homepage-button ${props.item}`} href={{pathname: `/${shopId}/${props.direction}`, query: { shopid: shopId },}} >
        <figure className={`${props.item}__logo`}></figure>
      <h2 className="home-label heading-secondary">{props.label}</h2>
      <figure className={`${props.item}__logo-outline`}></figure>
    </Link>
    </Fragment>
  );
}
export default HomepageButton;

{/* <Link href={{
        pathname: `/${router.query.shopid}/categories`,
        query: { shopid: router.query.shopid },
      }}>To categories</Link> */}