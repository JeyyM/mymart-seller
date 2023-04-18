import { Fragment } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

function HomepageButton(props) {
  const router = useRouter();
  const shopId = router.query.shopid;
  const Link = dynamic(() => import("next/link"));

  return (
    <Fragment>
    <Head>
    <style> 
  { `
  .home-category {  
    background-image: url("/category.jpg"), 
      linear-gradient(45deg, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
  }
  ` }
</style>
    </Head>
      <Link
        className={`homepage-button ${props.item}`}
        href={{
          pathname: `/${shopId}/${props.direction}`,
          query: { shopid: shopId },
        }}
        aria-label={props.label}
      >
        <figure className={`${props.item}__logo`}></figure>
        <h2 className="home-label heading-secondary">{props.label}</h2>
        <figure className={`${props.item}__logo-outline`}></figure>
      </Link>
    </Fragment>
  );
}

export default HomepageButton;
