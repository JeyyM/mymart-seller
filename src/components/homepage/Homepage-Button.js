function HomepageButton(props) {
  return (
    <div className={`homepage-button ${props.item}`}>
      <div className="outline">
        <figure className="home-category__logo"></figure>
        </div>
      <h1>{props.label}</h1>
      <h1 style={{color:"red"}}>Text</h1>
    </div>
  );
}

{
  /* <h1>{props.label}</h1> */
}
export default HomepageButton;
