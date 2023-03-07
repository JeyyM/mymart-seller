function HomepageButton(props) {
  return (
    <div className={`homepage-button ${props.item}`}>
      {/* <div className="outline">Stuff</div> */}
        <figure className="home-category__logo"></figure>
      <h1>{props.label}</h1>
    </div>
  );
}

{
  /* <h1>{props.label}</h1> */
}
export default HomepageButton;
