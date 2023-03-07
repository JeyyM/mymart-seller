function HomepageButton(props) {
  return (
    <div className={`homepage-button ${props.item}`}>
      {/* <div className="outline">Stuff</div> */}
        <figure className={`${props.item}__logo`}></figure>
      <h2 className="home-label">{props.label}</h2>
      <figure className={`${props.item}__logo-outline`}></figure>
    </div>
  );
}

{
  /* <h1>{props.label}</h1> */
}
export default HomepageButton;
