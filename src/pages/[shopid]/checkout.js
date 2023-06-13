import { Fragment, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSideProps } from "../_app";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function Images({ shopID, user }) {
    const router = useRouter();

    const paymentDetails = shopID.shopData.shopDetails.paymentData
    const cardData = paymentDetails.cardInfo
    const checkoutData = paymentDetails.checkoutInfo

    const mapContainerStyle = { width: '50rem', height: '30rem', margin:"0 auto" };

    let userCard = {}
    let userLocation = ""

    if (user !== undefined) {
        userCard = user.card
        userLocation = user.location
    }

    console.log(user)

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
    const [center, setCenter] = useState(null);
    const [locationName, setLocationName] = useState(userLocation);
    const [autocomplete, setAutocomplete] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
        libraries,
    });
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

                        <span className="page-heading" style={{ width: "100%", marginBottom: "1rem" }}>
                            <div className="heading-icon-pin svg-color">&nbsp;</div>
                            <h1 className="heading-secondary no-margin">&nbsp;Delivery Location Details</h1>
                        </span>
                        <h2 className="heading-tertiary">{locationName}</h2>

                    <div>
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
                    <div className="flex-row">
                    <button className="product-action-2 flex-row-align sign-page-button" onClick={currentLoc}><h2 className="heading-secondary button-solid-text">Get Current Location</h2></button>
                    <button className="product-action-2 flex-row-align sign-page-button" onClick={currentLoc}><h2 className="heading-secondary button-solid-text">Get Current Location</h2></button>
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
