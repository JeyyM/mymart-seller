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
import { useRouter } from "next/router"

const libraries = ['places'];

function SignUp(martID) {
    const router = useRouter()
    const id = martID.shopID._id
    const localStorageKey = `mart_${martID.shopID._id}`;
    const defaultColor = martID.shopID.shopData.shopDesigns.defaultMode

    const [parsedData, setParsedData] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const updateParsedData = () => {
          const storedCartItems =
            typeof window !== "undefined"
              ? localStorage.getItem(localStorageKey)
              : null;
          const parsedData = storedCartItems ? JSON.parse(storedCartItems) : [];
    
          setParsedData(parsedData);
        };
    
        const handleStorageChange = (event) => {
          if (event.key === localStorageKey) {
            updateParsedData();
          }
        };
    
        const handleVisibilityChange = () => {
          setIsVisible(!document.hidden);
        };
    
        handleVisibilityChange();
    
        updateParsedData();
    
        window.addEventListener("storage", handleStorageChange);
        document.addEventListener("visibilitychange", handleVisibilityChange);
    
        return () => {
          window.removeEventListener("storage", handleStorageChange);
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }, [localStorageKey]);


    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon
    const [currentStep, setCurrentStep] = useState(1);

        const accounts = martID.shopID.shopData.shopAccounts

        let emailList = []

    emailList = accounts.map(item => item.email.toUpperCase().trim());
    
    const shopName = martID.shopID.name
    const navlogo = martID.shopID.shopData.shopDetails.imageData.icons.logo

    const design = martID.shopID.shopData.shopDesigns
    const colormode = martID.shopID.shopData.shopDesigns.defaultMode

    const [total, setTotal] = useState(0)
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

    const progress1Class = `${total >= 0 ? "progress-button round-borderer round-borderer-extra progress-animation" : "progress-button round-borderer"}`
    const progress2Class = `${total >= 1 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`
    const progress3Class = `${total >= 2 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`
    const progress4Class = `${total >= 3 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`

    async function hashString(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }

    useEffect(() => {
        const progress2Element = document.getElementById("prog2");
        if (progress2Element) {
            if (total >= 1) {
              progress2Element.classList.add("progress-animation");
            } else {
              progress2Element.classList.remove("progress-animation");
            }
          }

          const progress3Element = document.getElementById("prog3");
          if (progress3Element) {
              if (total >= 2) {
                progress3Element.classList.add("progress-animation");
              } else {
                progress3Element.classList.remove("progress-animation");
              }
            }

            const progress4Element = document.getElementById("prog4");
            if (progress4Element) {
                if (total >= 3) {
                  progress4Element.classList.add("progress-animation");
                } else {
                  progress4Element.classList.remove("progress-animation");
                }
              }

      }, [total]);

    const genderOptions = [
        "Select", "Male", "Female", "Other"
    ];

    const [selectGender, setSelectGender] = useState("Select");

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

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
        setTotal(total - 1);
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
        existing: false,
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
    const [selectedOccupation, setSelectedOccupation] = useState("Select Occupation");
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

    const [cardValidity, setCardValidity] = useState({
        name: true,
        number: true,
        mm: true,
        yy: true,
        cvv: true,
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
    const [bdayValid, setbdayValid] = useState(true)


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

    const accountValidate = async (event) => {

        let emailValid = true
        let passValid = true
        let repeatValid = true
        let emailExist = false

        emailValid = email.trim() !== ""
        passValid = password.trim() !== ""
        repeatValid = repeat === password
        emailExist = emailList.includes(email.toUpperCase());

        if (emailExist) {
            emailValid = false
        }

        setSignValidity({
            email: emailValid,
            pass: passValid,
            repeat: repeatValid,
            existing: emailExist
        })

        const submissionValid = emailValid && passValid && repeatValid && !emailExist

        if (submissionValid) {
            if (total <= 1) { setTotal(1) }
            handleNextStep()
        } else {
            setTotal(0)
        }

    };

    const detailValidate = async (event) => {

        let fnameValid = true
        let lnameValid = true
        let phoneValid = true
        setbdayValid(true)
        let genderValid = true
        let occupationValid = true
        let otherValid = true
        let companyValid = true

        fnameValid = fname.trim() !== ""
        lnameValid = lname.trim() !== ""
        phoneValid = phone.trim() !== ""

        if (bday === "") {
            setbdayValid(false)
        } else { setbdayValid(true) }

        if (bdayValid === true) {
            if (isNaN(bday.$D)) {
                setbdayValid(false)
            }
        }

        if (bdayValid === false) {
            if (isNaN(bday.$D)) {
                setbdayValid(false)
            }
        }

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

        if (submissionValid) {
            if (total <= 2) { setTotal(2) }
            handleNextStep()
        } else {
            setTotal(1)
        }
    };

    function locationValidate() {
        if (locationName.length > 0) {
            if (total <= 3) { setTotal(3) }
            handleNextStep()
        } else {
            setTotal(2)
        }
    }

    const cardValidate = async (event) => {

        let nameValid = true
        let numValid = true
        let mmvalid = true
        let yyvalid = true
        let cvvalid = true

        nameValid = cardname.trim() !== ""
        numValid = cardnum.trim() !== ""
        mmvalid = cardmonth.length === 2
        yyvalid = cardyear.length === 2
        cvvalid = cvv.length === 3

        setCardValidity({
            name: nameValid,
            number: numValid,
            mm: mmvalid,
            yy: yyvalid,
            cvv: cvvalid,
        })

        const submissionValid = nameValid && numValid && mmvalid && yyvalid && cvvalid

        if (submissionValid) {
            setLoading(true)
            finishSignup()
            await waitSeconds();
            setLoading(false)
            setCompletion(true)
            router.push(`/${id}`).then(() => window.location.reload())
        }

    };

    const emailClasses = `${signValidity.email ? "text-small input-number" : "invalid-form-2 z"}`;
    const passClasses = `${signValidity.pass ? "text-small input-number" : "invalid-form-2 z"}`;
    const repeatClasses = `${signValidity.repeat ? "text-small input-number" : "invalid-form-2 z"}`;

    const fnameClasses = `${detailValidity.fname ? "text-small input-number" : "invalid-form-2 z"}`;
    const lnameClasses = `${detailValidity.lname ? "text-small input-number" : "invalid-form-2 z"}`;
    const phoneClasses = `${detailValidity.phone ? "text-small input-number" : "invalid-form-2 z"}`;
    const genderClasses = `${detailValidity.gender ? "text-options text-span" : "text-options text-span invalid-dropdown"}`
    const occupationDropdownClasses = `${detailValidity.occupation ? "text-options text-span" : "text-options text-span invalid-dropdown"}`
    const otherClasses = `${detailValidity.other ? "text-small input-number" : "invalid-form-2 z"}`;
    const companyClasses = `${detailValidity.company ? "text-small input-number" : "invalid-form-2 z"}`;

    const cardnameClasses = `${cardValidity.name ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardnumClasses = `${cardValidity.number ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardmonthClasses = `${cardValidity.mm ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardyearClasses = `${cardValidity.yy ? "text-small input-number" : "invalid-form-2 z"}`;
    const cvvClasses = `${cardValidity.cvv ? "text-small input-number" : "invalid-form-2 z"}`;

    async function completeForm(formdata) {
        const response = await fetch(
          `../../../api/set-profiles?martid=${router.query.shopid}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
          }
        );
        const data = await response.json();
    
      }

    async function finishSignup() {
        const currentDate = new Date();
        const hashedPassword = await hashString(password);
        // const hashedCard = await hashString(cardnum)
        // const hashedMonth = await hashString(cardmonth)
        // const hashedYear = await hashString(cardyear)
        const hashedCVV = await hashString(cvv)

        const incomingData = {
                email: email,
                password: hashedPassword,
                creationDate: currentDate,
                preferredColor: defaultColor,
                ignore: false,
                profile: {first: fname, last: lname, pnum: phone, birth: bday, gender: selectGender, job: selectedOccupation, company: company},
                location: locationName,
                card: {name: cardname, number: cardnum, month: cardmonth, year: cardyear, cvv: hashedCVV},
                currentCart:[...parsedData],
                pastOrders:[],
                currentOrders:[],
                totalBuys:0,
                totalSpent:0,
            }

            const authKey = `auth_${martID.shopID._id}`;
            const authData = {email: email, password: hashedPassword}
            localStorage.setItem(authKey, JSON.stringify(authData));
            localStorage.removeItem(localStorageKey);            
            
        completeForm(incomingData)
    }

    function backtrack(needed) {
        if (total >= needed) {
            setCurrentStep(needed + 1);
            setTotal(needed);
        }
    }

    return (
        <>
            <Head>
                <title>Sign-Up</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <div className="signup-progress round-borderer-extra">
                <div className="darken-progress">
                    <div className="total-progress" style={{ width: `${33.3 * total}%`, transition: "all 0.5s" }}></div>
                </div>
                <button className={progress1Class} onClick={() => { backtrack(0) }} id="prog1"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>1</h2></button>
                <button className={progress2Class} onClick={() => { backtrack(1) }} id="prog2"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>2</h2></button>
                <button className={progress3Class} onClick={() => { backtrack(2) }} id="prog3"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>3</h2></button>
                <button className={progress4Class} onClick={() => { backtrack(3) }} id="prog4"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>4</h2></button>

            </div>
            <div className="sign-up-container" style={{ transform: "translateY(-10%)" }}>

                        {currentStep === 1 && <AnimatePresence> <motion.div
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
                    ><div className="sign-step">
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
                                {signValidity.email && !signValidity.existing ? <h3 className="form-label">Email</h3> : signValidity.existing ? <h3 className="form-label inv z">Email is in use</h3> : <h3 className="form-label inv z">Input a valid email</h3>}

                            </div>
                            <div className="form-group" style={{ marginTop: "0.5rem" }}>
                                <input
                                    type="password"
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
                                    type="password"
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

                        </div>
                        </motion.div> </AnimatePresence>}

                        {currentStep === 2 && <AnimatePresence> <motion.div
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
                    <div className="sign-step">
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
                                    {detailValidity.fname ? <h3 className="form-label">First Name</h3> : <h3 className="form-label inv z">Invalid first name</h3>}
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={lnameClasses}
                                        placeholder="Last Name"
                                        autoComplete="off"
                                        style={{ width: "25rem", margin: "0" }}
                                        value={lname}
                                        onChange={handlelnameChange}
                                    ></input>
                                    {detailValidity.lname ? <h3 className="form-label">Last Name</h3> : <h3 className="form-label inv z">Invalid last name</h3>}
                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Phone Number"
                                        autoComplete="off"
                                        style={{ width: "17rem", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {detailValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPicker colormode={chosenMode} selectedDate={bday} handleDateChange={handlebdayChange} valid={bdayValid}></CustomizedPicker>
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <select
                                        value={selectGender}
                                        className={genderClasses}
                                        style={{ width: "14rem" }}
                                        onChange={(event) => handleSelectGender(event)}
                                    >
                                        {genderOptions.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                    {detailValidity.gender ? <h3 className="form-label">Gender</h3> : <h3 className="form-label inv z">Invalid gender</h3>}
                                </div>
                            </div>

                            <div className="flex-row">
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
                                    {detailValidity.occupation ? <h3 className="form-label">Occupation</h3> : <h3 className="form-label inv z">Invalid Occupation</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <input
                                        type="text"
                                        className={companyClasses}
                                        placeholder="Company Name"
                                        autoComplete="off"
                                        style={{ width: '30rem', margin: '0' }}
                                        value={company}
                                        onChange={handleCompanyChange}
                                    ></input>
                                    {detailValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid company name</h3>}
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{ width: "22rem" }}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={detailValidate}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                            </div>

                        </div>
                        </motion.div> </AnimatePresence>}

                        {currentStep === 3 && <AnimatePresence> <motion.div
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
                    > <div>
                            <div style={{ width: "50rem" }}>
                                <span className="page-heading" style={{ width: "100%", marginBottom: "1rem" }}>
                                    <div className="heading-icon-pin svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">&nbsp;Delivery Location Details</h1>
                                </span>
                                <h2 className="heading-tertiary">{locationName}</h2>
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
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={locationValidate}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                            </div>

                        </div>
                        </motion.div> </AnimatePresence>
                        }
                        {currentStep === 4 && <AnimatePresence> <motion.div
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
                     <div className="sign-step">
                            <span className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-credit svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Credit Card Details</h1>
                            </span>
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
                                {cardValidity.name ? <h3 className="form-label">Name on card</h3> : <h3 className="form-label inv z">Invalid card name</h3>}
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
                                {cardValidity.number ? <h3 className="form-label">Credit Card Number</h3> : <h3 className="form-label inv z">Invalid card number</h3>}
                            </div>

                            <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
                                <label className="heading-tertiary product-currency" style={{ width: "13rem" }}>Expiry Date:</label>
                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className={cardmonthClasses} placeholder="MM" autoComplete="off" value={cardmonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardmonth(newValue); } }}></input>
                                    {cardValidity.mm ? <h3 className="form-label">Month</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">/</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "8rem", margin: "0" }} type="number" className={cardyearClasses} placeholder="YY" autoComplete="off" value={cardyear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardyear(newValue); } }}></input>
                                    {cardValidity.yy ? <h3 className="form-label">Year</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">CVV:</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "12rem", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setcvv(newValue); } }}></input>
                                    {cardValidity.cvv ? <h3 className="form-label">&nbsp;</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{ width: "22rem" }}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                                <button className="product-action-2 flex-row-align sign-page-button" onClick={cardValidate} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? <div style={{transform:"translateY(20%)"}}>{checkmark}</div> : <h2 className="heading-secondary button-solid-text">Finish</h2>)}</button>
                            </div>

                        </div>
                        </motion.div> </AnimatePresence>}

                
            </div>

        </>
    );
}

export default SignUp

export { getServerSideProps }