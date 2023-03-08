function HomepageButton(props) {
  return (
    <div className={`homepage-button ${props.item}`}>
      {/* <div className="outline">Stuff</div> */}
        <figure className={`${props.item}__logo`}></figure>
      <h2 className="home-label heading-secondary">{props.label}</h2>
      <figure className={`${props.item}__logo-outline`}></figure>
    </div>
  );
}
export default HomepageButton;
