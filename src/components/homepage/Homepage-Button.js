import { Fragment } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

function HomepageButton(props) {
  const router = useRouter();
  const shopId = router.query.shopid;
  const Link = dynamic(() => import("next/link"));

  const buttonClasses = `  
  background-image: url("${props.direction}.jpg"), 
    linear-gradient(45deg, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
`

  let extension = ""

  if (props.extra) { extension = props.extra } else {
    extension = ""
  }

  return (
    <Fragment>
      <Head>
        <style>
          {`
  .bg-gradient-${props.direction} {${buttonClasses}}

  .${props.item}::before {
        background-image: linear-gradient(
    to right,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;
  }

  .${props.item}::after {
        background-image: linear-gradient(
    to right,
    ${props.color["bg-item"]},
    ${props.color["bg-item"]}
  ) !important;
  }

  .${props.item}__logo {
    background-image: linear-gradient(
    to bottom,
    ${props.color["color-primary-dark"]},
    ${props.color["color-primary-light"]}
  ) !important;
  }

  .${props.item}__logo-outline {
    background-image: linear-gradient(
    to bottom,
    ${props.color["bg-item"]},
    ${props.color["bg-item"]}
  ) !important;
  }

  ` }

        </style>
      </Head>
      <Link
        className={`homepage-button ${props.item} bg-gradient-${props.direction} x`}
        href={{
          pathname: `/${shopId}/${props.direction}${extension}`,
          query: { shopid: shopId },
        }}
        aria-label={props.label}
        title={props.title}
      >
        <figure className={`${props.item}__logo`}></figure>
        <h2 className="home-label heading-secondary">{props.label}</h2>
        <figure className={`${props.item}__logo-outline`}></figure>
      </Link>
    </Fragment>
  );
}

export default HomepageButton;
