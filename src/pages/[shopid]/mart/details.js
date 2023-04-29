import { Fragment, useEffect } from "react"
import { getServerSideProps } from "../categories"
import Head from "next/head"
import Footer from "@/components/Mart/Footer"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SocialOptions from "@/components/detail/SocialOptions"
import Link from "next/link"
import { useRouter } from "next/router"

import GoogleMapReact from 'google-map-react';

export default function Details(martID) {
  const footerItems = martID.shopID.shopData.shopDetails.footerData
  const locationSet = martID.shopID.shopData.shopDetails.shopLocation.shopAddress

  const router = useRouter()

  function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  const slide = {
    hidden: {
      x: "-10rem",
      opacity: 0,
    },
    visible: {
      x: "0px",
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      },
    },
    exit: {
      x: "-10rem",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const [confirmDelete, setConfirmDelete] = useState(null);

  const [phone, setPhone] = useState(footerItems.shopPhone);
  function handlePhoneChange(index, value) {
    const newPhone = [...phone];
    newPhone[index] = value;
    setPhone(newPhone);
  }
  function handleAddPhone() {
    setPhone([...phone, '']);
  }

  function handlePhoneDelete(index) {
    if (confirmDelete === index) {
      const newPhone = [...phone];
      newPhone.splice(index, 1);
      setPhone(newPhone);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(index);
      setTimeout(() => {
        setConfirmDelete(null);
      }, 2000);
    }
  }

  const [confirmDelete2, setConfirmDelete2] = useState(null);

  const [emails, setEmails] = useState(footerItems.shopEmails);
  function handleEmailChange(index, value) {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  }
  function handleAddEmail() {
    setEmails([...emails, '']);
  }

  function handleEmailDelete(index) {
    if (confirmDelete2 === index) {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      setEmails(newEmails);
      setConfirmDelete2(null);
    } else {
      setConfirmDelete2(index);
      setTimeout(() => {
        setConfirmDelete2(null);
      }, 2000);
    }
  }

  const [confirmDelete3, setConfirmDelete3] = useState(null);

  const [socials, setSocials] = useState(footerItems.shopSocials);

  function handleAddSocial(link, type) {
    const newSocials = [...socials, { link: "", type: "None" }];
    setSocials(newSocials);
  }

  function handleSocialLinkChange(index) {
    const newSocials = [...socials];
    newSocials[index].link = event.target.value;
    setSocials(newSocials)
  }
  function handleSocialTypeChange(index) {
    const newSocials = [...socials];
    newSocials[index].type = event.target.value;
    setSocials(newSocials)
  }

  function handleDeleteSocial(index) {
    if (confirmDelete3 === index) {
      let newSocials = socials.filter((social, i) => i !== index);
      setSocials(newSocials);
      setConfirmDelete3(null);
    } else {
      setConfirmDelete3(index);
      setTimeout(() => {
        setConfirmDelete3(null);
      }, 2000);
    }
  }


  const [borderless, setBorderless] = useState(footerItems.footerAbout.borderless)
  function handleToggle(){
    setBorderless(!borderless)
  }

  const [prevImg, setPrevImg] = useState(footerItems.footerAbout.footerImg)
  const handlePrevImg = (event) => {
    setPrevImg(event.target.value);}

  const [aboutMsg, setAboutMsg] = useState(footerItems.footerAbout.footerMessage)
  const handleAboutMsg = (event) => {
    setAboutMsg(event.target.value);}


  const [confirmDelete4, setConfirmDelete4] = useState(null);

  const [additional, setAdditional] = useState(footerItems.additionalLinks);

    function handleAddAdditional(link, type) {
    const newAdditional = [...additional, { link: "", label: "" }];
    setAdditional(newAdditional);
  }

  function handleAddLinkChange(index) {
    const newAdditional = [...additional];
    newAdditional[index].link = event.target.value;
    setAdditional(newAdditional)
  }

  function handleAddLabelChange(index) {
    const newAdditional = [...additional];
    newAdditional[index].label = event.target.value;
    setAdditional(newAdditional)
  }

  function handleDeleteAdd(index) {
    if (confirmDelete4 === index) {
      let newAdditional = additional.filter((add, i) => i !== index);
      setAdditional(newAdditional);
      setConfirmDelete4(null);
    } else {
      setConfirmDelete4(index);
      setTimeout(() => {
        setConfirmDelete4(null);
      }, 2000);
    }
  }
  
  function isEmpty(word) {
    word.trim() === ""
  }

  function startsImgur(word) {
    return word.slice(0, 20) === "https://i.imgur.com/";
  }

  const [loading, setLoading] = useState(false)

  async function editFooter(formdata, key) {

    const response = await fetch(
      `../../api/edit-footer?martid=${router.query.shopid}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      }
    );
    const data = await response.json();
  }

  function submitChanges(){
    setLoading(true)

    const filteredPhone = phone.filter((number) => number !== "");
    const filteredEmails = emails.filter((email) => email !== "")
    const filteredSocials = socials.filter((entry) => {
      if (entry.link.trim() === "") {
        return false;
      }
      if (entry.type === "None") {
        return false;
      }
      if (!entry.link.toLowerCase().includes(entry.type.toLowerCase())) {
        return false;
      }
      return true;
    });

    const filteredImg = prevImg === "" || startsImgur(prevImg) ? prevImg : null;
    const filteredAdditionals = additional.filter((item) => {
      return item.link.trim() !== "" && item.label.trim() !== "";
    });

    const payload={shopEmails: filteredEmails, 
      shopPhone: filteredPhone, 
      footerAbout: {footerImg: filteredImg, footerMessage: aboutMsg, borderless: borderless}, 
      shopSocials: filteredSocials, 
      additionalLinks: filteredAdditionals}
    
    editFooter(payload)

    router.reload()
  }

  // const testApi = "https://maps.googleapis.com/maps/api/geocode/json?address=United+States&key=AIzaSyAKFXsBtjJge9rYwe-j79QfRtCabySspOk"
  // const getCountry = async () => {
  //   const response = await fetch(testApi);
  //   const data = await response.json();
  //   const result = data.results[0]

  //   const addressComponents = result.address_components;
  //   const administrativeAreas = addressComponents.filter(component => component.types.includes("administrative_area_level_1"));
  //   const administrativeAreaNames = administrativeAreas.map(area => area.long_name);
  //   console.log("end of line here", addressComponents)
  // }

  // getCountry()
  // const [chosenCountry, setChosenCountry] = useState("Choose Country")
  // function countryChangeHandler(event){
  //   setChosenCountry(event.target.value)
  // }

  // const [sortedCountries, setSortedCountries] = useState([]);

  // async function getCountries() {
  //   const response = await fetch('https://restcountries.com/v3.1/all');
  //   const data = await response.json();
  //   const countryNames = data.map(country => country.name.common);
  //   return countryNames;
  // }

  // async function countrySorter() {
  //   const sortedCountries = await getCountries();
  //   sortedCountries.sort();
  //   sortedCountries.unshift('Choose Country');
  //   setSortedCountries(sortedCountries);
  // }

  // async function getRegions() {
  //   if (chosenCountry !== "Choose Country"){
  //     console.log("country change")

  //     let encoded = encodeURIComponent(chosenCountry)
  //     const response = await fetch(`https://restcountries.com/v3.1/name/united%20states?fullText=true`);
  //     const data = await response.json();
  //     const states = data[0].states.map(state => state.name);

  //     console.log(states)
  //   }

  //   // console.log(data)
  //   // const states = data[0].states.map(state => state.name);
  //   // console.log("states lsit", states)
  //   // return states;
  // }

  // useEffect(() => {
  //   getRegions(chosenCountry);
  // }, [chosenCountry]);


  // useEffect(() => {
  //   countrySorter()
  // }, [])

  // console.log(chosenCountry)

  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return <Fragment>
    <Head>
      <title>Contact Details & Footer</title>
    </Head>

    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-pin svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin">Contact Details and Footer&nbsp;</h1>
      <button className="heading-tertiary add-categ-init" style={{width:"max-content"}} onClick={submitChanges}>
          <div className="heading-icon-plus svg-color">&nbsp;</div>{loading ? "Submitting..." : "Submit Changes"} &nbsp;</button>
    </span>
    <section className="contact-container">

      <div className="detail-slot">
      <span className="page-heading">
          <div className="heading-icon-home svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Location &nbsp;</h1>
        </span>

        {/* <label htmlFor="country" className="heading-tertiary" style={{marginRight:"1rem"}}>Country:</label>
        <select onChange={countryChangeHandler} id="country" value={chosenCountry} className={`text-options text-span`} style={{width:"50%"}}>
      {sortedCountries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select> */}



    <div style={{ height: '100vh', width: '100%' }}>
      {center && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAKFXsBtjJge9rYwe-j79QfRtCabySspOk' }}
          defaultCenter={center}
          defaultZoom={15}
        />
      )}
    </div>





        {/* <div style={{width: "100%", height: "400px"}}>
  <iframe
    title="map"
    width="100%"
    height="100%"
    frameBorder="0"
    style={{border:0}}
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAKFXsBtjJge9rYwe-j79QfRtCabySspOk&q=Barangay+San+Rafael,+San+Pablo+City,+Laguna,+Philippines" allowFullScreen>
  </iframe>
</div>
 */}






      </div>

      <div className="detail-slot">
      <span className="page-heading">
          <div className="heading-icon-phone svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Phone Numbers &nbsp;</h1>
          <button className="add-img" type="button" onClick={handleAddPhone}>
            <div className="heading-icon-plus-marginless svg-color">&nbsp;</div>
          </button>
        </span>


        <div className="detail-inputs">
          <AnimatePresence>
            {phone.map((num, index) => (
              <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="text-small input-number"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  value={num}
                  onChange={(event) => handlePhoneChange(index, event.target.value)}
                />
                <button className="add-img" type="button" onClick={() => handlePhoneDelete(index)}>
                  {confirmDelete === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <span className="page-heading" style={{marginTop:"1rem"}}>
          <div className="heading-icon-mail svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Emails &nbsp;</h1>
          <button className="add-img" type="button" onClick={handleAddEmail}>
            <div className="heading-icon-plus-marginless svg-color">&nbsp;</div>
          </button>
        </span>


        <div className="detail-inputs">
          <AnimatePresence>
            {emails.map((email, index) => (
              <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                <input
                  type="text"
                  placeholder="Email"
                  className="text-small input-number"
                  autoComplete="off"
                  style={{ width: "100%" }}
                  value={email}
                  onChange={(event) => handleEmailChange(index, event.target.value)}
                />
                <button className="add-img" type="button" onClick={() => handleEmailDelete(index)}>
                  {confirmDelete2 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>


      <div className="detail-slot">
        <span className="page-heading">
          <div className="heading-icon-socials svg-color">&nbsp;</div>
          <h2 className="heading-secondary no-margin">&nbsp;Social Media &nbsp;</h2>
          <button className="add-img" type="button" onClick={handleAddSocial}><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
        </span>

        <h2 className="heading-tertiary" style={{marginTop:"1rem"}}>The link must match the chosen social media</h2>
        <div className="detail-inputs">
        <AnimatePresence>
          {socials.map((social, index) => (<div className="detail-row" key={index}>
          <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{width:"100%"}}>
            <input onChange={(event) => handleSocialLinkChange(index, event.target.value)} type="text" value={socials[index].link} placeholder="Link" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
            <SocialOptions defaultSocials={social.type} content={socials} effect={handleSocialTypeChange} index={index}></SocialOptions>
            <button className="add-img" type="button" onClick={() => handleDeleteSocial(index)}>
            {confirmDelete3 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
            </button>
            </motion.div>
          </div>
          ))}
       </AnimatePresence>
        </div>

      </div>

      <div className="detail-slot">
        <span className="page-heading">
          <div className="heading-icon-img-sm svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Footer Image &nbsp;</h1>
        </span>
        <h2 className="heading-tertiary" style={{marginTop:"1rem"}}>Can be left blank</h2>
      <div className="flex-row-align" style={{marginTop: "1rem"}}>
        <input checked={borderless} onChange={handleToggle} type="checkbox" id="switch" className="toggle-switch" /><label htmlFor="switch" className="toggle-label">Toggle</label>
        <h3 className="heading-tertiary">Borderless</h3>
      </div>

        <div className="detail-inputs">
          <div className="detail-row">
            <input type="text" value={prevImg} onChange={handlePrevImg} placeholder="Footer Image (Imgur Links Only)" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
          </div>
          <img src={prevImg} className={borderless ? "footer-img" : "footer-img round-borderer"}></img>
        </div>

      </div>
      <div className="detail-slot">
        <span className="page-heading">
          <div className="heading-icon-about svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Footer Message &nbsp;</h1>

        </span>
        <textarea
          id='description'
          value={aboutMsg}
          onChange={handleAboutMsg}
          required
          rows='5'
          className="desc-text-area"
          placeholder="Footer Message"
        ></textarea>
      </div>

      <div className="detail-slot">
        <span className="page-heading">
          <div className="heading-icon-links svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Additional Links &nbsp;</h1>
          <button className="add-img" type="button" onClick={handleAddAdditional} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
        </span>
        <h2 className="heading-tertiary" style={{marginTop:"1rem"}}>Incomplete entries will be ignored</h2>
        <div className="detail-inputs">
        <AnimatePresence>
        {additional.map((item, index)=>(<div className="detail-row" key={index}>
        <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{width:"100%"}}>
            <input onChange={(event) => handleAddLinkChange(index, event.target.value)} type="text" value={item.link} placeholder="Link" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
            <input onChange={(event) => handleAddLabelChange(index, event.target.value)} type="text" value={item.label} placeholder="Displayed Label" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
            <button className="add-img" type="button"  onClick={() => handleDeleteAdd(index)}>
            {confirmDelete4 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
            </button>
            </motion.div>
          </div>
        ))}
        </AnimatePresence>
        </div>

      </div>

      <h2 className="heading-secondary">Footer Preview</h2>

      <div style={{ gridColumn: "1/-1" }}>
        <footer className="footer">
          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Address</strong></h3>
            <h3 className="heading-tertiary">{`${locationSet.street}, ${locationSet.city}, ${locationSet.region}, ${locationSet.zip}, ${locationSet.country},`}</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Phone Numbers</strong></h3>
            {phone.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
            
            {phone.map((num, index) => {
              return <h3 key={index} className="heading-tertiary">{num}</h3>;
            })}
          </div>
          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Emails</strong></h3>
            {emails.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}

            {emails.map((email, index) => {
              return <h3 key={index} className="heading-tertiary">{email}</h3>;
            })}

            <br></br>

            <h3 className="heading-tertiary"><strong>Social Media</strong></h3>
            <div className="socials-container">
            {socials.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
              {socials.map((index) => {
                return <Link key={index.link} href={index.link} target="_blank">
                  <img className="social-icon" src={`/socials/${index.type}.webp`}></img>
                </Link>
              })}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Important Links</strong></h3>
            <h3 className="heading-tertiary">About</h3>
            <h3 className="heading-tertiary">FAQ</h3>
            <h3 className="heading-tertiary">Terms of Service</h3>
            <h3 className="heading-tertiary">Privacy Policy</h3>
            <h3 className="heading-tertiary">Customer Service</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Additional Links</strong></h3>
            {additional.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
            {additional.map((index) => {
              return <a key={index.label} className="heading-tertiary" href={index.link} style={{ textDecoration: "none" }}>{index.label}</a>;
            })}
          </div>
          <div className="footer-column">
          {prevImg === "" ? <h3 className="heading-tertiary">-</h3> : <img src={prevImg} className={borderless ? "footer-img" : "footer-img round-borderer"}></img>}

            <br></br>
            {aboutMsg === "" ? <h3 className="heading-tertiary">-</h3> : <h3 className="heading-tertiary">{aboutMsg}</h3>}

          </div>

          <h3 className="heading-tertiary" style={{ gridColumn: "1/-1", justifySelf: "center" }}><strong>Copyright &copy; YEAR Company Name</strong></h3>
        </footer>
      </div>

    </section>
  </Fragment>
}

export { getServerSideProps }