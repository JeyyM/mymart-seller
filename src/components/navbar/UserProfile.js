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

const libraries = ['places'];
function UserProfile(props) {
  const router = useRouter()

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

  async function hashString(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
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
    cvv: true,
    location: true,
});

const handleSelectGender = (event, index) => {
    setSelectGender(event.target.value);
};

const [selectGender, setSelectGender] = useState("Select");

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

  const momentObject = moment(props.user.profile.birth);
  const dateObject = momentObject.toDate();
  
  const [bday, setBday] = useState(momentObject);
  const handleBdayChange = (date) => {
    setBday(moment(date)); 
  };

  const [company, setCompany] = useState("");
  const handleCompanyChange = (event) => {
      setCompany(event.target.value);
  };

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

console.log("ballz", props.user.profile.birth)

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

// function resetLoc() {
//     setCenter(footerItems.shopCoords)
// }

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

const emailClasses = `${signValidity.email ? "text-small input-number" : "invalid-form-2 z"}`;
const passClasses = `${signValidity.pass ? "text-small input-number" : "invalid-form-2 z"}`;
const repeatClasses = `${signValidity.repeat ? "text-small input-number" : "invalid-form-2 z"}`;

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
const cvvClasses = `${signValidity.cvv ? "text-small input-number" : "invalid-form-2 z"}`;

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
                                    onChange={handleEmailChange}
                                ></input>
                                {signValidity.email && !signValidity.existing ? <h3 className="form-label">Email</h3> : signValidity.existing ? <h3 className="form-label inv z">Email is in use</h3> : <h3 className="form-label inv z">Input a valid email</h3>}

                            </div>
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
                                <div className="form-group" style={{ marginTop: "1rem" }}>
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
                                        style={{ width: "10rem" }}
                                        onChange={(event) => handleSelectGender(event)}
                                    >
                                        {genderOptions.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                    {signValidity.gender ? <h3 className="form-label">Gender</h3> : <h3 className="form-label inv z">Invalid gender</h3>}
                                </div>
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
                            </div>
                        </div>


            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
                                            
}

export default UserProfile;
