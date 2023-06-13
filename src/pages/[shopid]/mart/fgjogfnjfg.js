import { Fragment, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSideProps } from "../_app";


function Images({ shopID, user }) {
    const router = useRouter();

    const paymentDetails = shopID.shopData.shopDetails.paymentData
    const cardData = paymentDetails.cardInfo
    const checkoutData = paymentDetails.checkoutInfo

    // const mapContainerStyle = { width: '50rem', height: '30rem', margin:"0 auto" };

    let userCard = {}
    let userLocation = ""

    if (user !== undefined) {
        userCard = user.card
        userLocation = user.location
    }

    const slide = {
        hidden: {
            x: "-10rem",
            opacity: 0,
        },
        visible: (index) => ({
            x: "0px",
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0.2,
                delay: index * 0.2,
            },
        }),
        exit: {
            x: "-10rem",
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
    };

    const imageInfo = shopID.shopData.shopDetails.imageData

    const id = shopID._id;
    const [favicon, setFavicon] = useState(imageInfo.icons.icon);

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        number: true,
        month: true,
        year: true,
        cvv: true,
        currency: true,
        desc: true
    });

    const [cardName, setCardName] = useState(userCard.name);
    const [cardNumber, setCardNumber] = useState(userCard.number);
    const [expiryMonth, setExpiryMonth] = useState(userCard.month);
    const [expiryYear, setExpiryYear] = useState(userCard.year);
    const [cvv, setCvv] = useState();
    const [message, setMessage] = useState(checkoutData.message);

    const nameClasses = `${formInputValidity.name ? "text-small input-number" : "invalid-form"}`;
    const cardClasses = `${formInputValidity.number ? "text-small input-number" : "invalid-form"}`;
    const monthClasses = `${formInputValidity.month ? "text-small input-number" : "invalid-form-2"}`;
    const yearClasses = `${formInputValidity.year ? "text-small input-number" : "invalid-form-2"}`;
    const cvvClasses = `${formInputValidity.cvv ? "text-small input-number" : "invalid-form-2"}`;
    const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"}`;

    return (
        <Fragment>
            <Head>
                <title>Images & Pop-ups</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>

            <span className="page-heading" style={{ marginLeft: "1rem" }}>
                <div className="heading-icon-dropshadow">
                    <div className="menu-checkout svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">
                    Checkout&nbsp;
                </h1>
            </span>

            <div className="checkout-container">
                <div className="checkout-column">
                    <span className="page-heading flex-row-align" style={{ marginBottom: "1rem" }}>
                        <div className="heading-icon-credit svg-color">&nbsp;</div>
                        <h1 className="heading-secondary no-margin">Credit Card Details</h1>
                    </span>

                    <div className="form-group">
                        <input
                            type="text"
                            className={`${nameClasses}`}
                            placeholder="Name on Credit card"
                            value={cardName}
                            onChange={(event) => setCardName(event.target.value)}
                            autoComplete="off"
                        ></input>
                        {formInputValidity.name ? <label className="form-label">Name on Credit Card </label> : <label className="form-label inv">Enter a valid card name</label>}
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            className={`${cardClasses}`}
                            placeholder="Credit Card Number"
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.target.value)}
                            autoComplete="off"
                        ></input>
                        {formInputValidity.number ? <label className="form-label">Credit Card Number </label> : <label className="form-label inv">Enter a valid card number</label>}
                    </div>

                    <div className="flex-row-spaceless" style={{ alignItems: "center", gap: "2rem" }}>
                        <label className="heading-secondary product-currency">Expiry Date:</label>
                        <div className="flex-col-none">
                            <input style={{ width: "8rem", margin: "0" }} type="number" className={monthClasses} placeholder="MM" autoComplete="off" value={expiryMonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryMonth(newValue); } }}></input>
                            {formInputValidity.month ? <label className="form-label">Month</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid month</label>}
                        </div>

                        <label className="heading-secondary product-currency">/</label>

                        <div className="flex-col-none">
                            <input style={{ width: "8rem", margin: "0" }} type="number" className={yearClasses} placeholder="YY" autoComplete="off" value={expiryYear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryYear(newValue); } }}></input>
                            {formInputValidity.year ? <label className="form-label">Year</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid year</label>}
                        </div>

                        <label className="heading-secondary product-currency">CVV:</label>

                        <div className="flex-col-none">
                            <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setCvv(newValue); } }}></input>
                            {formInputValidity.cvv ? <label className="form-label">&nbsp;</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid CVV</label>}
                        </div>
                    </div>

                </div>

                <div className="checkout-column">
                    <h1>hey</h1>
                </div>

            </div>
        </Fragment>
    );
}

export default Images;

export { getServerSideProps };
