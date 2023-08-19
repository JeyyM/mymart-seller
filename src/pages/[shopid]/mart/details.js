import { Fragment, useEffect } from "react"
import { getServerSideProps } from "../categories"
import Head from "next/head"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SocialOptions from "@/components/detail/SocialOptions"
import Link from "next/link"
import { useRouter } from "next/router"

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import pako from "pako";

const libraries = ['places'];

export default function Details({ shopID, screenWidth }) {
  const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
  const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
  const final = JSON.parse(decompressedBytes);

  const footerItems = final.shopData.shopDetails.footerData
  const favicon = final.shopData.shopDetails.imageData.icons.icon

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
  function handleToggle() {
    setBorderless(!borderless)
  }

  const [prevImg, setPrevImg] = useState(footerItems.footerAbout.footerImg)
  const handlePrevImg = (event) => {
    setPrevImg(event.target.value);
  }

  const [aboutMsg, setAboutMsg] = useState(footerItems.footerAbout.footerMessage)
  const handleAboutMsg = (event) => {
    setAboutMsg(event.target.value);
  }


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

  function startsImgur(word) {
    return word.startsWith("https://i.imgur.com/") || word.startsWith("https://picsum.photos/");
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

  async function submitChanges() {
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

    const payload = {
      shopEmails: filteredEmails,
      shopPhone: filteredPhone,
      footerAbout: { footerImg: filteredImg, footerMessage: aboutMsg, borderless: borderless },
      shopSocials: filteredSocials,
      additionalLinks: filteredAdditionals,
      shopLocation: locationName,
      shopCoords: center
    }

    editFooter(payload)

    await waitSeconds()

    router.reload()
  }

  const mapContainerStyle = { width: '100%', height: '100%', minHeight: "20rem" };

  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState(footerItems.shopLocation);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (window.google && window.google.maps && center) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: center }, (results, status) => {
        if (status === 'OK') {
          setLocationName(results[0].formatted_address);
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }
  }, [center]);

  function currentLoc() {
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
  }

  function resetLoc() {
    setCenter(footerItems.shopCoords)
  }

  useEffect(() => { setCenter(footerItems.shopCoords) }, [])

  const handleMapClick = (event) => {
    const newCenter = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCenter(newCenter);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCenter }, (results, status) => {
      if (status === 'OK') {
        setLocationName(results[0].formatted_address);
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry !== undefined) {
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setLocationName(place.formatted_address);
      } else {
        console.log('Geocode was not successful for the following reason: ', status);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return <Fragment>
    <Head>
      <title>Contact Details & Footer</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
    </Head>

    {/* <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-sales svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin"  style={{ fontSize: `${screenWidth > 425 ? "3.5rem" : screenWidth > 360 ? "3rem" : "2.5rem"}`}}>&nbsp;Sales & Profits</h1>
        <select
          value={SelectDate}
          className="text-options text-black"
          style={{ width: `${screenWidth > 480 ? "20rem" : screenWidth > 400 ? "16rem" : "13rem"}`, marginLeft: "1rem" }}
          onChange={(event) => handleSelectDate(event)}
        >
          <option value="1">Today</option>
          <option value="30">Past 30 Days</option>
          <option value="9999">All Time</option>
        </select>
        <button onClick={handleDownload} className="add-categ-init" style={{ width: `${screenWidth > 580 ? "18rem" : screenWidth > 425 ? "14rem" : "11rem"}`, marginLeft:"auto", marginRight:"1rem", height: `${screenWidth > 580 ? "4rem" : "7rem"}` }}><h2 className='margin-side heading-tertiary'>Download CSV</h2></button>
      </span> */}

    <span className="page-heading">
      <div className="heading-icon-dropshadow">
        <div className="heading-icon-pin svg-color">&nbsp;</div>
      </div>
      <h1 className="heading-primary no-margin" style={{ fontSize: `${screenWidth > 500 ? "3.5rem" : screenWidth > 450 ? "3rem" : "2.5rem"}` }}>Contact Details and Footer&nbsp;</h1>
      <button onClick={submitChanges} className="heading-tertiary add-categ-init" style={{ width: `${screenWidth > 600 ? "max-content" : screenWidth > 400 ? "23rem" : "18rem"}`, height: `${screenWidth > 400 ? "4rem" : "7rem"}` }} disabled={loading}><div className="heading-icon-check svg-color">&nbsp;</div>{loading ? "Submitting..." : "Submit Changes"} &nbsp;</button>
    </span>
    <section className="contact-container">

      <div className="detail-slot">
        <span className="page-heading">
          <div className="heading-icon-home svg-color">&nbsp;</div>
          <h1 className="heading-secondary no-margin">&nbsp;Profile Details &nbsp;</h1>
        </span>

        <h2 className="heading-tertiary">{locationName}</h2>

        <div className="detail-location">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
            onLoad={() => console.log("Map loaded")}
          >
            <Marker position={center} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />

            <div style={{ position: 'relative', width: '50%', height: '40px', margin: '0 auto' }}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input type="text" placeholder="Enter a location" style={{ width: '100%', height: '100%', border: "1px solid black", padding: "1rem" }} />
              </Autocomplete>
            </div>
          </GoogleMap>
        </div>

        <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
          <button onClick={currentLoc} className="product-action-2 heading-secondary">Current Location</button>
          <button onClick={resetLoc} className="product-action-3 heading-secondary white">Reset to Default</button>
        </div>
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

        <span className="page-heading" style={{ marginTop: "1rem" }}>
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

        <h2 className="heading-tertiary" style={{ marginTop: "1rem" }}>The link must match the chosen social media</h2>
        <div className="detail-inputs">
          <AnimatePresence>
            {socials.map((social, index) => (<div className="detail-row" key={index}>
              <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{ width: "100%" }}>
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
        <h2 className="heading-tertiary" style={{ marginTop: "1rem" }}>Can be left blank</h2>
        <div className="flex-row-align" style={{ marginTop: "1rem" }}>
          <input checked={borderless} onChange={handleToggle} type="checkbox" id="switch" className="toggle-switch" /><label htmlFor="switch" className="toggle-label">Toggle</label>
          <h3 className="heading-tertiary">Borderless</h3>
        </div>

        <div className="detail-inputs">
          <div className="detail-row">
            <input type="text" value={prevImg} onChange={handlePrevImg} placeholder="Footer Image (Imgur Links Only)" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
          </div>
          <img src={prevImg} className={borderless ? "footer-img" : "footer-img round-borderer"} alt="Footer Image"></img>
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
        <h2 className="heading-tertiary" style={{ marginTop: "1rem" }}>Incomplete entries will be ignored</h2>
        <div className="detail-inputs">
          <AnimatePresence>
            {additional.map((item, index) => (<div className="detail-row" key={index}>
              <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{ width: "100%" }}>
                <input onChange={(event) => handleAddLinkChange(index, event.target.value)} type="text" value={item.link} placeholder="Link" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                <input onChange={(event) => handleAddLabelChange(index, event.target.value)} type="text" value={item.label} placeholder="Displayed Label" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                <button className="add-img" type="button" onClick={() => handleDeleteAdd(index)}>
                  {confirmDelete4 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                </button>
              </motion.div>
            </div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-preview svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-secondary no-margin">Footer Preview&nbsp;</h1>
      </span>

      <div style={{ gridColumn: "1/-1" }}>
        <footer className="footer">
          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Address</strong></h3>
            {locationName.length !== 0 ? <h3 className="heading-tertiary">{locationName}</h3> : <h3 className="heading-tertiary">-</h3>}

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
                  <img alt={index.type} className="social-icon" src={`/socials/${index.type}.webp`}></img>
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
            {prevImg === "" ? <h3 className="heading-tertiary">-</h3> : <img src={prevImg} className={borderless ? "footer-img" : "footer-img round-borderer"} alt="Footer Image"></img>}

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