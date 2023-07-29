export default function ThemePack(props) {
  function Work() {
    props.set(props.themeSet)
  }

  return <button className="theme-pack item-setup" onClick={Work}>
    <h2 className="heading-secondary" style={{ textAlign: "left" }}>{props.themeSet[12]}</h2>
    <div className="theme-pack-colors">
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[0]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[1]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[2]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[3]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[4]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[5]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[6]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
      <div style={{ height: '3rem', width: "3rem", backgroundColor: `${props.themeSet[7]}`, border: "3px solid", borderRadius: `${props.themeSet[8]}px ${props.themeSet[9]}px ${props.themeSet[10]}px ${props.themeSet[11]}px` }}>&nbsp;</div>
    </div>
  </button>
}