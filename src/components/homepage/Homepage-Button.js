function HomepageButton(props) {
  return (
    <div className={`homepage-button ${props.item}`}>
      {/* <div className="outline">Stuff</div> */}
        <figure className="home-category__logo"></figure>
      <h1>{props.label}</h1>
      <figure className="home-category__logo home-category__logo-2"></figure>
      <h1 style={{color:"red"}}>Text</h1>
    </div>
  );
}

{
  /* <h1>{props.label}</h1> */
}
export default HomepageButton;
