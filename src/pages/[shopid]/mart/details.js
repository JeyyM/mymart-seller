import { Fragment, useEffect } from "react"
import { getServerSideProps } from "../categories"
import Head from "next/head"
import Footer from "@/components/Mart/Footer"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SocialOptions from "@/components/detail/SocialOptions"
import Link from "next/link"

export default function Details(martID) {
  const footerItems = martID.shopID.shopData.shopDetails.footerData
  const locationSet = martID.shopID.shopData.shopDetails.shopLocation.shopAddress

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


  console.log("social", socials)

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
  console.log("additional here", additional)

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

  console.log(footerItems.shopSocials)
  
  function submitChanges(){
    const payload={shopEmails: emails, shopPhone: phone, footerAbout: {footerImg: prevImg, footerMessage: aboutMsg, borderless: borderless}, shopSocials: socials, additionalLinks: additional}
    console.log(payload)
  }

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
          <div className="heading-icon-plus svg-color">&nbsp;</div>Submit Changes &nbsp;</button>
    </span>
    <section className="contact-container">

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

      </div>

      <div className="detail-slot">
        <span className="page-heading">
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
          <h1 className="heading-secondary no-margin">&nbsp;Social Media &nbsp;</h1>
          <button className="add-img" type="button" onClick={handleAddSocial}><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
        </span>

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


      <div style={{ gridColumn: "1/-1" }}>
        <footer className="footer">
          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Address</strong></h3>
            <h3 className="heading-tertiary">{`${locationSet.street}, ${locationSet.city}, ${locationSet.region}, ${locationSet.zip}, ${locationSet.country},`}</h3>

            <br></br>

            <h3 className="heading-tertiary"><strong>Phone Numbers</strong></h3>
            {phone.map((num, index) => {
              return <h3 key={index} className="heading-tertiary">{num}</h3>;
            })}
          </div>
          <div className="footer-column">
            <h3 className="heading-tertiary"><strong>Emails</strong></h3>
            {emails.map((email, index) => {
              return <h3 key={index} className="heading-tertiary">{email}</h3>;
            })}

            <br></br>

            <h3 className="heading-tertiary"><strong>Social Media</strong></h3>
            <div className="socials-container">
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
            {additional.map((index) => {
              return <a key={index.label} className="heading-tertiary" href={index.link} style={{ textDecoration: "none" }}>{index.label}</a>;
            })}
          </div>
          <div className="footer-column">
            <img src={prevImg} className={borderless ? "footer-img" : "footer-img round-borderer"}></img>

            <br></br>

            <h3 className="heading-tertiary">{aboutMsg}</h3>
          </div>

          <h3 className="heading-tertiary" style={{ gridColumn: "1/-1", justifySelf: "center" }}><strong>Copyright &copy; YEAR Company Name</strong></h3>
        </footer>
      </div>

    </section>
  </Fragment>
}

export { getServerSideProps }