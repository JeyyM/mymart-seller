import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../_app"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
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
        "Male", "Female", "Other"
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

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const occupationOptions = [
        'Engineer',
        'Doctor',
        'Teacher',
        // Add more occupations as needed
    ];

    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [customOccupation, setCustomOccupation] = useState('');

    const handleOccupationChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'other') {
            setIsOtherSelected(true);
            setSelectedOccupation('');
        } else {
            setIsOtherSelected(false);
            setSelectedOccupation(selectedValue);
        }
    };

    const handleCustomOccupationChange = (event) => {
        setCustomOccupation(event.target.value);
    };

    const footerItems = martID.shopID.shopData.shopDetails.footerData

  const mapContainerStyle = { width: '100%', height: '100%' };

  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState(footerItems.shopLocation);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries,
  });

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



    const Step1 = () => {
        return (
            <div className="sign-step">
                <img className="company-logo-med" src={navlogo} style={{ margin: "0", marginBottom: "1rem", display: "inline" }}></img>
                <h2 className="heading-secondary">Sign up to {shopName}</h2>

                <div className="form-group" style={{ marginTop: "1rem" }}>
                    <input
                        type="text"
                        className="text-small input-number"
                        placeholder="Email"
                        autoComplete="off"
                        style={{ width: "100%" }}
                    ></input>
                    <label className="form-label">Email</label>
                </div>
                <div className="form-group" style={{ marginTop: "0.5rem" }}>
                    <input
                        type="text"
                        className="text-small input-number"
                        placeholder="Password"
                        autoComplete="off"
                        style={{ margin: "0", width: "100%" }}
                    ></input>
                    <label className="form-label">Password</label>
                    <button className="product-action-2 flex-row-align sign-page-button" onClick={handleNextStep}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                </div>
                <a className="heading-tertiary" style={{ margin: "1rem auto" }} href="#">Log-in instead?</a>

            </div>
        );
    };

    const Step2 = () => {
        return (
            <div className="sign-step">
            <h2 className="heading-secondary">Register Details</h2>
                <div className="flex-row">
                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        <input
                            type="text"
                            className="text-small input-number"
                            placeholder="First Name"
                            autoComplete="off"
                            style={{ width: "25rem", margin: "0" }}
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
                        ></input>
                        <label className="form-label">Phone Number</label>
                    </div>

                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        <CustomizedPicker colormode={chosenMode}></CustomizedPicker>
                    </div>
                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        <select
                            value={selectGender}
                            className={`text-options text-span`}
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
                                onBlur={() => setIsOtherSelected(false)}
                                placeholder="Enter your occupation"
                                style={{ width: '22rem', margin: "0" }}
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
                            style={{ width: "30rem", margin: "0" }}
                        ></input>
                        <label className="form-label">Company Name</label>
                    </div>
                </div>

                <div className="flex-row" style={{marginTop:"1rem", gap:"2rem"}}>
                    <button className="product-action-1 flex-row-align sign-page-button" onClick={handlePreviousStep} style={{width:"22rem"}}><h2 className="heading-secondary button-solid-text">Previous</h2></button>
                    <button className="product-action-2 flex-row-align sign-page-button" onClick={handleNextStep}><h2 className="heading-secondary button-solid-text">Next</h2></button>
                </div>

            </div>
        );
    };

    const Step3 = () => {
        return (
            <div className="sign-step">
            <h2 className="heading-secondary">Location Details</h2>

            <h2 className="heading-tertiary">{locationName}</h2>

            </div>
        );
    };

    return (
        <>
            <Head>
                <title>Sign-Up</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <div className="sign-up-container" style={{ transform: "translateY(-10%)" }}>
                <AnimatePresence mode="wait">
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
                        {currentStep === 1 && <Step1 />}
                        {currentStep === 2 && <Step2 />}
                        {currentStep === 3 && <div>

  <h2 className="heading-tertiary">{locationName}</h2>

  <div style={{ height: "calc(100% - 16rem)" }}>
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
</div>

}
                    </motion.div>
                </AnimatePresence>

                <div className="button-container">
                    {currentStep > 1 && (
                        <button onClick={handlePreviousStep}>Previous</button>
                    )}
                    {currentStep < 3 && (
                        <button onClick={handleNextStep}>Next</button>
                    )}
                </div>
            </div>
            
        </>
    );
}

export default SignUp

export { getServerSideProps }