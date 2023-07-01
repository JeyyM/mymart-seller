import { Fragment } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

function HomepageLater(props) {
  const router = useRouter();
  const shopId = router.query.shopid;
  const Link = dynamic(() => import("next/link"));

  const buttonClasses = `  
    background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}), 
    linear-gradient(45deg, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
  `;

  const handleClick = () => {
    alert("Page coming soon!");
  };

  return (
    <Fragment>
      <Head>
        <style>{`
          .bg-gradient-${props.direction} {${buttonClasses}}

          .${props.item}__logo {
            background-image: linear-gradient(
              to bottom,
              ${props.color["color-primary-dark"]},
              ${props.color["color-primary-light"]}
            ) !important;
          }
        `}</style>
      </Head>

      <Link
        className={`homepage-button ${props.item} bg-gradient-${props.direction} x`}
        href={"#"}
        aria-label={props.label}
        onClick={handleClick}
      >
        <figure className={`${props.item}__logo`}></figure>
        <h2 className="home-label heading-secondary">{props.label}</h2>
      </Link>
    </Fragment>
  );
}

export default HomepageLater;
