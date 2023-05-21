import { useState, Fragment } from "react";

function SocialOptions(props) {
  const socialOptions = [
    "None", "Facebook", "Instagram", "Linkedin", "Pinterest", "Tiktok", "Twitter", "Youtube"
  ];

  const [selectSocial, setSelectSocial] = useState(props.defaultSocials);

  const handleSelectSocial = (event, index) => {
    setSelectSocial(event.target.value);
    props.effect(index, event.target.value);
  };

  return (
    <Fragment>
      <select
        value={selectSocial}
        className={`text-options text-span ${props.type}`}
        style={{ width: "40%" }}
        onChange={(event) => handleSelectSocial(event, props.index)}
      >
        {socialOptions.map(social => (
          <option key={social} value={social}>{social}</option>
        ))}
      </select>
    </Fragment>
  );
}

export default SocialOptions;
