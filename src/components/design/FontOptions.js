import { useState, useEffect, Fragment } from 'react';

function FontOptions(props) {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCHSvAOppzFRIYL_yHwshnQKXejDRFqK-4&sort=popularity")
      .then(response => response.json())
      .then(data => setFonts(data.items.slice(0, 20)))
      .catch(error => console.error(error));
  }, []);

  const webSafeFonts = [
    { family: 'Arial, sans-serif' },
    { family: 'Arial Black, sans-serif' },
    { family: 'Arial Narrow, sans-serif' },
    { family: 'Arial Rounded MT Bold, sans-serif' },
    { family: 'Avant Garde, sans-serif' },
    { family: 'Calibri, sans-serif' },
    { family: 'Candara, sans-serif' },
    { family: 'Century Gothic, sans-serif' },
    { family: 'Franklin Gothic Medium, sans-serif' },
    { family: 'Futura, sans-serif' },
    { family: 'Geneva, sans-serif' },
    { family: 'Gill Sans, sans-serif' },
    { family: 'Helvetica, sans-serif' },
    { family: 'Impact, sans-serif' },
    { family: 'Lucida Grande, sans-serif' },
    { family: 'Optima, sans-serif' },
    { family: 'Segoe UI, sans-serif' },
    { family: 'Tahoma, sans-serif' },
    { family: 'Trebuchet MS, sans-serif' },
    { family: 'Verdana, sans-serif' },
    { family: 'Georgia, serif' },
    { family: 'Palatino, serif' },
    { family: 'Times New Roman, serif' },
    { family: 'Courier, monospace' },
    { family: 'Courier New, monospace' },
    { family: 'Lucida Console, monospace' },
    { family: 'Monaco, monospace' },
    { family: 'Andale Mono, monospace' },
    { family: 'Consolas, monospace' },
    { family: 'Copperplate, fantasy' },
    { family: 'Papyrus, fantasy' },
    { family: 'Brush Script MT, cursive' },
    { family: 'Comic Sans MS, cursive' },
    { family: 'Impact, fantasy' },
    { family: 'Rockwell, serif' },
    { family: 'Bookman, serif' },
    { family: 'Garamond, serif' },
    { family: 'Baskerville, serif' },
    { family: 'Didot, serif' },
    { family: 'Bodoni MT, serif' },
    { family: 'Constantia, serif' },
    { family: 'Cambria, serif' },
    { family: 'Hoefler Text, serif' },
    { family: 'Perpetua, serif' },
    { family: 'Rockwell Extra Bold, serif' },
    { family: 'Rockwell Bold, serif' },
    { family: 'Rockwell Condensed, serif' },
    { family: 'Trajan Pro, serif' },
  ];
  
  const [selectFont, setSelectFont] = useState(props.defaultFont)
  const handleSelectFont = (event) => {
    setSelectFont(event.target.value);
  };

  const fontList = fonts.map(font => (font.family))

  console.log("fonts", fontList)
  

  return (
    <Fragment>
    <select className={`text-options text-span ${props.type}`} style={{width: "100%", fontFamily: `${selectFont}`}} onChange={(event) => handleSelectFont(event)}>
    {fonts.map(font => (font.family !== "Material Icons" &&
        <option key={font.family} value={font.family} style={{fontFamily: `${font.family}`}}>{font.family}</option>
      ))}
      {webSafeFonts.map(font => (
        <option key={font.family} value={font.family} style={{fontFamily: `${font.family}`}}>{font.family}</option>
      ))}
    </select>
    </Fragment>

    // <Fragment>
    // <select className='text-options text-span' style={{width: "100%"}}>
    //   {fonts.map(font => (
    //     <option key={font.family} value={font.family}>{font.family}</option>
    //   ))}
    // </select>
    // </Fragment>
  );
}

export default FontOptions;

// color: $text-primary-color;
// font-size: 3.5rem;
// font-family: 'Roboto';
// font-weight: 900;
// margin-left: 2rem;
// word-wrap: break-word;
// overflow-wrap: break-word;
// max-width: 85vw;

// {font-family: ${props.color["text-secondary-font"]} !important;
//     color: ${props.color["text-secondary-color"]} !important;
//     font-weight: 700 !important;}

// {
//     box-shadow: inset 0 0 0 2rem ${props.color["bg-item"]}, 0 0 0 2px ${props.color["color-primary-dark"]},
//     0 0 0 4px ${props.color["bg-item"]} !important;
// }

// {
//     background-image: linear-gradient(${props.color["bg-item"]}, ${props.color["bg-item"]}),
//     linear-gradient(to right, ${props.color["color-primary-dark"]}, ${props.color["color-primary-light"]}) !important;
//     filter: brightness(120%) !important
//     }

// {
//     filter: brightness(150%) !important;
//   outline-color: ${props.color["color-primary-dark"]} !important;
// }