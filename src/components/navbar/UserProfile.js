import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import Backdrop from "../Modal/Backdrop";

import CustomizedPicker from "@/components/Mart/CustomizedPicker"
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import moment from 'moment'
import { transform } from "lodash";
import sha256 from 'crypto-js/sha256';

// import Guide from "../../pages/api/Guide"

const libraries = ['places'];
function UserProfile(props) {
    const {screenWidth} = props
    const router = useRouter()
    const localStorageKey = `mart_${router.query.shopid}`;
    const authKey = `auth_${router.query.shopid}`;

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

    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    async function hashString(data) {
        const hashHex = sha256(data).toString();
        return hashHex;
      }

    const genderOptions = [
        "Male", "Female", "Other"
    ];

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

    const [signValidity, setSignValidity] = useState({
        fname: true,
        lname: true,
        phone: true,
        bday: true,
        gender: true,
        occupation: true,
        other: true,
        company: true,
        email: true,
        name: true,
        number: true,
        mm: true,
        yy: true,
        location: true,
    });

    const handleSelectGender = (event, index) => {
        setSelectGender(event.target.value);
    };

    const [email, setEmail] = useState(props.user.email);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [fname, setfname] = useState(props.user.profile.first);
    const handlefnameChange = (event) => {
        setfname(event.target.value);
    };

    const [lname, setlname] = useState(props.user.profile.last);
    const handlelnameChange = (event) => {
        setlname(event.target.value);
    };

    const [phone, setPhone] = useState(props.user.profile.pnum);
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const [bday, setBday] = useState();
    const handleBdayChange = (date) => {
        setBday(date);
    };

    const [selectGender, setSelectGender] = useState(props.user.profile.gender);

    const [company, setCompany] = useState(props.user.profile.company);
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const [isOtherSelected, setIsOtherSelected] = useState(props.user.profile.other);
    const [selectedOccupation, setSelectedOccupation] = useState(props.user.profile.job === "" ? "Select Occupation" : props.user.profile.job);
    const [customOccupation, setCustomOccupation] = useState(props.user.profile.customjob);
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

    const mapContainerStyle = { width: `${screenWidth > 575 ? "100%" : "200%"}`, height: '25rem' };

    const [center, setCenter] = useState(props.user.locationCoords);
    const [locationName, setLocationName] = useState(props.user.location);
    const [autocomplete, setAutocomplete] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
        libraries,
    });

    const [passwordCheck, setPasswordCheck] = useState(true)
    const [emailCheck, setEmailCheck] = useState(true)

    const [cardname, setcardname] = useState(props.user.card.name);
    const handlecardnameChange = (event) => {
        setcardname(event.target.value);
    };

    const [cardnum, setcardnum] = useState(props.user.card.number);
    const handlecardnumChange = (event) => {
        setcardnum(event.target.value);
    };

    const [cardmonth, setcardmonth] = useState(props.user.card.month);
    const handlecardmonthChange = (event) => {
        setcardmonth(event.target.value);
    };

    const [cardyear, setcardyear] = useState(props.user.card.year);
    const handlecardyearChange = (event) => {
        setcardyear(event.target.value);
    };

    const [cvv, setcvv] = useState("");
    const handlecvvChange = (event) => {
        setcvv(event.target.value);
    };

    const [cvvTrue, setCvvTrue] = useState(false)

    async function getHashedCvv() {
        const hashedCVV = await hashString(cvv)
        return hashedCVV
    }

    const [password, setPassword] = useState("");
    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };

    const [loading, setLoading] = useState(false)
    const [completion, setCompletion] = useState(false)
    const checkmark = (
        <svg viewBox="0 0 100 100" width="7rem" height="7rem">
          <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
            strokeDasharray="200" strokeDashoffset="200">
            <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
          </path>
        </svg>
      )

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
      }

    useEffect(() => {
        const compareCvv = async () => {
            const inputted = await getHashedCvv();
            if (props.user.card.cvv === inputted) {
                setCvvTrue(true);
            } else {
                setCvvTrue(false);
            }
        };

        compareCvv();
    }, [cvv, props.user.card.cvv]);

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
        setCenter(props.user.locationCoords)
    }

    const [bdayValid, setbdayValid] = useState(false)

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

    const emailClasses = "text-small input-number"
    const passClasses = `${passwordCheck ? "text-small input-number" : "invalid-form-2 z"}`;

    const fnameClasses = `${signValidity.fname ? "text-small input-number" : "invalid-form-2 z"}`;
    const lnameClasses = `${signValidity.lname ? "text-small input-number" : "invalid-form-2 z"}`;
    const phoneClasses = `${signValidity.phone ? "text-small input-number" : "invalid-form-2 z"}`;
    const genderClasses = `${signValidity.gender ? "text-options text-span" : "text-options text-span invalid-dropdown"}`
    const occupationDropdownClasses = `${signValidity.occupation ? "text-options text-span" : "text-options text-span invalid-dropdown"}`
    const otherClasses = `${signValidity.other ? "text-small input-number" : "invalid-form-2 z"}`;
    const companyClasses = `${signValidity.company ? "text-small input-number" : "invalid-form-2 z"}`;

    const cardnameClasses = `${signValidity.name ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardnumClasses = `${signValidity.number ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardmonthClasses = `${signValidity.mm ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardyearClasses = `${signValidity.yy ? "text-small input-number" : "invalid-form-2 z"}`;
    const cvvClasses = "text-small input-number";

    async function submitNew(){
        const originalCVV = props.user.card.cvv
        const newCard = {name: cardname, number: cardnum, month: cardmonth, year: cardyear, cvv: originalCVV}
        const newProfile = {first: fname, last: lname, pnum: phone, birth: bday, gender: selectGender, other: isOtherSelected, job: selectedOccupation, customjob: customOccupation, company: company}
        const newLocationName = locationName
        const newCoords = center
        
        const requestBody = {
            email: email,
            newCard: newCard,
            newProfile: newProfile,
            newLocationName: newLocationName,
            newCoords: newCoords
          };
        
        const response = await fetch(
            `/api/set-profiles?martid=${router.query.shopid}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(requestBody)
            }
          );
          const data = await response.json();
    }

    function logout() {
        localStorage.removeItem(localStorageKey);
        localStorage.removeItem(authKey);
        window.location.href = `/${router.query.shopid}`;
      }
      

    async function submitChange(){
        let fnameValid = true
        let lnameValid = true
        let phoneValid = true
        let genderValid = true
        let occupationValid = true
        let otherValid = true
        let companyValid = true

        fnameValid = fname.trim() !== ""
        lnameValid = lname.trim() !== ""
        phoneValid = phone.trim() !== ""

        // if (bdayValid === true) {
        //     if (isNaN(bday.$D)) {
        //         setbdayValid(false)
        //     }
        // }

        // if (bdayValid === false) {
        //     if (isNaN(bday.$D)) {
        //         setbdayValid(false)
        //     }
        // }

        genderValid = selectGender !== "Select"

        if (!isOtherSelected) {
            occupationValid = selectedOccupation !== "Select Occupation" && selectedOccupation !== ""
            otherValid = true
        }

        if (isOtherSelected) {
            occupationValid = true
            otherValid = customOccupation !== ""
        }

        companyValid = company.trim() !== ""

        let nameValid = true
        let numValid = true
        let mmvalid = true
        let yyvalid = true

        nameValid = cardname.trim() !== ""
        numValid = cardnum.trim() !== ""
        mmvalid = cardmonth.length === 2
        yyvalid = cardyear.length === 2

        setSignValidity({
            fname: fnameValid,
            lname: lnameValid,
            phone: phoneValid,
            bday: bdayValid,
            gender: genderValid,
            occupation: occupationValid,
            other: otherValid,
            company: companyValid,
            name: nameValid,
            number: numValid,
            mm: mmvalid,
            yy: yyvalid,
            location: true,
        })

        const submissionValid = fnameValid && lnameValid && phoneValid && bdayValid && genderValid && occupationValid && otherValid && companyValid && nameValid && numValid && mmvalid && yyvalid

        if (submissionValid){
            setLoading(true)
            await submitNew()
            await waitSeconds();
            setLoading(false)
            setCompletion(true)
            router.reload()
        }

    }
    async function passValidate(){
        const hashedPassword = await hashString(password)
        if (bday === "" || bday === undefined) {
            setbdayValid(false)
        } else { setbdayValid(true) }

        if (props.user.password === hashedPassword){
            setPasswordCheck(true)

            submitChange()
        } else {
            setPasswordCheck(false)
        }
    }

    
    return (
        <Fragment>
            <AnimatePresence
                initial={false}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {props.modalStatus && (
                    <Backdrop onClick={props.disable} className="categ-modals">
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="categ-modal"
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <span className="page-heading">
                                <div className="heading-icon-manage-account svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Account Details &nbsp;</h1>
                            </span>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={emailClasses}
                                        placeholder="Email"
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        value={email}
                                    // onChange={handleEmailChange}
                                    ></input>
                                    {emailCheck ? <h3 className="form-label">Change Disabled</h3> : <h3 className="form-label inv z">Invalid Email</h3>}

                                </div>
                                {screenWidth > 450 && <>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={fnameClasses}
                                        placeholder="First Name"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={fname}
                                        onChange={handlefnameChange}
                                    ></input>
                                    {signValidity.fname ? <h3 className="form-label">First Name</h3> : <h3 className="form-label inv z">Invalid first name</h3>}
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={lnameClasses}
                                        placeholder="Last Name"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={lname}
                                        onChange={handlelnameChange}
                                    ></input>
                                    {signValidity.lname ? <h3 className="form-label">Last Name</h3> : <h3 className="form-label inv z">Invalid last name</h3>}
                                </div>
                                </>}
                                {screenWidth <= 450 && <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {signValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>}
                                {screenWidth > 575 && <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {signValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>}
                            </div>
                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={fnameClasses}
                                        placeholder="First Name"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={fname}
                                        onChange={handlefnameChange}
                                    ></input>
                                    {signValidity.fname ? <h3 className="form-label">First Name</h3> : <h3 className="form-label inv z">Invalid first name</h3>}
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={lnameClasses}
                                        placeholder="Last Name"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={lname}
                                        onChange={handlelnameChange}
                                    ></input>
                                    {signValidity.lname ? <h3 className="form-label">Last Name</h3> : <h3 className="form-label inv z">Invalid last name</h3>}
                                </div>
                                </div>
                            <div>
                                <div className="flex-row">
                                    <div className="form-group" style={{ marginTop: "1rem" }}>
                                        <CustomizedPicker colormode={props.colormode} selectedDate={bday} handleDateChange={handleBdayChange} valid={bdayValid}></CustomizedPicker>
                                    </div>
                                    <div className="form-group" style={{ marginTop: "1rem" }}>
                                        <select
                                            value={selectGender}
                                            className={genderClasses}
                                            style={{ width: `${screenWidth > 450 ? "10rem" : "100%"}` }}
                                            onChange={(event) => handleSelectGender(event)}
                                        >
                                            {genderOptions.map(gender => (
                                                <option key={gender} value={gender}>{gender}</option>
                                            ))}
                                        </select>
                                        {signValidity.gender ? <h3 className="form-label">Gender</h3> : <h3 className="form-label inv z">Invalid gender</h3>}
                                    </div>
                                    {screenWidth > 575 && <>
                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        {isOtherSelected ? (
                                            <input
                                                className={otherClasses}
                                                type="text"
                                                value={customOccupation}
                                                onChange={handleCustomOccupationChange}
                                                autoFocus
                                                placeholder="Enter your occupation"
                                                style={{ width: '22rem', margin: '0' }}
                                            />
                                        ) : (
                                            <select
                                                className={occupationDropdownClasses}
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
                                        {signValidity.occupation ? <h3 className="form-label">Occupation</h3> : <h3 className="form-label inv z">Invalid Occupation</h3>}
                                    </div>

                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <input
                                            type="text"
                                            className={companyClasses}
                                            placeholder="Company Name"
                                            autoComplete="off"
                                            style={{ width: '100%', margin: '0' }}
                                            value={company}
                                            onChange={handleCompanyChange}
                                        ></input>
                                        {signValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid company name</h3>}
                                    </div>
                                    </>}
                                    {screenWidth <= 575 && screenWidth > 450 && <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {signValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>}
                                </div>
                                {screenWidth <= 575 && <div className="flex-row">
                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        {isOtherSelected ? (
                                            <input
                                                className={otherClasses}
                                                type="text"
                                                value={customOccupation}
                                                onChange={handleCustomOccupationChange}
                                                autoFocus
                                                placeholder="Enter your occupation"
                                                style={{ width: '22rem', margin: '0' }}
                                            />
                                        ) : (
                                            <select
                                                className={occupationDropdownClasses}
                                                style={{ width: `${screenWidth > 350 ? "22rem" : "100%"}` }}
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
                                        {signValidity.occupation ? <h3 className="form-label">Occupation</h3> : <h3 className="form-label inv z">Invalid Occupation</h3>}
                                    </div>

                                    {screenWidth > 350 && <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <input
                                            type="text"
                                            className={companyClasses}
                                            placeholder="Company Name"
                                            autoComplete="off"
                                            style={{ width: '100%', margin: '0' }}
                                            value={company}
                                            onChange={handleCompanyChange}
                                        ></input>
                                        {signValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid company name</h3>}
                                    </div>}
                                </div>}
                                {screenWidth <= 350 && <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <input
                                            type="text"
                                            className={companyClasses}
                                            placeholder="Company Name"
                                            autoComplete="off"
                                            style={{ width: '100%', margin: '0' }}
                                            value={company}
                                            onChange={handleCompanyChange}
                                        ></input>
                                        {signValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid company name</h3>}
                                    </div>}
                                {screenWidth <= 575 && <span className="page-heading" style={{marginTop:"1rem"}}>
                                            <div className="heading-icon-pin svg-color">&nbsp;</div>
                                            <h1 className="heading-secondary no-margin">Delivery Location</h1>
                                        </span>}
                                <div className="account-detail-address">
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
                                    {screenWidth > 575 && <div className="detail-address-col">
                                        <span className="page-heading">
                                            <div className="heading-icon-pin svg-color">&nbsp;</div>
                                            <h1 className="heading-secondary no-margin">Delivery Location</h1>
                                        </span>
                                        <h2 className="heading-tertiary">{locationName}</h2>
                                        <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: "100%", height:"auto", margin:"0" }}  onClick={currentLoc}><h2 className="heading-secondary outline-button margin-side">Get Current Location</h2></button>

                                        <button className="product-action-3 white flex-row-align sign-page-button" onClick={resetLoc} style={{ width: "100%" }}><h2 className="heading-secondary white button-solid-text">Reset</h2></button>
                                    </div>}
                                </div>
                                
                                <div className="flex-row flex-row-align" style={{marginBottom:"1rem"}}>
                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: "150%", height:"auto", margin:"0" }}  onClick={currentLoc}><h2 className="heading-secondary outline-button margin-side">Get Current Location</h2></button>

<button className="product-action-3 white flex-row-align sign-page-button" onClick={resetLoc} style={{ width: "50%" }}><h2 className="heading-secondary white button-solid-text">Reset</h2></button>
                                </div>

                                <span className="page-heading">
                                    <div className="heading-icon-credit svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">&nbsp;Card Details &nbsp;</h1>
                                    <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setcvv(newValue); } }}></input>
                                </span>
                            </div>
                            <motion.div
                                initial={cvvTrue ? 'visible' : 'hidden'}
                                animate={cvvTrue ? 'visible' : 'hidden'}
                                variants={SlideHeight}>

                                {cvvTrue && <div className="profile-card">
                                <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                <input
                                    type="text"
                                    className={cardnameClasses}
                                    placeholder="Name on card"
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={cardname}
                                    onChange={handlecardnameChange}
                                ></input>
                                {signValidity.name ? <h3 className="form-label">Name on card</h3> : <h3 className="form-label inv z">Invalid card name</h3>}
                            </div>

                            <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                <input
                                    type="number"
                                    className={cardnumClasses}
                                    placeholder="Credit Card Number"
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    value={cardnum}
                                    onChange={handlecardnumChange}
                                ></input>
                                {signValidity.number ? <h3 className="form-label">Credit Card Number</h3> : <h3 className="form-label inv z">Invalid card number</h3>}
                            </div>
                            </div>

                            <div className="flex-row-spaceless" style={{ alignItems: "center", marginTop:"1rem" }}>
                                <label className="heading-tertiary product-currency" style={{ width: "13rem" }}>Expiry Date:</label>
                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className={cardmonthClasses} placeholder="MM" autoComplete="off" value={cardmonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardmonth(newValue); } }}></input>
                                    {signValidity.mm ? <h3 className="form-label">Month</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">/</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className={cardyearClasses} placeholder="YY" autoComplete="off" value={cardyear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardyear(newValue); } }}></input>
                                    {signValidity.yy ? <h3 className="form-label">Year</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">CVV:</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" value={cvv}></input>
                                    <h3 className="form-label">Change Disabled</h3>
                                </div>
                            </div>
                                </div>}

                            </motion.div>

                            {screenWidth <= 550 && <div className="flex-row-spaceless" style={{ alignItems: "center", marginTop:"1rem" }}>
                                <label className="heading-tertiary product-currency" style={{ width: "13rem" }}>Password:</label>
                                <div className="flex-col-none">
                                <input
                                    type="text"
                                    className={passClasses}
                                    placeholder="Password"
                                    autoComplete="off"
                                    style={{ maxWidth: "25rem" }}
                                    value={password}
                                    onChange={handlePassChange}
                                ></input>
                                {passwordCheck ? <h3 className="form-label">&nbsp;</h3> : <h3 className="form-label inv z">Incorrect Password</h3>}
                                </div>
                            </div>}

                            <div className="flex-row" style={{marginTop:"1rem"}}>
                            {screenWidth > 550 && <div className="flex-row-spaceless" style={{ alignItems: "center", marginTop:"1rem" }}>
                                <label className="heading-tertiary product-currency" style={{ width: "13rem" }}>Password:</label>
                                <div className="flex-col-none">
                                <input
                                    type="text"
                                    className={passClasses}
                                    placeholder="Password"
                                    autoComplete="off"
                                    style={{ maxWidth: "25rem" }}
                                    value={password}
                                    onChange={handlePassChange}
                                ></input>
                                {passwordCheck ? <h3 className="form-label">&nbsp;</h3> : <h3 className="form-label inv z">Incorrect Password</h3>}
                                </div>
                            </div>}
                                <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: `${screenWidth > 550 ? "22rem" : "100%"}`, height:`${screenWidth > 550 ? "auto" : "6rem"}`, display:"block" }} onClick={passValidate} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? <div style={{transform:"translateY(20%)"}}><div style={{transform:"translateY(-22%)"}}>{checkmark}</div></div> : "Submit Changes")}</button>
                            </div>

                            <button className="product-action-3 flex-row-align sign-page-button" onClick={logout} style={{ width: "30rem", marginTop:"2rem" }}><h2 className="heading-secondary white button-solid-text">Log-out</h2></button>

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );

}

export default UserProfile;
