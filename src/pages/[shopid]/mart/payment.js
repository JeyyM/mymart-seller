import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"
import { useState } from 'react';

import { motion, AnimatePresence } from "framer-motion"

function Payment(martID) {
    const id = martID.shopID._id

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

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [message, setMessage] = useState('');

    const [currency, setCurrency] = useState('$');
    const [allowRefunds, setAllowRefunds] = useState(false);
    const [refundDuration, setRefundDuration] = useState('hour');
    const [refundCount, setRefundCount] = useState(1);

    const [allowCancel, setAllowCancel] = useState(false);
    const [cancelDuration, setCancelDuration] = useState('hour');
    const [cancelCount, setCancelCount] = useState(1);
    const [cancelFee, setCancelFee] = useState(0);

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

    const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"}`;
    const monthClasses = `${formInputValidity.month ? "text-small input-number" : "invalid-form-2"}`;
    const yearClasses = `${formInputValidity.year ? "text-small input-number" : "invalid-form-2"}`;
    const cvvClasses = `${formInputValidity.cvv ? "text-small input-number" : "invalid-form-2"}`;
    const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"}`;


    const sampledata = [{
        "name": "del",
        "cost": "123"
    }]

    const sampledata2 = [{
        "name": "pick",
        "cost": "456"
    }]

    const [DelFee, setDelFee] = useState(sampledata);

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

    
    const [PickFee, setPickFee] = useState(sampledata2);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            cardName,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
            message,

            currency,

            DelFee,
            PickFee,

            allowRefunds,
            refundDuration,
            refundCount,

            allowCancel,
            cancelDuration,
            cancelCount,
            cancelFee,
        };

        console.log(payload);
    };

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
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-credit svg-color">&nbsp;</div>
                    </div>
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
                    {formInputValidity.name ? <label className="form-label">Name on Credit Card </label> : <label className="form-label inv">Category name already exists</label>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={`${nameClasses}`}
                        placeholder="Credit Card Number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        id="number"
                        autoComplete="off"
                    ></input>
                    {formInputValidity.name ? <label className="form-label">Credit Card Number </label> : <label className="form-label inv">Category name already exists</label>}
                </div>

                <div className="flex-row-spaceless" style={{ alignItems: "center", gap: "2rem" }}>
                    <label className="heading-secondary product-currency">Expiry Date:</label>
                    <div className="flex-col-none">
                        <input style={{ width: "8rem", margin: "0" }} type="number" className={monthClasses} placeholder="MM" autoComplete="off" id='month' value={expiryMonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryMonth(newValue); } }}></input>
                        {formInputValidity.month ? <label className="form-label">Month</label> : <label className="form-label inv" style={{ color: "red" }}>Enter a valid price</label>}
                    </div>

                    <label className="heading-secondary product-currency">/</label>

                    <div className="flex-col-none">
                        <input style={{ width: "8rem", margin: "0" }} type="number" className={yearClasses} placeholder="YY" autoComplete="off" id='year' value={expiryYear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setExpiryYear(newValue); } }}></input>
                        {formInputValidity.year ? <label className="form-label">Year</label> : <label className="form-label inv" style={{ color: "red" }}>Enter a valid price</label>}
                    </div>

                    <label className="heading-secondary product-currency">CVV:</label>

                    <div className="flex-col-none">
                        <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" id='year' value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setCvv(newValue); } }}></input>
                        {formInputValidity.year ? <label className="form-label">&nbsp;</label> : <label className="form-label inv" style={{ color: "red" }}>Enter a valid price</label>}
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
                        <option value="₱">₱ - Mexican Peso</option>
                        <option value="R">R - South African Rand</option>
                    </select>
                </label>

                <span className="page-heading flex-row-align" style={{ margin: "1rem 0" }}>
                    <div className="heading-icon-dropshadow">
                        <div className="heading-icon-fee svg-color">&nbsp;</div>
                    </div>
                    <h1 className="heading-secondary no-margin">Payments and Fees</h1>
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
            </div>


            <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
                <button className="product-action-1 heading-secondary" onClick={handleSubmit}>Submit Changes</button>
                <button className="product-action-3 heading-secondary white">Reset to Default</button>
            </div>
        </div>
    </Fragment>
}

export default Payment

export { getServerSideProps }