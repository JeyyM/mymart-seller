import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ThemePack2(props) {
  const pack1 = props.themeSet.slice(0, 8);
  const pack2 = props.themeSet.slice(8, 16);

  function setCopy(item) {
    props.copy(item)
  }

  function ThemePackItem(props) {
    return (
      <CopyToClipboard text={props.chosenColor}>
      <button style={{ height: '3rem', width: "3rem", backgroundColor: props.chosenColor, borderRadius: "10rem" }} onClick={() => { props.action(props.chosenColor) }}>&nbsp;</button>
      </CopyToClipboard>
    );
  }

  return <div className="item-setup">
    <div className="theme-pack-colors">
      {pack1.map((color, index) => (
        <ThemePackItem key={index} chosenColor={color} action={setCopy} />
      ))}
    </div>

    <div className="theme-pack-colors">
      {pack2.map((color, index) => (
        <ThemePackItem key={index} chosenColor={color} action={setCopy} />
      ))}
    </div>
  </div>
}