import { Fragment } from "react"
import { getServerSideProps } from "../categories"
import Head from "next/head"
import Footer from "@/components/Mart/Footer"
import { useState } from "react"

export default function Details (martID){
  console.log(martID)
    const footerItems = martID.shopID.shopData.shopDetails.footerData
    const locationSet = martID.shopID.shopData.shopDetails.shopLocation
    console.log(footerItems, locationSet)

    const sampleDetails = {
        shopEmails: [ 'email 1 X', 'email 2 X' ],
        shopPhone: [ '123 X', '456 X' ],
        footerAbout: {
          footerImg: 'https://i.imgur.com/qlmYdJO.jpeg',
          footerMessage: 'This is the about us message maybe shortened, who knows. So yeah it do be like that.',
          borderless: true
        },
        shopSocials: [
          {
            type: 'twitter',
            link: 'https://twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
          },
          {
            type: 'facebook',
            link: 'https://www.facebook.com/profile.php?id=100013413363370'
          }
        ],
        additionalLinks: [
          { link: 'https://www.youtube.com/', label: 'Link 1 ytX' },
          { link: 'https://www.reddit.com/', label: 'Link 2 reddit XZ' }
        ]
      } 

      console.log(footerItems.shopPhone)

      const [confirmDelete, setConfirmDelete] = useState(null);

      const [phone, setPhone] = useState(footerItems.shopPhone);
      function handlePhoneChange(index, value) {
        const newPhone = [...phone];
        newPhone[index] = value;
        setPhone(newPhone);
      }
      function handlePhoneInput() {
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
    




    return <Fragment>
            <Head>
      <title>Contact Details & Footer</title>
    </Head>
    <span className="page-heading">
        <div className="heading-icon-dropshadow">
          <div className="heading-icon-pin svg-color">&nbsp;</div>
        </div>
        <h1 className="heading-primary no-margin">Contact Details and Footer</h1>
      </span>
      <section className="contact-container">

      <div className="detail-slot">
      <span className="page-heading">
        <div className="heading-icon-phone svg-color">&nbsp;</div>
        <h1 className="heading-secondary no-margin">&nbsp;Phone Numbers &nbsp;</h1>
        <button className="add-img" type="button" onClick={handlePhoneInput}>
          <div className="heading-icon-plus-marginless svg-color">&nbsp;</div>
        </button>
      </span>

      <div className="detail-inputs">
        {phone.map((num, index) => (
          <div className="detail-row" key={index}>
            <input
              type="text"
              placeholder="Dark Color"
              className="text-small input-number"
              autoComplete="off"
              style={{ width: "100%" }}
              value={num}
              onChange={(event) => handlePhoneChange(index, event.target.value)}
            />
            <button className="add-img" type="button" onClick={() => handlePhoneDelete(index)}>
            {confirmDelete === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
            </button>
          </div>
        ))}
      </div>
    </div>

      <div className="detail-slot">
      <span className="page-heading">
      <div className="heading-icon-mail svg-color">&nbsp;</div>
        <h1 className="heading-secondary no-margin">&nbsp;Emails &nbsp;</h1>
        <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </span>

      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
      <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
      <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
      <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
      <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      </div>

      
      <div className="detail-slot">
      <span className="page-heading">
      <div className="heading-icon-socials svg-color">&nbsp;</div>
      <h1 className="heading-secondary no-margin">&nbsp;Social Media &nbsp;</h1>
        <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </span>

      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>

      </div>

      <div className="detail-slot">
      <span className="page-heading">
      <div className="heading-icon-img-sm svg-color">&nbsp;</div>
      <h1 className="heading-secondary no-margin">&nbsp;Footer Image &nbsp;</h1>
      </span>

      <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>

      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "100%" }}></input>
      </div>
      <img src="https://i.imgur.com/qlmYdJO.jpeg" className="footer-img"></img>
      </div>
      
      </div>
      <div className="detail-slot">
      <span className="page-heading">
      <div className="heading-icon-about svg-color">&nbsp;</div>
      <h1 className="heading-secondary no-margin">&nbsp;Footer Message &nbsp;</h1>
    
      </span>
      <textarea
            id='description'
            required
            rows='5'
            className="desc-text-area"
            placeholder="Description"
          ></textarea>
      </div>
            <div className="detail-slot">
      <span className="page-heading">
      <div className="heading-icon-links svg-color">&nbsp;</div>
      <h1 className="heading-secondary no-margin">&nbsp;Additional Links &nbsp;</h1>
        <button className="add-img" type="button"><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </span>
      
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      <div className="detail-inputs">
      <div className="detail-row">
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <input type="text" placeholder="Dark Color" className="text-small input-number" autoComplete="off" style={{ width: "40%" }}></input>
      <button className="add-img" type="button">
      <div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
      </div>
      </div>
      </div>
      

        <div style={{gridColumn: "1/-1"}}>
        <Footer details={sampleDetails} address={locationSet}></Footer>
        </div>
      </section>
    </Fragment>
}

export {getServerSideProps}