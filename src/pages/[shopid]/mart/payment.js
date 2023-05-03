import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"
import { useState } from 'react';

function Payment(martID) {
    const id = martID.shopID._id

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
    



    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            cardName,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,

            currency,
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

    const nameClasses = `${formInputValidity.name ? "text-full" : "invalid-form"}`;
    const monthClasses = `${formInputValidity.month ? "text-small input-number" : "invalid-form-2"}`;
    const yearClasses = `${formInputValidity.year ? "text-small input-number" : "invalid-form-2"}`;
    const cvvClasses = `${formInputValidity.cvv ? "text-small input-number" : "invalid-form-2"}`;
    const descClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"}`;

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
                {/* <form onSubmit={handleClick}>
                <span className="page-heading">
                  <h2 className="heading-primary no-margin">{setting}</h2>
                  <div className="heading-icon-dropshadow">
                    <div className="heading-icon-category svg-color">&nbsp;</div>
                  </div>
                </span>

                <div className="form-group">

                  <input
                    type="text"
                    className={`${nameClasses}`}
                    placeholder="Category Name"
                    value={nameValue}
                    // defaultValue={props.defs[0]}
                    onChange={handleNameChange}
                    // required
                    id="name"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.name && !formInputValidity.exist ? <label title="Upon reaching 40 digits in length, an ellipsis (...) will be added." className="form-label">Category Name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span> </label> : !formInputValidity.exist ? <label className="form-label inv">Enter a valid category name <span><span className={nameLengthClasses}>{nameLength}</span>/40</span></label> : <label className="form-label inv">Category name already exists</label>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={imgClasses}
                    placeholder="Category Image (Imgur Links Only)"
                    value={imgValue}
                    onChange={handleImgChange}
                    // required
                    id="image"
                    autoComplete="off"
                  ></input>
                  {formInputValidity.img ? <label className="form-label">Category Image (Imgur Links Only)</label> : <label className="form-label inv">Enter a valid Imgur link</label>}
                </div>
                {imgValue && <img src={imgValue} className="add-categ-img" alt="Link is Invalid"></img>}

                <div className="form-group">
                  <textarea
                    id="description"
                    // required
                    rows="5"
                    className={descClasses}
                    placeholder="Description"
                    onChange={handleDescChange}
                    value={descValue}
                    autoComplete="off"
                  ></textarea>
                  {formInputValidity.desc ? <label title="Upon reaching 150 digits in length, an ellipsis (...) will be added." className="form-label">Description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label> : <label className="form-label inv">Enter a valid description <span><span className={descLengthClasses}>{descLength}</span>/150</span></label>}
                </div>
                <div className="add-categ-buttons">
                  {setting === "Edit Category" && <button className="product-action-3 heading-secondary categ-button-2 white" type="button" onClick={delCategHandler} disabled={loading}>Delete</button>}
                  <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={emptyContents} disabled={loading}>Cancel</button>
                  <button className="product-action-2 heading-secondary categ-button-2" type="submit" disabled={loading}> {loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit")}</button>
                </div>
              </form> */}
            </div>




            {/* 

            <form onSubmit={handleSubmit}>
                <label>
                    Name on Card:
                    <input
                        type="text"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)}
                    />
                </label>
                <label>
                    Card Number:
                    <input
                        type="number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                    />
                </label>
                <label>
                    Expiry Date:
                    <input
                        type="text"
                        value={expiryMonth}
                        maxLength="2"
                        onChange={(event) => setExpiryMonth(event.target.value)}
                    />/
                    <input
                        type="text"
                        value={expiryYear}
                        maxLength="2"
                        onChange={(event) => setExpiryYear(event.target.value)}
                    />
                </label>
                <label>
                    CVV:
                    <input
                        type="text"
                        value={cvv}
                        onChange={(event) => setCvv(event.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleSubmit}>
                <label>
                    Currency:
                    <select value={currency} onChange={handleCurrencyChange}>
                        <option value="USD">$ - US Dollar</option>
                        <option value="EUR">€ - Euro</option>
                        <option value="GBP">£ - British Pound Sterling</option>
                        <option value="JPY">¥ - Japanese Yen</option>
                        <option value="AUD">$ - Australian Dollar</option>
                        <option value="CAD">$ - Canadian Dollar</option>
                        <option value="CHF">Fr - Swiss Franc</option>
                        <option value="CNY">元 - Chinese Yuan</option>
                        <option value="HKD">$ - Hong Kong Dollar</option>
                        <option value="NZD">$ - New Zealand Dollar</option>
                        <option value="SGD">$ - Singapore Dollar</option>
                        <option value="INR">₹ - Indian Rupee</option>
                        <option value="MXN">$ - Mexican Peso</option>
                        <option value="ZAR">R - South African Rand</option>
                    </select>
                </label>
                <label>
                    Allow refunds?
                    <input
                        type="checkbox"
                        checked={allowRefunds}
                        onChange={handleRefundsChange}
                    />
                </label>
                {allowRefunds && (
                    <>
                        <label>
                            Refund duration:
                            <select value={refundDuration} onChange={handleRefundDurationChange}>
                                <option value="hour">Within 1 hour</option>
                                <option value="day">Within 1 day</option>
                                <option value="week">Within 1 week</option>
                                <option value="month">Within 1 month</option>
                            </select>
                        </label>
                        <label>
                            Number of allowed refunds:
                            <select value={refundCount} onChange={handleRefundCountChange}>
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
                        </label>
                    </>
                )}

                <label>
                    Allow Cancellation?
                    <input
                        type="checkbox"
                        checked={allowCancel}
                        onChange={handleCancelChange}
                    />
                </label>

                {allowCancel && (
                    <>
                        <label>
                            Cancel duration:
                            <select value={cancelDuration} onChange={handleCancelDurationChange}>
                                <option value="hour">Within 1 hour</option>
                                <option value="day">Within 1 day</option>
                                <option value="week">Within 1 week</option>
                                <option value="month">Within 1 month</option>
                            </select>
                        </label>
                        <label>
                            Number of allowed cancel:
                            <select value={cancelCount} onChange={handleCancelCountChange}>
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
                        </label>
                        <label> Cancel Fees:
                            <input
                                type="number"
                                value={cancelFee}
                                onChange={(event) => setCancelFee(event.target.value)}
                            />
                            %
                        </label>
                    </>
                )}

                <button type="submit">Submit</button>
            </form> */}
        </div>


    </Fragment>
}

export default Payment

export { getServerSideProps }