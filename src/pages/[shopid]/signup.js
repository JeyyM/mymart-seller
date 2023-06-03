import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../_app"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import CustomizedPicker from "@/components/Mart/CustomizedPicker"

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function SignUp(martID) {
    const id = martID.shopID._id
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon
    const [currentStep, setCurrentStep] = useState(1);
    const shopName = martID.shopID.name
    const navlogo = martID.shopID.shopData.shopDetails.imageData.icons.logo

    const design = martID.shopID.shopData.shopDesigns
    const colormode = martID.shopID.shopData.shopDesigns.defaultMode

    const genderOptions = [
        "Select", "Male", "Female", "Other"
    ];

    const [selectGender, setSelectGender] = useState("Male");

    const handleSelectGender = (event, index) => {
        setSelectGender(event.target.value);
    };

    let chosenMode = {}

    if (colormode === true) {
        chosenMode = design.lightDesign
    } else if (colormode === false) {
        chosenMode = design.darkDesign
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const appear = {
        hidden: {
            transform: "scale(0)",
            opacity: 0,
        },
        visible: {
            transform: " scale(1)",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            transform: "scale(0)",
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    // const darkClasses = `${formInputValidity.mainDark ? "text-small input-number" : "invalid-form-2 z"}`;

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };

    const [repeat, setRepeat] = useState("");
    const handleRepeatChange = (event) => {
        setRepeat(event.target.value);
    };

    const [signValidity, setSignValidity] = useState({
        email: true,
        pass: true,
        repeat: true
    });

    const [fname, setfname] = useState("");
    const handlefnameChange = (event) => {
        setfname(event.target.value);
    };

    const [lname, setlname] = useState("");
    const handlelnameChange = (event) => {
        setlname(event.target.value);
    };

    const [phone, setPhone] = useState("");
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const [bday, setbday] = useState("");
    const handlebdayChange = (date) => {
        setbday(date);
    };

    const [gender, setGender] = useState("Male");
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const [company, setCompany] = useState("");
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const occupationOptions = [
        "Select Occupation",
        "None",
        "Retail Worker",
        "Chef",
        'Software Developer',
        'Registered Nurse',
        'Accountant',
        'Teacher',
        'Marketing Manager',
        'Physician',
        'Lawyer',
        'Financial Analyst',
        'Sales Manager',
        'Civil Engineer',
        'Project Manager',
        'Human Resources Manager',
        'Dentist',
        'Graphic Designer',
        'Pharmacist',
        'Mechanical Engineer',
        'Electrician',
        'Data Analyst',
        'Architect',
        'Social Worker',
        'Nurse Practitioner',
        'Physical Therapist',
        'Occupational Therapist',
        'Operations Manager',
        'Executive Assistant',
        'Police Officer',
    ];

    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [customOccupation, setCustomOccupation] = useState('');
    const inputRef = useRef(null);

    const handleOccupationChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'other') {
            setIsOtherSelected(true);
            setSelectedOccupation('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            setIsOtherSelected(false);
            setSelectedOccupation(selectedValue);
        }
    };

    const handleCustomOccupationChange = (event) => {
        const value = event.target.value;
        setCustomOccupation(value);

        if (!isOtherSelected && value.length > 0) {
            setIsOtherSelected(true);
        } else if (isOtherSelected && value.length === 0) {
            setIsOtherSelected(false);
        }
    };

    const [detailValidity, setDetailValidity] = useState({
        fname: true,
        lname: true,
        phone: true,
        bday: true,
        gender: true,
        occupation: true,
        other: true,
        company: true,
    });

    const footerItems = martID.shopID.shopData.shopDetails.footerData

    const [locationValidity, setLocationValidity] = useState({
        location: true,
    });

    const mapContainerStyle = { width: '100%', height: '100%' };

    const [center, setCenter] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [autocomplete, setAutocomplete] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
        libraries,
    });

    const [cardname, setcardname] = useState("");
    const handlecardnameChange = (event) => {
        setcardname(event.target.value);
    };

    const [cardnum, setcardnum] = useState("");
    const handlecardnumChange = (event) => {
        setcardnum(event.target.value);
    };

    const [cardmonth, setcardmonth] = useState("");
    const handlecardmonthChange = (event) => {
        setcardmonth(event.target.value);
    };

    const [cardyear, setcardyear] = useState("");
    const handlecardyearChange = (event) => {
        setcardyear(event.target.value);
    };

    const [cvv, setcvv] = useState("");
    const handlecvvChange = (event) => {
        setcvv(event.target.value);
    };

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


    function printAll() {
        console.log(email, password, repeat)
        // console.log(fname, lname, phone, bday, gender, selectedOccupation, customOccupation, company)
        console.log(fname, lname, phone, bday, gender, selectedOccupation, customOccupation, company)

        console.log(locationName)

        console.log(cardname, cardnum, cardmonth, cardyear, cvv)

        // accountValidate()
        detailValidate()
    }

    const accountValidate = async (event) => {

        let emailValid = true
        let passValid = true
        let repeatValid = true

        emailValid = email.trim() !== ""
        passValid = password.trim() !== ""
        repeatValid = repeat === password

        console.log(emailValid, passValid, repeatValid)

        setSignValidity({
            email: emailValid,
            pass: passValid,
            repeat: repeatValid
        })
    
        const submissionValid = emailValid && passValid && repeatValid

        if (submissionValid){
            handleNextStep()
        }

      };

    const detailValidate = async (event) => {

        let fnameValid = true
        let lnameValid = true
        let phoneValid = true
        let bdayValid = true
        let genderValid = true
        let occupationValid = true
        let otherValid = true
        let companyValid = true

        fnameValid = fname.trim() !== ""
        lnameValid = lname.trim() !== ""
        phoneValid = phone.trim() !== ""
        bdayValid = bday !== ""
        genderValid = gender !== "Select"
        occupationValid = selectedOccupation !== "Select Occupation"
        otherValid = customOccupation.trim() !== ""
        companyValid = company.trim() !== ""

        if (isOtherSelected) {
            occupationValid = true
        } else if (!isOtherSelected) {
            otherValid = true
        }

        console.log(fnameValid, lnameValid, phoneValid, bdayValid, genderValid, occupationValid, otherValid, companyValid)

        setDetailValidity({
            fname: fnameValid,
            lname: lnameValid,
            phone: phoneValid,
            bday: bdayValid,
            gender: genderValid,
            occupation: occupationValid,
            other: otherValid,
            company: companyValid,
        })
    
        const submissionValid = fnameValid && lnameValid && phoneValid && bdayValid && genderValid && occupationValid && otherValid && companyValid

        if (submissionValid){
            handleNextStep()
        }

      };

      const emailClasses = `${signValidity.email ? "text-small input-number" : "invalid-form-2 z"}`;
      const passClasses = `${signValidity.pass ? "text-small input-number" : "invalid-form-2 z"}`;
      const repeatClasses = `${signValidity.repeat ? "text-small input-number" : "invalid-form-2 z"}`;

      const fnameClasses = `${detailValidity.fname ? "text-small input-number" : "invalid-form-2 z"}`;
      const lnameClasses = `${detailValidity.lname ? "text-small input-number" : "invalid-form-2 z"}`;
      const phoneClasses = `${detailValidity.phone ? "text-small input-number" : "invalid-form-2 z"}`;

      


    return (
        <>
            <Head>
                <title>Sign-Up</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <div className="sign-up-container" style={{ transform: "translateY(-10%)" }}>
                <AnimatePresence>
                    <motion.div
                        key={currentStep}
                        className="sign-up-box round-borderer round-borderer-extra"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { scale: 0 },
                            visible: { scale: 1 },
                            exit: { scale: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {currentStep === 1 && <div className="sign-step">
                            <img className="company-logo-med" src={navlogo} style={{ margin: "0", marginBottom: "1rem", display: "inline" }}></img>
                            <h2 className="heading-secondary">Sign up to {shopName}</h2>

                            <div className="form-group" style={{ marginTop: "1rem" }}>
                                <input
                                    type="text"
                                    className={emailClasses}
                                    placeholder="Email"
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={email}
                                    onChange={handleEmailChange}
                                ></input>
                                {signValidity.email ? <h3 className="form-label">Email</h3> : <h3 className="form-label inv z">Input a valid email</h3>}

                            </div>
                            <div className="form-group" style={{ marginTop: "0.5rem" }}>
                                <input
                                    type="text"
                                    className={passClasses}
                                    placeholder="Password"
                                    autoComplete="off"
                                    style={{ margin: "0", width: "100%" }}
                                    value={password}
                                    onChange={handlePassChange}
                                ></input>
                                {signValidity.pass ? <h3 className="form-label">Password</h3> : <h3 className="form-label inv z">Input a valid password</h3>}
                            </div>

                            <div className="form-group" style={{ marginTop: "0.5rem" }}>
                                <input
                                    type="text"
                                    className={repeatClasses}
                                    placeholder="Repeat Password"
                                    autoComplete="off"
                                    style={{ margin: "0", width: "100%" }}
                                    value={repeat}
                                    onChange={handleRepeatChange}
                                ></input>
                                {signValidity.repeat ? <h3 className="form-label">Repeat password</h3> : <h3 className="form-label inv z">Password doesn't match</h3>}
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={accountValidate}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                            </div>
                            <a className="heading-tertiary" style={{ margin: "1rem auto" }} href="#">Log-in instead?</a>

                        </div>}
                        {currentStep === 2 && <div className="sign-step">
                            <span className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-profile svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Register Details</h1>
                            </span>
                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={fnameClasses}
                                        placeholder="First Name"
                                        autoComplete="off"
                                        style={{ width: "25rem", margin: "0" }}
                                        value={fname}
                                        onChange={handlefnameChange}
                                    ></input>
                                    <label className="form-label">First Name</label>
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className="text-small input-number"
                                        placeholder="Last Name"
                                        autoComplete="off"
                                        style={{ width: "25rem", margin: "0" }}
                                        value={lname}
                                        onChange={handlelnameChange}
                                    ></input>
                                    <label className="form-label">Last Name</label>
                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className="text-small input-number"
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        style={{ width: "17rem", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    <label className="form-label">Phone Number</label>
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPicker colormode={chosenMode} selectedDate={bday} handleDateChange={handlebdayChange}></CustomizedPicker>
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <select
                                        value={selectGender}
                                        className={`text-options invalid-dropdown text-span`}
                                        style={{ width: "14rem" }}
                                        onChange={(event) => handleSelectGender(event)}
                                    >
                                        {genderOptions.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                    <label className="form-label">Gender</label>
                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    {isOtherSelected ? (
                                        <input
                                            className="text-small input-number"
                                            type="text"
                                            value={customOccupation}
                                            onChange={handleCustomOccupationChange}
                                            autoFocus
                                            placeholder="Enter your occupation"
                                            style={{ width: '22rem', margin: '0' }}
                                        />
                                    ) : (
                                        <select
                                            className={`text-options text-span`}
                                            style={{ width: '22rem' }}
                                            value={selectedOccupation}
                                            onChange={handleOccupationChange}
                                        >
                                            {occupationOptions.map((occupation) => (
                                                <option key={occupation} value={occupation}>
                                                    {occupation}
                                                </option>
                                            ))}
                                            <option value="other">Other</option>
                                        </select>
                                    )}
                                    <label className="form-label">Occupation</label>
                                </div>

                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type="text"
                                        className="text-small input-number"
                                        placeholder="Company Name"
                                        autoComplete="off"
                                        style={{ width: '30rem', margin: '0' }}
                                        value={company}
                                        onChange={handleCompanyChange}
                                    ></input>
                                    <label className="form-label">Company Name</label>
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{ width: "22rem" }}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={handleNextStep}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                            </div>

                        </div>}

                        {currentStep === 3 && <div>
                            <div style={{ width: "50rem" }}>
                                <span className="page-heading" style={{ width: "100%", marginBottom: "1rem" }}>
                                    <div className="heading-icon-pin svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">&nbsp;Location Details</h1>
                                </span>                                <h2 className="heading-tertiary">{locationName}</h2>
                            </div>

                            <div style={{ height: "24rem", margin: "1rem" }}>
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
                            <button className="product-action-2 flex-row-align sign-page-button" onClick={currentLoc} style={{ width: "95%" }}><h2 className="heading-secondary button-solid-text">Get Current Location</h2></button>
                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{ width: "22rem" }}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={handleNextStep}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                            </div>

                        </div>
                        }
                        {currentStep === 4 && <div className="sign-step">
                            <span className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-credit svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Credit Card Details</h1>
                            </span>
                            <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                <input
                                    type="text"
                                    className="text-small input-number"
                                    placeholder="Name on card"
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={cardname}
                                    onChange={handlecardnameChange}
                                ></input>
                                <label className="form-label">Name on card</label>
                            </div>

                            <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                <input
                                    type="text"
                                    className="text-small input-number"
                                    placeholder="Credit Card Number"
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={cardnum}
                                    onChange={handlecardnumChange}
                                ></input>
                                <label className="form-label">Credit Card Number</label>
                            </div>

                            <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                <label className="heading-tertiary product-currency" style={{ width: "13rem" }}>Expiry Date:</label>
                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className="text-small input-number" placeholder="MM" autoComplete="off" value={cardmonth} onChange={handlecardmonthChange}></input>
                                    <label className="form-label">Month</label>
                                </div>

                                <label className="heading-tertiary product-currency">/</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className="text-small input-number" placeholder="YY" autoComplete="off" value={cardyear} onChange={handlecardyearChange}></input>
                                    <label className="form-label">Year</label>
                                </div>

                                <label className="heading-tertiary product-currency">CVV:</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "12rem", margin: "0" }} type="number" className="text-small input-number" placeholder="CVV" autoComplete="off" value={cvv} onChange={handlecvvChange}></input>
                                    <label className="form-label">&nbsp;</label>
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{ width: "22rem" }}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                                <button className="product-action-2 flex-row-align sign-page-button"><h2 className="heading-secondary button-solid-text">Finish</h2></button>
                            </div>

                        </div>}
                    </motion.div>
                    <button onClick={printAll}>print all</button>

                </AnimatePresence>
            </div>

        </>
    );
}

export default SignUp

export { getServerSideProps }