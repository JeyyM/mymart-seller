import { Fragment, useEffect } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"
import { useState } from 'react';
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion"

function Payment(martID) {
    const id = martID.shopID._id
    const router = useRouter()

    const paymentDetails = martID.shopID.shopData.shopDetails.paymentData
    const cardData = paymentDetails.cardInfo
    const checkoutData = paymentDetails.checkoutInfo
    const addsData = paymentDetails.Adds
    const takebackData = paymentDetails.Takebacks

    const checkmark = (
        <svg viewBox="0 0 100 100" width="7rem" height="7rem">
          <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
            strokeDasharray="200" strokeDashoffset="200">
            <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
          </path>
        </svg>
      )

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

    const [cardName, setCardName] = useState(cardData.cardName);
    const [cardNumber, setCardNumber] = useState(cardData.cardNumber);
    const [expiryMonth, setExpiryMonth] = useState(cardData.expiryMonth);
    const [expiryYear, setExpiryYear] = useState(cardData.expiryYear);
    const [cvv, setCvv] = useState(cardData.cvv);
    const [message, setMessage] = useState(checkoutData.message);

    const [currency, setCurrency] = useState(checkoutData.currency);

    const [allowRefunds, setAllowRefunds] = useState(takebackData.allowRefunds);
    const [refundDuration, setRefundDuration] = useState(takebackData.refundDuration);
    const [refundCount, setRefundCount] = useState(takebackData.refundCount);
    const [refundFee, setRefundFee] = useState(takebackData.refundFee);

    const [allowCancel, setAllowCancel] = useState(takebackData.allowCancel);
    const [cancelDuration, setCancelDuration] = useState(takebackData.cancelDuration);
    const [cancelCount, setCancelCount] = useState(takebackData.cancelCount);
    const [cancelFee, setCancelFee] = useState(takebackData.cancelFee);

    const [showMap, setShowMap] = useState(checkoutData.showMap);

    const [DelFee, setDelFee] = useState(addsData.DelFee);
    const [PickFee, setPickFee] = useState(addsData.PickFee);

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        number: true,
        month: true,
        year: true,
        cvv: true,
        currency: true,
        desc: true
    });

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleRefundsChange = (event) => {
        setAllowRefunds(event.target.checked);
    };

    const handleRefundDurationChange = (event) => {
        setRefundDuration(event.target.value);
    };

    const handleRefundCountChange = (event) => {
        setRefundCount(parseInt(event.target.value));
    };

    const handleCancelChange = (event) => {
        setAllowCancel(event.target.checked);
    };

    const handleCancelDurationChange = (event) => {
        setCancelDuration(event.target.value);
    };

    const handleCancelCountChange = (event) => {
        setCancelCount(parseInt(event.target.value));
    };
    const handleCancelFee = (event) => {
        setCancelFee(event.target.value);
    };

    const handleMapChange = (event) => {
        setShowMap(event.target.checked);
    };

    const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"}`;
    const cardClasses = `${formInputValidity.number ? "text-full" : "invalid-form"}`;
    const monthClasses = `${formInputValidity.month ? "text-small input-number" : "invalid-form-2"}`;
    const yearClasses = `${formInputValidity.year ? "text-small input-number" : "invalid-form-2"}`;
    const cvvClasses = `${formInputValidity.cvv ? "text-small input-number" : "invalid-form-2"}`;
    const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"}`;

    function handleAddDelFee(link, type) {
        const newDelFee = [...DelFee, { name: "", cost: "" }];
        setDelFee(newDelFee);
    }

    function handleDelFeeNameChange(index) {
        const newDelFee = [...DelFee];
        newDelFee[index].name = event.target.value;
        setDelFee(newDelFee)
    }

    function handleDelFeeCostChange(index) {
        const newDelFee = [...DelFee];
        newDelFee[index].cost = event.target.value;
        setDelFee(newDelFee)
    }

    const [confirmDelete1, setConfirmDelete1] = useState(null);

    function handleDeleteDel(index) {
        if (confirmDelete1 === index) {
            let newDelFee = DelFee.filter((add, i) => i !== index);
            setDelFee(newDelFee);
            setConfirmDelete1(null);
        } else {
            setConfirmDelete1(index);
            setTimeout(() => {
                setConfirmDelete1(null);
            }, 2000);
        }
    }

    function handleAddPickFee(link, type) {
        const newPickFee = [...PickFee, { name: "", cost: "" }];
        setPickFee(newPickFee);
    }

    function handlePickFeeNameChange(index) {
        const newPickFee = [...PickFee];
        newPickFee[index].name = event.target.value;
        setPickFee(newPickFee)
    }

    function handlePickFeeCostChange(index) {
        const newPickFee = [...PickFee];
        newPickFee[index].cost = event.target.value;
        setPickFee(newPickFee)
    }

    const [confirmDelete2, setConfirmDelete2] = useState(null);

    function handleDeletePick(index) {
        if (confirmDelete2 === index) {
            let newPickFee = PickFee.filter((add, i) => i !== index);
            setPickFee(newPickFee);
            setConfirmDelete2(null);
        } else {
            setConfirmDelete2(index);
            setTimeout(() => {
                setConfirmDelete2(null);
            }, 2000);
        }
    }

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
      }

    const [loading, setLoading] = useState(false)
    const [completion, setCompletion] = useState(false)

    async function editPayment(formdata, key) {

      const response = await fetch(

        `../../api/edit-payment?martid=${router.query.shopid}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata)
        }
      );
      const data = await response.json();
    }
  
    async function submitChanges() {
        let newCFee = 0
        let newRFee = 0

        if (cancelFee !== "" || cancelFee < 0){
            setCancelFee(0)
            newCFee = cancelFee
        }
        if (refundFee !== "" || refundFee < 0){
            setRefundFee(0)
            newRFee = refundFee
        }

        const filteredDel = DelFee.filter((item) => {
            return item.name.trim() !== "" && item.cost.trim() !== "";
          });

          const filteredPick = PickFee.filter((item) => {
            return item.name.trim() !== "" && item.cost.trim() !== "";
          });

        const nameValid = cardName.trim() !== ""
        const numValid = cardNumber.trim() !== ""
        const monthValid = expiryMonth.length === 2
        const yearValid = expiryYear.length === 2
        const cvvValid = cvv.length === 3

        setFormInputValidity({
            name: nameValid,
            number: numValid,
            month: monthValid,
            year: yearValid,
            cvv: cvvValid,
            currency: true,
            desc: true
        });
        
        const submissionValid = nameValid && numValid && monthValid && yearValid && cvvValid

        if (submissionValid){
        setLoading(true)
  
        const cardInfo = {cardName: cardName, cardNumber: cardNumber, expiryMonth: expiryMonth, expiryYear: expiryYear, cvv: cvv}
        const checkoutInfo = {message: message, currency:currency, showMap: showMap}
        const Adds = {DelFee: filteredDel, PickFee:filteredPick}
        const Takebacks = {allowRefunds: allowRefunds, refundDuration: refundDuration, refundCount: refundCount, refundFee: newRFee, allowCancel: allowCancel, cancelDuration: cancelDuration, cancelCount: cancelCount, cancelFee: newCFee}

        const payload = {
            cardInfo,
            checkoutInfo,
            Adds,
            Takebacks
        };
  
      editPayment(payload)
  
      await waitSeconds()

      setLoading(false)
      setCompletion(true)
  
      console.log(payload)
      router.reload()
    }
    }

    function resetChanges(){
        setCardName(cardData.cardName)
        setCardNumber(cardData.cardNumber)
        setExpiryMonth(cardData.expiryMonth)
        setExpiryYear(cardData.expiryYear)
        setCvv(cardData.cvv)

        setMessage(checkoutData.message)
        setCurrency(checkoutData.currency)

        setAllowRefunds(takebackData.allowRefunds)
        setRefundCount(takebackData.refundCount)
        setRefundDuration(takebackData.refundDuration)
        setRefundFee(takebackData.refundFee)

        setAllowCancel(takebackData.allowCancel)
        setCancelCount(takebackData.cancelCount)
        setCancelDuration(takebackData.cancelDuration)
        setCancelFee(takebackData.cancelFee)

        setShowMap(checkoutData.showMap)
        setDelFee(addsData.DelFee)
        setPickFee(addsData.PickFee)
    }

    return <Fragment>
        <Head>
            <title>Payment Details</title>
        </Head>

        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-credit svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin">&nbsp;Payment Details</h1>
        </span>

        <div className="payment-grid">

            <div className="pay-segment round-borderer round-borderer-extra">
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
                        id="name"
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
                        id="number"
                        autoComplete="off"
                    ></input>
                    {formInputValidity.number ? <label className="form-label">Credit Card Number </label> : <label className="form-label inv">Enter a valid card number</label>}
                </div>

                <div className="flex-row-spaceless" style={{ alignItems: "center", gap: "2rem" }}>
                    <label className="heading-secondary product-currency">Expiry Date:</label>
                    <div className="flex-col-none">
                        <input style={{ width: "8rem", margin: "0" }} type="number" className={monthClasses} placeholder="MM" autoComplete="off" id='month' value={expiryMonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryMonth(newValue); } }}></input>
                        {formInputValidity.month ? <label className="form-label">Month</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid month</label>}
                    </div>

                    <label className="heading-secondary product-currency">/</label>

                    <div className="flex-col-none">
                        <input style={{ width: "8rem", margin: "0" }} type="number" className={yearClasses} placeholder="YY" autoComplete="off" id='year' value={expiryYear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryYear(newValue); } }}></input>
                        {formInputValidity.year ? <label className="form-label">Year</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid year</label>}
                    </div>

                    <label className="heading-secondary product-currency">CVV:</label>

                    <div className="flex-col-none">
                        <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" id='year' value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setCvv(newValue); } }}></input>
                        {formInputValidity.cvv ? <label className="form-label">&nbsp;</label> : <label className="form-label inv" style={{ color: "red" }}>Invalid CVV</label>}
                    </div>
                </div>

                <div className="form-group">
                    <textarea
                        id="description"
                        rows="5"
                        className={descClasses}
                        placeholder="Checkout Message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        autoComplete="off"
                    ></textarea>
                    <label className="form-label" title="This message will be shown at the end of the checkout process. Write the sales process or other info the customer should know.">Checkout Message</label>
                </div>
            </div>

            <div className="pay-segment-2 round-borderer round-borderer-extra">
                <span className="page-heading flex-row-align" style={{ marginBottom: "1rem" }}>
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-payment svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-secondary no-margin">Payments and Fees</h1>
                </span>

                <label className="heading-secondary">
                    Currency: &nbsp;
                    <select value={currency} onChange={handleCurrencyChange} className="text-options text-span" style={{ width: "27rem" }}>
                        <option value="$">$ - US Dollar</option>
                        <option value="€">€ - Euro</option>
                        <option value="£">£ - British Pound Sterling</option>
                        <option value="¥">¥ - Japanese Yen</option>
                        <option value="AUD$">$ - Australian Dollar</option>
                        <option value="CAD$">$ - Canadian Dollar</option>
                        <option value="Fr">Fr - Swiss Franc</option>
                        <option value="元">元 - Chinese Yuan</option>
                        <option value="HK$">$ - Hong Kong Dollar</option>
                        <option value="NZ$">$ - New Zealand Dollar</option>
                        <option value="SG$">$ - Singapore Dollar</option>
                        <option value="₹">₹ - Indian Rupee</option>
                        <option value="₱">₱ - Philippine Peso</option>
                        <option value="R">R - South African Rand</option>
                    </select>
                </label>

                <span className="page-heading flex-row-align" style={{ margin: "1rem 0" }}>
                        <div className="heading-icon-fee svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Set Fees</h1>
                </span>
                <div className="fee-cols">

                    <div className="detail-slot">
                        <span className="page-heading">
                            <h1 className="heading-secondary no-margin" title="Fees that customers will pay if they choose for their items to be delivered.">&nbsp;Delivery Fees &nbsp;</h1>
                            <button className="add-img" type="button" onClick={handleAddDelFee} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
                        </span>
                        <div className="detail-inputs">
                            <AnimatePresence>
                                {DelFee.map((item, index) => (<div className="detail-row" key={index}>
                                    <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{ width: "100%" }}>
                                        <input onChange={(event) => handleDelFeeNameChange(index, event.target.value)} type="text" value={item.name} placeholder="Fee Name" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                                        <input onChange={(event) => handleDelFeeCostChange(index, event.target.value)} type="number" value={item.cost} placeholder="Fee Cost" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                                        <button className="add-img" type="button" onClick={() => handleDeleteDel(index)}>
                                            {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                                        </button>
                                    </motion.div>
                                </div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="detail-slot">
                        <span className="page-heading">
                            <h1 className="heading-secondary no-margin" title="Fees that customers will pay if they choose for their items to be picked up.">&nbsp;Pick-Up Fees &nbsp;</h1>
                            <button className="add-img" type="button" onClick={handleAddPickFee} ><div className="heading-icon-plus-marginless svg-color">&nbsp;</div></button>
                        </span>
                        <div className="detail-inputs">
                            <AnimatePresence>
                                {PickFee.map((item, index) => (<div className="detail-row" key={index}>
                                    <motion.div className="detail-row" key={index} variants={slide} initial="hidden" animate="visible" exit="exit" style={{ width: "100%" }}>
                                        <input onChange={(event) => handlePickFeeNameChange(index, event.target.value)} type="text" value={item.name} placeholder="Fee Name" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                                        <input onChange={(event) => handlePickFeeCostChange(index, event.target.value)} type="number" value={item.cost} placeholder="Fee Cost" className="text-small input-number" autoComplete="off" style={{ width: "70%", margin: "0rem" }}></input>
                                        <button className="add-img" type="button" onClick={() => handleDeletePick(index)}>
                                            {confirmDelete2 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                                        </button>
                                    </motion.div>
                                </div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <span className="page-heading flex-row-align" style={{ marginBottom: "1rem" }}>
                <div className="heading-icon-refund svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin">Allow Refunds?</h1>
                    <div className="checkbox-container">
                        {allowRefunds ? <div className="checkbox-fill svg-color"></div> : <div className="checkbox-blank svg-color"></div>}
                        <input
                            type="checkbox"
                            checked={allowRefunds}
                            onChange={handleRefundsChange}
                            className="checkbox-style"
                        />
                    </div>
                </span>

                {allowRefunds && (
                    <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="flex-row-spaceless" style={{ alignItems: "center", gap: "2rem" }}>
                        <h2 className="heading-secondary">Length:</h2>
                        <select value={refundCount} onChange={handleRefundCountChange} className="text-options text-span" style={{ width: "5rem" }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>

                        <h2 className="heading-secondary">Duration:</h2>
                        <select value={refundDuration} onChange={handleRefundDurationChange} className="text-options text-span" style={{ width: "12rem" }}>
                            <option value="minute">Minutes</option>
                            <option value="hour">Hours</option>
                            <option value="day">Days</option>
                            <option value="week">Weeks</option>
                            <option value="month">Months</option>
                        </select>

                        <h2 className="heading-secondary" title="Will charge the customer by a % of their refunded total.">%Fee:</h2>
                        <input onChange={(event) => setRefundFee(event.target.value)} value={refundFee} type="number" placeholder="%Penalty" className="text-small input-number" autoComplete="off" style={{ width: "20%", margin: "0rem" }}></input>
                    </motion.div>
                )}

                <span className="page-heading flex-row-align" style={{ margin: "1rem 0" }}>
                <div className="heading-icon-cancel svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin" style={{ marginTop: "0rem" }}>Allow Cancellation?</h1>
                    <div className="checkbox-container">
                        {allowCancel ? <div className="checkbox-fill svg-color"></div> : <div className="checkbox-blank svg-color"></div>}
                        <input
                            type="checkbox"
                            checked={allowCancel}
                            onChange={handleCancelChange}
                            className="checkbox-style"
                        />
                    </div>
                </span>

                {allowCancel && (
                    <motion.div variants={slide} initial="hidden" animate="visible" exit="exit" className="flex-row-spaceless" style={{ alignItems: "center", gap: "2rem" }}>
                        <h2 className="heading-secondary">Length:</h2>
                        <select value={cancelCount} onChange={handleCancelCountChange} className="text-options text-span" style={{ width: "5rem" }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>

                        <h2 className="heading-secondary">Duration:</h2>
                        <select value={cancelDuration} onChange={handleCancelDurationChange} className="text-options text-span" style={{ width: "12rem" }}>
                            <option value="minute">Minutes</option>
                            <option value="hour">Hours</option>
                            <option value="day">Days</option>
                            <option value="week">Weeks</option>
                            <option value="month">Months</option>
                        </select>

                        <h2 className="heading-secondary" title="Will charge the customer by a % of their cancelled total.">%Fee:</h2>
                        <input onChange={(event) => setCancelFee(event.target.value)} value={cancelFee} type="number" placeholder="%Penalty" className="text-small input-number" autoComplete="off" style={{ width: "20%", margin: "0rem" }}></input>
                    </motion.div>
                )}

                <span className="page-heading flex-row-align" style={{ margin: "2rem 0" }}>
                <div className="heading-icon-pin svg-color">&nbsp;</div>
                    <h1 className="heading-secondary no-margin" style={{ marginTop: "0rem" }} title="A Google Map along with directions will be at checkout so the users know where to pick up their items, etc.">Show Google Map Location at Checkout?</h1>
                    <div className="checkbox-container">
                        {showMap ? <div className="checkbox-fill svg-color"></div> : <div className="checkbox-blank svg-color"></div>}
                        <input
                            type="checkbox"
                            checked={showMap}
                            onChange={handleMapChange}
                            className="checkbox-style"
                        />
                    </div>
                </span>
            </div>


            <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
                <button className="product-action-2 heading-secondary" onClick={submitChanges} disabled={loading} style={{width:"25rem"}}>{loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit Changes")}</button>
                <button className="product-action-3 heading-secondary white" onClick={resetChanges} disabled={loading} style={{width:"25rem"}}>Reset to Default</button>
            </div>
        </div>
    </Fragment>
}

export default Payment

export { getServerSideProps }