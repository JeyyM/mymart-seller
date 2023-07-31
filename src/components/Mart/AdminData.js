import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomizedPicker from "./CustomizedPicker";

function AdminData(props) {
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

    const slide = {
        hidden: {
            x: "-100vw",
            opacity: 1,
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
            x: "-100vw",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    const [formInputValidity, setFormInputValidity] = useState({
        martName: true,
        // regEmail: true,
        desc: true,
        fname: true,
        lname: true,
        bday: true,
        gender: true,
        company: true,
        foundyear: true,
    });

    const data = props.data

    const [MartName, setMartName] = useState(props.name);
    const handleMartNameChange = (event) => {
        setMartName(event.target.value);
    };

    const [shopdesc, setshopdesc] = useState(props.description);
    const handleshopdesc = (event) => {
        setshopdesc(event.target.value);
    };

    const [foundyear, setfoundyear] = useState("");
    const handlefoundyear = (date) => {
        setfoundyear(date);
    };

    const [company, setCompany] = useState(data.company);
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const [fname, setfname] = useState(data.adminFirst);
    const handlefnameChange = (event) => {
        setfname(event.target.value);
    };

    const [lname, setlname] = useState(data.adminLast);
    const handlelnameChange = (event) => {
        setlname(event.target.value);
    };

    const [email, setEmail] = useState(props.email);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [bday, setbday] = useState("");
    const handlebdayChange = (date) => {
        setbday(date);
    };

    const genderOptions = [
        "Select", "Male", "Female", "Other"
    ];

    const [selectGender, setSelectGender] = useState(data.adminGender);

    const handleSelectGender = (event, index) => {
        setSelectGender(event.target.value);
    };

    // const emailClasses = `${formInputValidity.regEmail ? "text-small input-number" : "invalid-form-2 z"}`;
    const emailClasses = "text-small input-number";
    const martNameClasses = `${formInputValidity.martName ? "text-small input-number" : "invalid-form-2 z"}`;
    const shopDescClasses = `${formInputValidity.desc ? "desc-text-area" : "invalid-form-box"}`;
    const companyClasses = `${formInputValidity.company ? "text-small input-number" : "invalid-form-2 z"}`;
    const fnameClasses = `${formInputValidity.fname ? "text-small input-number" : "invalid-form-2 z"}`;
    const lnameClasses = `${formInputValidity.lname ? "text-small input-number" : "invalid-form-2 z"}`;
    const genderClasses = `${formInputValidity.gender ? "text-options text-span" : "text-options text-span invalid-dropdown"}`

    const [bdayValid, setbdayValid] = useState(false)
    const [foundYearValid, setFoundYearValid] = useState(false)

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
    

    useEffect(() => {
        setMartName(props.name)
        setshopdesc(props.description)
        setfoundyear("")
        setCompany(data.company)
        setfname(data.adminFirst)
        setlname(data.adminLast)
        setEmail(props.email)
        setbday("")
        setSelectGender(data.adminGender)
    }, [props.modalStatus])

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2500));
      }

    const handleSubmit = async (event) => { 
        let martNameValid = true
        let shopDescValid = true
        let companyValid = true
        let fnameValid = true
        let lnameValid = true
        let genderValid = selectGender !== "Select"

        martNameValid = MartName.trim() !== ""
        shopDescValid = shopdesc.trim() !== ""
        companyValid = company.trim() !== ""
        fnameValid = fname.trim() !== ""
        lnameValid = lname.trim() !== ""

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

        if (foundyear === "") {
            setFoundYearValid(false)
        } else { setFoundYearValid(true) }

        if (foundYearValid === true) {
            if (isNaN(foundyear.$D)) {
                setFoundYearValid(false)
            }
        }

        if (foundYearValid === false) {
            if (isNaN(foundyear.$D)) {
                setFoundYearValid(false)
            }
        }

        const submissionValid = martNameValid && shopDescValid && companyValid && fnameValid && lnameValid && bdayValid && foundYearValid
    
        setFormInputValidity({
            martName: martNameValid,
            desc: shopDescValid,
            fname: fnameValid,
            lname: lnameValid,
            bday: bdayValid,
            gender: genderValid,
            company: companyValid,
            foundyear: foundYearValid,
        });
    
        const incomingData = {
            name: MartName,
            desc: shopdesc,
            admin: {
                adminFirst: fname,
                adminLast: lname,
                adminBirth: bday,
                adminGender: selectGender,
                company: company,
                foundYear: foundyear
            }
        }
    
        if (submissionValid) {
          setLoading(true)
            props.finish(incomingData)
    
          await waitSeconds();
          setLoading(false)
          setCompletion(true)
          router.reload()
        }
    
      };
    
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
                            style={{ margin: "auto", marginTop:"15rem" }}
                        >
                            <heading className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-settings svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Mart Settings</h1>
                            </heading>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                    <input
                                        type="text"
                                        className={martNameClasses}
                                        placeholder="Mart Name"
                                        autoComplete="off"
                                        style={{ margin: "0" }}
                                        value={MartName}
                                        onChange={handleMartNameChange}
                                    ></input>
                                    {formInputValidity.martName ? <h3 className="form-label">Mart Name</h3> : <h3 className="form-label inv z">Invalid name</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                    <input
                                        type="text"
                                        className={emailClasses}
                                        placeholder="Registered Email"
                                        autoComplete="off"
                                        style={{ margin: "0" }}
                                        value={email}
                                    // onChange={handleEmailChange}
                                    ></input>
                                    <h3 className="form-label">Email (Change Disabled)</h3>
                                </div>
                            </div>

                            <div className="form-group" style={{ width: "100%" }}>
                                <h2 className="heading-tertiary" style={{ margin: "0.5rem 0 -0.5rem", fontWeight: "900" }}>Mart Description</h2>
                                <textarea
                                    rows="3"
                                    className={shopDescClasses}
                                    placeholder="Mart Description"
                                    onChange={(event) => setshopdesc(event.target.value)}
                                    value={shopdesc}
                                    autoComplete="off"
                                ></textarea>
                                {formInputValidity.desc ? <h3 className="form-label">This will be shown in the search results of your mart.</h3> : <h3 className="form-label inv z">Invalid description</h3>}
                            </div>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                    <input
                                        type="text"
                                        className={fnameClasses}
                                        placeholder="First Name"
                                        autoComplete="off"
                                        style={{ margin: "0" }}
                                        value={fname}
                                        onChange={handlefnameChange}
                                    ></input>
                                    {formInputValidity.fname ? <h3 className="form-label">First Name</h3> : <h3 className="form-label inv z">Invalid name</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                    <input
                                        type="text"
                                        className={lnameClasses}
                                        placeholder="Last Name"
                                        autoComplete="off"
                                        style={{ margin: "0" }}
                                        value={lname}
                                    onChange={handlelnameChange}
                                    ></input>
                                    {formInputValidity.lname ? <h3 className="form-label">Last Name</h3> : <h3 className="form-label inv z">Invalid name</h3>}
                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPicker selectedDate={bday} handleDateChange={handlebdayChange} valid={bdayValid} title={"Birthday"} colormode={props.chosenMode} ></CustomizedPicker>
                                </div>
                            </div>

                            <div className="flex-row">
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
                                    {formInputValidity.gender ? <h3 className="form-label">Gender</h3> : <h3 className="form-label inv z">Invalid gender</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem", width: "100%" }}>
                                    <input
                                        type="text"
                                        className={companyClasses}
                                        placeholder="Company Name"
                                        autoComplete="off"
                                        style={{ margin: "0" }}
                                        value={company}
                                        onChange={handleCompanyChange}
                                    ></input>
                                    {formInputValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid name</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPicker selectedDate={foundyear} handleDateChange={handlefoundyear} valid={foundYearValid} title={"Foundation Year"} colormode={props.chosenMode} ></CustomizedPicker>
                                </div>
                            </div>

                            <div className="add-categ-buttons">
                  <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable} disabled={loading}>Cancel</button>
                  <button className="product-action-2 heading-secondary categ-button-2" type="submit" onClick={handleSubmit} disabled={loading}> {loading ? <div className="spinner"></div> : (completion ? checkmark : "Submit")}</button>
                </div>

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default AdminData;
