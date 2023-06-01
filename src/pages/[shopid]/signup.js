import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../_app"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import CustomizedPicker from "@/components/Mart/CustomizedPicker"


function SignUp(martID) {
    const id = martID.shopID._id
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon
    const [currentStep, setCurrentStep] = useState(1);
    const shopName = martID.shopID.name
    const navlogo = martID.shopID.shopData.shopDetails.imageData.icons.logo

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
        console.log(currentStep)
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
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
                    <button className="product-action-2 flex-row-align sign-page-button" onClick={handleNextStep}><h2 className="heading-secondary body-color">Next</h2></button>
                </div>
                <a className="heading-tertiary" style={{ margin: "1rem auto" }} href="#">Log-in instead?</a>

            </div>
        );
    };

    const Step2 = () => {
        return (
            <div className="sign-step">
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
                            placeholder="Phone #"
                            autoComplete="off"
                            style={{ width: "15rem", margin: "0" }}
                        ></input>
                        <label className="form-label">Phone #</label>
                    </div>
                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        <input
                            type="text"
                            className="text-small input-number"
                            placeholder="MM/DD/YYYY"
                            autoComplete="off"
                            style={{ width: "15rem", margin: "0" }}
                        ></input>
                        <label className="form-label">BirthDay</label>
                    </div>
                    <div className="form-group" style={{ marginTop: "1rem" }}>
                        {/* <input
                            type="text"
                            className="text-small input-number"
                            placeholder="Last Name"
                            autoComplete="off"
                            style={{ width: "15rem", margin: "0" }}
                        ></input>
                        <label className="form-label">Last Name</label> */}
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                        </LocalizationProvider> */}

                        <CustomizedPicker colormode={true}></CustomizedPicker>
                    </div>



                </div>


            </div>
        );
    };

    const Step3 = () => {
        return (
            <div className="sign-step">
                <h2>Step 3: Location Details</h2>
                {/* Add form fields for location details */}
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
                        {currentStep === 3 && <Step3 />}
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