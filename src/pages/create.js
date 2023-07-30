import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "./_app"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import CustomizedPickerBase from "@/components/Mart/CustomizedPickerBase"

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { useRouter } from "next/router"
import sha256 from 'crypto-js/sha256';

import Acc1 from "@/components/design/Acc1";
import Acc2 from "@/components/design/Acc3";
import Acc3 from "@/components/design/Acc2";
import ThemePack from "@/components/design/ThemePack"
import FontOptions from "@/components/design/FontOptions"
import Preview from "@/components/design/Preview";
import Palette from "@/components/design/Palette";

import { ChromePicker } from "react-color";
import chroma from 'chroma-js';
import tinycolor from 'tinycolor2';


const libraries = ['places'];

function CreateMart() {

    // if (typeof window !== "undefined"){
    //     alert("This is the mart creation process. This is just for showing of the signup process, no new mart will be created. Sign on to MyMartAdmin with the accounts a@a.com, b@b.com, and c@c.com all of which have the password: 123. A new mart won't be made to avoid bloating my database. Thank you for your understanding.")
    // }

    const router = useRouter()
    // const id = martID.shopID._id
    // const localStorageKey = `mart_${martID.shopID._id}`;
    // const defaultColor = martID.shopID.shopData.shopDesigns.defaultMode

    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
          const newScreenWidth = window.innerWidth;
          setScreenWidth(newScreenWidth);
        };
    
        handleResize()
    
        if (typeof window !== 'undefined') {
          setScreenWidth(window.innerWidth);
          window.addEventListener('resize', handleResize);
        }
    
        return () => {
          if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
          }
        };
      }, []);

    const [currentStep, setCurrentStep] = useState(1);

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
    const progress5Class = `${total >= 4 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`
    const progress6Class = `${total >= 5 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`
    const progress7Class = `${total >= 6 ? "progress-button round-borderer round-borderer-extra" : "progress-button round-borderer"}`

    async function hashString(data) {
        const hashHex = sha256(data).toString();
        return hashHex;
    }

    function startsImgur(word) {
        return word.slice(0, 20) === "https://i.imgur.com/";
    }

    function isHexCode(text) {
        const hexRegex = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
        return hexRegex.test(text);
    }

    const [chromaItems, setChroma] = useState([])

    useEffect(() => { fetchChroma() }, [])
  
    const fetchChroma = () => {
      const baseColor1 = chroma.random();
      const colorScale1 = chroma.scale([baseColor1, "white"]);
      const colorTheme1 = colorScale1.colors(4);
  
      const baseColor3 = chroma.random();
      const colorScale2 = chroma.scale([baseColor3, "black"]);
      const colorTheme2 = colorScale2.colors(4);
  
      const colors = [];
      for (let i = 0; i < 8; i++) {
        colors.push(chroma.random());
      }
  
      const finalSet = colorTheme1.concat(colorTheme2, colors);
      setChroma(finalSet)
    }

    const [color, setColor] = useState("#ffffff")

    function copyHex(event) {
        event.target.select();
        document.execCommand('copy');
          }

          function copyItem(color) {
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

        const progress5Element = document.getElementById("prog5");
        if (progress5Element) {
            if (total >= 4) {
                progress5Element.classList.add("progress-animation");
            } else {
                progress5Element.classList.remove("progress-animation");
            }
        }


        const progress6Element = document.getElementById("prog6");
        if (progress6Element) {
            if (total >= 5) {
                progress6Element.classList.add("progress-animation");
            } else {
                progress6Element.classList.remove("progress-animation");
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

    const [MartName, setMartName] = useState("");
    const handleMartNameChange = (event) => {
        setMartName(event.target.value);
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
        name: true,
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

    const [semail, setSemail] = useState("");
    const handleSemailChange = (event) => {
        setSemail(event.target.value);
    };

    const [bday, setbday] = useState("");
    const handlebdayChange = (date) => {
        setbday(date);
    };

    const [shopValidity, setshopValidity] = useState({
        shopimg: true,
        shopicon: true,
        desc: true,
        company: true,
        year: true,
    });

    const [shopimg, setshopimg] = useState("");
    const handleshopimgChange = (event) => {
        setshopimg(event.target.value);
    };

    const [shopicon, setshopicon] = useState("");
    const handleshopiconChange = (event) => {
        setshopicon(event.target.value);
    };

    const [shopdesc, setshopdesc] = useState("");
    const handleshopdesc = (event) => {
        setshopdesc(event.target.value);
    };

    const [foundyear, setfoundyear] = useState("");
    const handlefoundyear = (date) => {
        setfoundyear(date);
    };

    const [company, setCompany] = useState("");
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    };

    const [foundYearValid, setFoundYearValid] = useState(true)

    const [detailValidity, setDetailValidity] = useState({
        fname: true,
        lname: true,
        semail: true,
        phone: true,
        bday: true,
        gender: true,
    });

    const [cardValidity, setCardValidity] = useState({
        name: true,
        number: true,
        mm: true,
        yy: true,
        cvv: true,
    });

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

    const [formInputValidity, setFormInputValidity] = useState({
        mainDark: true,
        mainLight: true,
        bgBody: true,
        bgItem: true,
        borderTL: true,
        borderTR: true,
        borderBL: true,
        borderBR: true,
        outlineDark: true,
        outlineLight: true,
        outlineFont: true,
        solidDark: true,
        solidLight: true,
        solidFont: true,
        primaryColor: true,
        secondaryColor: true,
        tertiaryColor: true,
    });

    const darkClasses = `${formInputValidity.mainDark ? "text-small input-number" : "invalid-form-2 z"}`;
    const lightClasses = `${formInputValidity.mainLight ? "text-small input-number" : "invalid-form-2 z"}`;
    const bodyClasses = `${formInputValidity.bgBody ? "text-small input-number" : "invalid-form-2 z"}`;
    const itemClasses = `${formInputValidity.bgItem ? "text-small input-number" : "invalid-form-2 z"}`;
    const TLClasses = `${formInputValidity.borderTL ? "text-small input-number" : "invalid-form-2 z"}`;
    const TRClasses = `${formInputValidity.borderTR ? "text-small input-number" : "invalid-form-2 z"}`;
    const BLClasses = `${formInputValidity.borderBL ? "text-small input-number" : "invalid-form-2 z"}`;
    const BRClasses = `${formInputValidity.borderBR ? "text-small input-number" : "invalid-form-2 z"}`;
    const outlineDarkClasses = `${formInputValidity.outlineDark ? "text-small input-number" : "invalid-form-2 z"}`;
    const outlineLightClasses = `${formInputValidity.outlineLight ? "text-small input-number" : "invalid-form-2 z"}`;
    const outlineFontClasses = `${formInputValidity.outlineFont ? "text-small input-number" : "invalid-form-2 z"}`;
    const solidDarkClasses = `${formInputValidity.solidDark ? "text-small input-number" : "invalid-form-2 z"}`;
    const solidLightClasses = `${formInputValidity.solidLight ? "text-small input-number" : "invalid-form-2 z"}`;
    const solidFontClasses = `${formInputValidity.solidFont ? "text-small input-number" : "invalid-form-2 z"}`;
    const primaryColorClasses = `${formInputValidity.primaryColor ? "text-small input-number" : "invalid-form-2 z"}`;
    const secondaryColorClasses = `${formInputValidity.secondaryColor ? "text-small input-number" : "invalid-form-2 z"}`;
    const tertiaryColorClasses = `${formInputValidity.tertiaryColor ? "text-small input-number" : "invalid-form-2 z"}`;

    function handleFocus(event) {
        event.target.select();
    }

    const themeSetxz1 = [ "#004DFF", "#3974FF", 10, 10, 10, 10, "Cool Blue"]

    const [LightColor, setLightColor] = useState("#7FC9FF");
    const handleLightColorChange = (event) => {
        setLightColor(event.target.value);
    };

    const [DarkColor, setDarkColor] = useState("#0057FF");
    const handleDarkColorChange = (event) => {
        setDarkColor(event.target.value);
    };

    const [bgBody, setBgBody] = useState("#E7F6FD");
    const handleBgBody = (event) => {
        setBgBody(event.target.value);
    };

    const [bgItem, setBgItem] = useState("#FFFFFF");
    const handleBgItem = (event) => {
        setBgItem(event.target.value);
    };

    const [textPrimary, setTextPrimary] = useState("#0A2647");
    const handleTextPrimary = (event) => {
        setTextPrimary(event.target.value);
    };
    const [textPrimaryFont, setTextPrimaryFont] = useState("Roboto");
    const handleTextPrimaryFont = (event) => {
        setTextPrimaryFont(event.target.value);
    };

    const [textSecondary, setTextSecondary] = useState("#003F76");
    const handleTextSecondary = (event) => {
        setTextSecondary(event.target.value);
    };
    const [textSecondaryFont, setTextSecondaryFont] = useState("Roboto");
    const handleTextSecondaryFont = (event) => {
        setTextSecondaryFont(event.target.value);
    };

    const [textTertiary, setTextTertiary] = useState("#003F76");
    const handleTextTertiary = (event) => {
        setTextTertiary(event.target.value);
    };
    const [textTertiaryFont, setTextTertiaryFont] = useState("Roboto");
    const handleTextTertiaryFont = (event) => {
        setTextTertiaryFont(event.target.value);
    };

    const [borderTL, setBorderTL] = useState(10)
    const handleBorderTL = (event) => {
        setBorderTL(event.target.value);
    };
    const [borderTR, setBorderTR] = useState(10)
    const handleBorderTR = (event) => {
        setBorderTR(event.target.value);
    };
    const [borderBL, setBorderBL] = useState(10)
    const handleBorderBL = (event) => {
        setBorderBL(event.target.value);
    };
    const [borderBR, setBorderBR] = useState(10)
    const handleBorderBR = (event) => {
        setBorderBR(event.target.value);
    };


    const [outlineDark, setOutlineDark] = useState("#004DFF")
    const handleOutlineDark = (event) => {
        setOutlineDark(event.target.value);
    };
    const [outlineLight, setOutlineLight] = useState("#3974FF")
    const handleOutlineLight = (event) => {
        setOutlineLight(event.target.value);
    };
    const [outlineText, setOutlineText] = useState("#003F76")
    const handleOutlineText = (event) => {
        setOutlineText(event.target.value);
    };

    const [solidDark, setSolidDark] = useState("#004DFF")
    const handleSolidDark = (event) => {
        setSolidDark(event.target.value);
    };
    const [solidLight, setSolidLight] = useState("#3974FF")
    const handleSolidLight = (event) => {
        setSolidLight(event.target.value);
    };
    const [solidText, setSolidText] = useState("#FFFFFF")
    const handleSolidText = (event) => {
        setSolidText(event.target.value);
    };

    const [primaryAcc, setPrimaryAcc] = useState(false)
    const handlePrimaryAcc = () => {
        setPrimaryAcc(!primaryAcc)
    }

    const [secondaryAcc, setSecondaryAcc] = useState(false)
    const handleSecondaryAcc = () => {
        setSecondaryAcc(!secondaryAcc)
    }

    const [tertiaryAcc, setTertiaryAcc] = useState(false)
    const handleTertiaryAcc = () => {
        setTertiaryAcc(!tertiaryAcc)
    }

    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);

    const [primaryContrast, setPrimaryContrast] = useState(0)
    const [secondaryContrast, setSecondaryContrast] = useState(0)
    const [tertiaryContrast, setTertiaryContrast] = useState(0)

    const [primaryContrastBg, setPrimaryContrastBg] = useState({ background: "#C9F4AA" })
    const [secondaryContrastBg, setSecondaryContrastBg] = useState({ background: "#C9F4AA" })
    const [tertiaryContrastBg, setTertiaryContrastBg] = useState({ background: "#C9F4AA" })

    const [primaryContrastText, setPrimaryContrastText] = useState("heading-tertiary green")
    const [secondaryContrastText, setSecondaryContrastText] = useState("heading-tertiary green")
    const [tertiaryContrastText, setTertiaryContrastText] = useState("heading-tertiary green")

    
  useEffect(() => {
    const contrastRatioPrimary = tinycolor.readability(bgBody, textPrimary);
    setPrimaryContrast(contrastRatioPrimary.toFixed(2))

  }, [bgBody, textPrimary])

  useEffect(() => {
    if (primaryContrast >= 7) { setPrimaryContrastBg({ background: "#C9F4AA" }) }
    else if (7 > primaryContrast && primaryContrast >= 4.5) { setPrimaryContrastBg({ background: "#FFD966" }) }
    else if (primaryContrast < 4.5) { setPrimaryContrastBg({ background: "#D27685" }) }

    if (primaryContrast >= 7) { setPrimaryContrastText("heading-tertiary green") }
    else if (7 > primaryContrast && primaryContrast >= 4.5) { setPrimaryContrastText("heading-tertiary yellow") }
    else if (primaryContrast < 4.5) { setPrimaryContrastText("heading-tertiary red") }

  }, [primaryContrast])


  useEffect(() => {
    const contrastRatioSecondary = tinycolor.readability(bgItem, textSecondary);
    setSecondaryContrast(contrastRatioSecondary.toFixed(2))
  }, [bgItem, textSecondary])

  useEffect(() => {
    if (secondaryContrast >= 7) { setSecondaryContrastBg({ background: "#C9F4AA" }) }
    else if (7 > secondaryContrast && secondaryContrast >= 4.5) { setSecondaryContrastBg({ background: "#FFD966" }) }
    else if (secondaryContrast < 4.5) { setSecondaryContrastBg({ background: "#D27685" }) }

    if (secondaryContrast >= 7) { setSecondaryContrastText("heading-tertiary green") }
    else if (7 > secondaryContrast && secondaryContrast >= 4.5) { setSecondaryContrastText("heading-tertiary yellow") }
    else if (secondaryContrast < 4.5) { setSecondaryContrastText("heading-tertiary red") }

  }, [secondaryContrast])


  useEffect(() => {
    const contrastRatioTertiary = tinycolor.readability(bgItem, textTertiary);
    setTertiaryContrast(contrastRatioTertiary.toFixed(2))
  }, [bgItem, textTertiary])

  useEffect(() => {
    if (tertiaryContrast >= 7) { setTertiaryContrastBg({ background: "#C9F4AA" }) }
    else if (7 > tertiaryContrast && tertiaryContrast >= 4.5) { setTertiaryContrastBg({ background: "#FFD966" }) }
    else if (tertiaryContrast < 4.5) { setTertiaryContrastBg({ background: "#D27685" }) }

    if (tertiaryContrast >= 7) { setTertiaryContrastText("heading-tertiary green") }
    else if (7 > tertiaryContrast && tertiaryContrast >= 4.5) { setTertiaryContrastText("heading-tertiary yellow") }
    else if (tertiaryContrast < 4.5) { setTertiaryContrastText("heading-tertiary red") }

  }, [tertiaryContrast])


    const [DesignPreview, setDesignPreview] = useState(false)
    const handleDesignPreview = () => {
        setDesignPreview(!DesignPreview)
    }

    const [PalettePreview, setPalettePreview] = useState(false)
    const handlePalettePreview = () => {
        setPalettePreview(!PalettePreview)
    }

    const [EditActive, setEditActive] = useState(false);

    const originalEdit = {
        margin: "1rem",
        backgroundImage: `linear-gradient(${bgItem}, ${bgItem}), linear-gradient(${LightColor}, ${DarkColor})`,
    };

    const activeEdit = {
        filter: "brightness(120%)",
        boxShadow: `inset 0 0 0 10px ${bgItem}, 0 0 0 2px ${DarkColor}, 0 0 0 4px ${bgItem}`,
    };

    const editFinal = EditActive ? { ...originalEdit, ...activeEdit } : originalEdit;

    async function designValidate(event) {
        event.preventDefault()

        const mainDarkValid = isHexCode(DarkColor)
        const mainLightValid = isHexCode(LightColor)
        const bgBodyValid = isHexCode(bgBody)
        const bgItemValid = isHexCode(bgItem)
        const TLValid = borderTL >= 0 && borderTL !== ""
        const TRValid = borderTR >= 0 && borderTR !== ""
        const BLValid = borderBL >= 0 && borderBL !== ""
        const BRValid = borderBR >= 0 && borderBR !== ""
        const outlineDarkValid = isHexCode(outlineDark)
        const outlineLightValid = isHexCode(outlineLight)
        const outlineFontValid = isHexCode(outlineText)
        const solidDarkValid = isHexCode(solidDark)
        const solidLightValid = isHexCode(solidLight)
        const solidFontValid = isHexCode(solidText)
        const primaryFontValid = textPrimaryFont !== ""
        const secondaryFontValid = textSecondaryFont !== ""
        const tertiaryFontValid = textTertiaryFont !== ""
        const primaryColValid = isHexCode(textPrimary)
        const secondaryColValid = isHexCode(textSecondary)
        const tertiaryColValid = isHexCode(textTertiary)

        setFormInputValidity({
            mainDark: mainDarkValid,
            mainLight: mainLightValid,
            bgBody: bgBodyValid,
            bgItem: bgItemValid,
            borderTL: TLValid,
            borderTR: TRValid,
            borderBL: BLValid,
            borderBR: BRValid,
            outlineDark: outlineDarkValid,
            outlineLight: outlineLightValid,
            outlineFont: outlineFontValid,
            solidDark: solidDarkValid,
            solidLight: solidLightValid,
            solidFont: solidFontValid,
            primaryFont: primaryFontValid,
            secondaryFont: secondaryFontValid,
            tertiaryFont: tertiaryFontValid,
            primaryColor: primaryColValid,
            secondaryColor: secondaryColValid,
            tertiaryColor: tertiaryColValid,
        })

        const submissionValid = mainDarkValid && mainLightValid && bgBodyValid && bgItemValid && TLValid && TRValid && BLValid && BRValid && outlineDarkValid && outlineLightValid && outlineFontValid && solidDarkValid && solidLightValid && solidFontValid && primaryFontValid && primaryColValid && secondaryFontValid && secondaryColValid && tertiaryColValid && tertiaryFontValid

        if (submissionValid) {
            if (total <= 5) { setTotal(5) }
            handleNextStep()
        } else {
            setTotal(4)
        }
    }

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

    useEffect(() => { setCenter() }, [])
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
        let nameValid = true
        let passValid = true
        let repeatValid = true
        // let emailExist = false

        emailValid = email.trim() !== ""
        nameValid = MartName.trim() !== ""
        passValid = password.trim() !== ""
        repeatValid = repeat === password
        // emailExist = emailList.includes(email.toUpperCase());

        // if (emailExist) {
        //     emailValid = false
        // }

        setSignValidity({
            email: emailValid,
            name: nameValid,
            pass: passValid,
            repeat: repeatValid,
            // existing: emailExist
        })

        // const submissionValid = emailValid && passValid && repeatValid && !emailExist
        const submissionValid = emailValid && nameValid && passValid && repeatValid


        if (submissionValid) {
            if (total <= 1) { setTotal(1) }
            handleNextStep()
        } else {
            setTotal(0)
        }

    };


    const shopValidate = async (event) => {

        let shopimgValid = true
        let shopiconValid = true
        let shopdescValid = true
        let companyValid = true
        setbdayValid(true)

        shopimgValid = startsImgur(shopimg)
        shopiconValid = startsImgur(shopicon)
        shopdescValid = shopdesc.trim() !== ""
        companyValid = company.trim() !== ""

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

        setshopValidity({
            shopimg: shopimgValid,
            shopicon: shopiconValid,
            desc: shopdescValid,
            company: companyValid,
            year: foundYearValid
        })

        const submissionValid = shopimgValid && shopiconValid && shopdescValid && companyValid && foundYearValid

        if (submissionValid) {
            if (total <= 2) { setTotal(2) }
            handleNextStep()
        } else {
            setTotal(1)
        }
    };

    const detailValidate = async (event) => {

        let fnameValid = true
        let lnameValid = true
        let phoneValid = true
        let emailValid = true
        let genderValid = true
        setbdayValid(true)

        fnameValid = fname.trim() !== ""
        lnameValid = lname.trim() !== ""
        phoneValid = phone.trim() !== ""
        emailValid = semail.trim() !== ""

        genderValid = selectGender !== "Select"

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

        setDetailValidity({
            fname: fnameValid,
            lname: lnameValid,
            phone: phoneValid,
            bday: bdayValid,
            semail: emailValid,
            gender: genderValid
        })

        const submissionValid = fnameValid && lnameValid && phoneValid && bdayValid && emailValid && genderValid

        if (submissionValid) {
            if (total <= 3) { setTotal(3) }
            handleNextStep()
        } else {
            setTotal(2)
        }
    };

    function locationValidate() {
        if (locationName.length > 0) {
            if (total <= 4) { setTotal(4) }
            handleNextStep()
        } else {
            setTotal(3)
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
            if (total <= 6) { setTotal(6) }
            handleNextStep()
        } else {
            setTotal(5)
        }

    };

    const emailClasses = `${signValidity.email ? "text-small input-number" : "invalid-form-2 z"}`;
    const martNameClasses = `${signValidity.name ? "text-small input-number" : "invalid-form-2 z"}`;
    const passClasses = `${signValidity.pass ? "text-small input-number" : "invalid-form-2 z"}`;
    const repeatClasses = `${signValidity.repeat ? "text-small input-number" : "invalid-form-2 z"}`;

    const shopimgClasses = `${shopValidity.shopimg ? "text-small input-number" : "invalid-form-2 z"}`;
    const shopiconClasses = `${shopValidity.shopicon ? "text-small input-number" : "invalid-form-2 z"}`;
    const shopDescClasses = `${shopValidity.desc ? "desc-text-area" : "invalid-form-box"}`;
    const companyClasses = `${shopValidity.company ? "text-small input-number" : "invalid-form-2 z"}`;

    const fnameClasses = `${detailValidity.fname ? "text-small input-number" : "invalid-form-2 z"}`;
    const lnameClasses = `${detailValidity.lname ? "text-small input-number" : "invalid-form-2 z"}`;
    const shopEmailClasses = `${detailValidity.semail ? "text-small input-number" : "invalid-form-2 z"}`;
    const phoneClasses = `${detailValidity.phone ? "text-small input-number" : "invalid-form-2 z"}`;
    const genderClasses = `${detailValidity.gender ? "text-options text-span" : "text-options text-span invalid-dropdown"}`

    const otherClasses = `${detailValidity.other ? "text-small input-number" : "invalid-form-2 z"}`;

    const cardnameClasses = `${cardValidity.name ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardnumClasses = `${cardValidity.number ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardmonthClasses = `${cardValidity.mm ? "text-small input-number" : "invalid-form-2 z"}`;
    const cardyearClasses = `${cardValidity.yy ? "text-small input-number" : "invalid-form-2 z"}`;
    const cvvClasses = `${cardValidity.cvv ? "text-small input-number" : "invalid-form-2 z"}`;

    async function completeForm(formdata) {
        const response = await fetch(
          `../../../api/create-mart`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
          }
        );
        const data = await response.json();
    }

    async function submitData(){
        await completeForm("test")
    }

    function backtrack(needed) {
        if (total >= needed) {
            setCurrentStep(needed + 1);
            setTotal(needed);
        }
    }

    const themeSet1 = ["#0057FF", "#7FC9FF", "#E7F6FD", "#FFFFFF", "#0A2647", "#003F76", "#004DFF", "#3974FF", 10, 10, 10, 10, "Cool Blue"]

    const themeSet2 = ["#263A29", "#41644A", "#E8D2A6", "#B3E5BE", "#3C2317", "#003700", "#367E18", "#BFDB38", 50, 10, 10, 50, "Forest Green"]

    const themeSet3 = ["#89375F", "#CE5959", "#BACDDB", "#F3E8FF", "#2A2F4F", "#4F4557", "#BA90C6", "#E8A0BF", 30, 30, 30, 30, "Floral Pink"]

    const themeSet4 = ["#A84448", "#F2CD5C", "#FFAFB2", "#FFF2CC", "#570000", "#570000", "#E74646", "#FFD93D", 0, 30, 30, 30, "Brick Red"]

    const setAllTheme = (payload) => {
        setDarkColor(payload[0])
        setLightColor(payload[1])
        setBgBody(payload[2])
        setBgItem(payload[3])
        setTextPrimary(payload[4])
        setTextSecondary(payload[5])
        setTextTertiary(payload[5])
        setOutlineDark(payload[6])
        setOutlineLight(payload[7])
        setSolidDark(payload[6])
        setSolidLight(payload[7])
        setBorderTL(payload[8])
        setBorderTR(payload[9])
        setBorderBL(payload[10])
        setBorderBR(payload[11])
        setSolidText(payload[5])
        setOutlineText(payload[5])
    }

    const hardReset = (payload) => {
        setDarkColor(payload[0])
        setLightColor(payload[1])
        setBgBody(payload[2])
        setBgItem(payload[3])
        setTextPrimary(payload[4])
        setTextSecondary(payload[5])
        setTextTertiary(payload[5])
        setOutlineDark(payload[6])
        setOutlineLight(payload[7])
        setSolidDark(payload[6])
        setSolidLight(payload[7])
        setBorderTL(payload[8])
        setBorderTR(payload[9])
        setBorderBL(payload[10])
        setBorderBR(payload[11])
        setSolidText(payload[5])
        setOutlineText(payload[5])
        setTextPrimaryFont("Roboto")
        setTextSecondaryFont("Roboto")
        setTextTertiaryFont("Roboto")
    }

    const today = new Date()

    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/\//g, '-');

        const formattedDateTime = `${formattedDate}`;

        return formattedDateTime;
    }

    return (
        <>
            <Head>
                <title>Create Mart</title>
                <link rel="icon" type="image/jpeg" href="/light.png" />
            </Head>

            <Preview modalStatus={DesignPreview} disable={handleDesignPreview} bgBody={bgBody}
                DarkColor={DarkColor} LightColor={LightColor} textPrimary={textPrimary}
                textPrimaryFont={textPrimaryFont} borderTL={borderTL} borderTR={borderTR}
                borderBL={borderBL} borderBR={borderBR} bgItem={bgItem} textSecondary={textSecondary}
                textSecondaryFont={textSecondaryFont} textTertiary={textTertiary} textTertiaryFont={textTertiaryFont}
                setIsClicked={setIsClicked} setIsClicked2={setIsClicked2} setIsClicked3={setIsClicked3}
                outlineDark={outlineDark} outlineLight={outlineLight} outlineText={outlineText} solidText={solidText} solidDark={solidDark}
                solidLight={solidLight} handlePrimaryAcc={handlePrimaryAcc} handleSecondaryAcc={handleSecondaryAcc}
                handleTertiaryAcc={handleTertiaryAcc} primaryContrast={primaryContrast} primaryContrastBg={primaryContrastBg}
                primaryContrastText={primaryContrastText} secondaryContrast={secondaryContrast} secondaryContrastBg={secondaryContrastBg}
                secondaryContrastText={secondaryContrastText} tertiaryContrast={tertiaryContrast} tertiaryContrastBg={tertiaryContrastBg}
                tertiaryContrastText={tertiaryContrastText} isClicked={isClicked} isClicked2={isClicked2} isClicked3={isClicked3} shopCurrency={"$"}
                editFinal={editFinal} setEditActive={setEditActive}
            ></Preview>

<Palette modalStatus={PalettePreview} disable={handlePalettePreview} color={color} setColor={setColor}
      copyHex={copyHex} fetchChroma={fetchChroma} copyItem={copyItem} chromaItems={chromaItems}
    ></Palette>

    <Acc1 disable={handlePrimaryAcc} modalStatus={primaryAcc} value={primaryContrast} color={primaryContrastText} bg={primaryContrastBg}></Acc1>
    <Acc2 disable={handleSecondaryAcc} modalStatus={secondaryAcc} value={secondaryContrast} color={secondaryContrastText} bg={secondaryContrastBg}></Acc2>
    <Acc3 disable={handleTertiaryAcc} modalStatus={tertiaryAcc} value={tertiaryContrast} color={tertiaryContrastText} bg={tertiaryContrastBg}></Acc3>

            <AnimatePresence>
                {currentStep >= 5 && <motion.div className="design-prev-set"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: { scale: 0 },
                        visible: { scale: 1 },
                        exit: { scale: 0 },
                    }}
                    transition={{ duration: 0.2 }}>
                    <AnimatePresence>
                    {currentStep === 5 && <motion.button className="product-action-1 design-prev-button" onClick={handlePalettePreview}
                                        initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: { scale: 0 },
                        visible: { scale: 1 },
                        exit: { scale: 0 },
                    }}
                    transition={{ duration: 0.2 }}>

                        <div className="palette-preview svg-outline margin-side">&nbsp;</div>
                    </motion.button>}
                    </AnimatePresence>

                    {<button className="product-action-1 design-prev-button" onClick={handleDesignPreview}>
                        <div className="eye-preview svg-outline margin-side">&nbsp;</div>
                    </button>}
                </motion.div>}
            </AnimatePresence>

            <div className="main-signup-container" style={{overflow:"hidden"}}>
                <div className="signup-progress round-borderer-extra">
                    <div className="darken-progress">
                        <div className="total-progress" style={{ width: `${16.67 * total}%`, transition: "all 0.5s" }}></div>
                    </div>
                    <button className={progress1Class} onClick={() => { backtrack(0) }} id="prog1"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>1</h2></button>
                    <button className={progress2Class} onClick={() => { backtrack(1) }} id="prog2"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>2</h2></button>
                    <button className={progress3Class} onClick={() => { backtrack(2) }} id="prog3"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>3</h2></button>
                    <button className={progress4Class} onClick={() => { backtrack(3) }} id="prog4"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>4</h2></button>
                    <button className={progress5Class} onClick={() => { backtrack(4) }} id="prog5"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>5</h2></button>
                    <button className={progress6Class} onClick={() => { backtrack(5) }} id="prog6"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>6</h2></button>
                    <button className={progress7Class} onClick={() => { backtrack(6) }} id="prog7"><h2 className="heading-tertiary" style={{ transform: "translateY(-0%)" }}>7</h2></button>
                </div>
                <div className="sign-up-container" style={{ transform: "translateY(-10%)" }}>

                    {currentStep === 1 && <AnimatePresence> <motion.div
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
                        style={{ width: "60rem", margin: "0 1.5rem" }}
                    ><div className="sign-step">
                            <img src="/light-2.png" className="mymart-pic" style={{ margin: "0", marginBottom: "1rem" }}></img>
                            <h2 className="heading-secondary" style={{ textAlign: "center" }}>Create Your Mart Today</h2>
                            <div className="sign-1-grid">
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
                                        className={martNameClasses}
                                        placeholder="Mart Name"
                                        autoComplete="off"
                                        style={{ width: "100%" }}
                                        value={MartName}
                                        onChange={handleMartNameChange}
                                    ></input>
                                    {signValidity.name ? <h3 className="form-label">Mart Name</h3> : <h3 className="form-label inv z">Input a valid mart name</h3>}

                                    {/* {signValidity.name && !signValidity.existing ? <h3 className="form-label">Email</h3> : signValidity.existing ? <h3 className="form-label inv z">Email is in use</h3> : <h3 className="form-label inv z">Input a valid email</h3>} */}

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
                                </div>
                            </div>
                            <button className="product-action-2 heading-secondary" type="button" style={{ margin: "1rem auto", width: `22rem`, height: "6rem", display: "block" }} onClick={accountValidate}>Next</button>
                        </div>
                    </motion.div> </AnimatePresence>}

                    {currentStep === 2 && <AnimatePresence> <motion.div
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
                        style={{ width: "60rem", margin: "0 1.5rem", marginTop: `${shopimg !== "" ? "7.5rem" : "0rem"}` }}
                    >
                        <div className="sign-step">
                            {shopimg !== "" && <img className="company-logo-med" src={shopimg} style={{ margin: "0", marginBottom: "1rem", display: "inline" }}></img>}

                            <heading className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-shop svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Shop Details (Imgur Links Only)</h1>
                            </heading>

                            <div className="flex-row">
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={shopimgClasses}
                                        placeholder="Mart Logo Image (Imgur Links Only)"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={shopimg}
                                        onChange={handleshopimgChange}
                                    ></input>
                                    {shopValidity.shopimg ? <h3 className="form-label">Logo Image</h3> : <h3 className="form-label inv z">Invalid image link</h3>}
                                </div>
                                {shopicon !== "" && <img src={shopicon} style={{ margin: "auto", height: "16px", width: "16px", objectFit: "cover" }}></img>}
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={shopiconClasses}
                                        placeholder="Mart Icon Image (Imgur Links Only)"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={shopicon}
                                        onChange={handleshopiconChange}
                                    ></input>
                                    {shopValidity.shopicon ? <h3 className="form-label">Icon Image</h3> : <h3 className="form-label inv z">Invalid image link</h3>}
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
                                {shopValidity.desc ? <h3 className="form-label">This will be shown in the search results of your mart.</h3> : <h3 className="form-label inv z">Invalid description</h3>}
                            </div>

                            <div className="flex-row">
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
                                    {shopValidity.company ? <h3 className="form-label">Company Name</h3> : <h3 className="form-label inv z">Invalid company name</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPickerBase selectedDate={foundyear} handleDateChange={handlefoundyear} valid={foundYearValid} title={"Foundation Year"}></CustomizedPickerBase>
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: `22rem`, height: "6rem", display: "block" }} onClick={shopValidate}>Next</button>
                            </div>
                        </div>

                    </motion.div> </AnimatePresence>}

                    {currentStep === 3 && <AnimatePresence> <motion.div
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
                        style={{ width: "60rem", margin:"1rem" }}
                    >
                        <div className="sign-step" style={{ height: "auto" }}>
                            <heading className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-profile svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Profile Details</h1>
                            </heading>
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
                                    {detailValidity.fname ? <h3 className="form-label">First Name</h3> : <h3 className="form-label inv z">Invalid first name</h3>}
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
                                    {detailValidity.lname ? <h3 className="form-label">Last Name</h3> : <h3 className="form-label inv z">Invalid last name</h3>}
                                </div>

                                {screenWidth > 400 && <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={shopEmailClasses}
                                        placeholder="Shop Email"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={semail}
                                        onChange={handleSemailChange}
                                    ></input>
                                    {detailValidity.semail ? <h3 className="form-label">Shop Email</h3> : <h3 className="form-label inv z">Invalid email</h3>}
                                </div>}
                            </div>

                            {screenWidth <= 400 && <div className="flex-row">
                            <div className="form-group">
                                    <input
                                        type="text"
                                        className={shopEmailClasses}
                                        placeholder="Shop Email"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={semail}
                                        onChange={handleSemailChange}
                                    ></input>
                                    {detailValidity.semail ? <h3 className="form-label">Shop Email</h3> : <h3 className="form-label inv z">Invalid email</h3>}
                                </div>

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Shop Phone"
                                        autoComplete="off"
                                        style={{ width: `${screenWidth > 450 ? "17rem" : "100%"}`, margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {detailValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>
                            </div>}

                            <div className="flex-row">
                                {screenWidth > 400 && <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <input
                                        type="text"
                                        className={phoneClasses}
                                        placeholder="Shop Phone"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></input>
                                    {detailValidity.phone ? <h3 className="form-label">Phone Number</h3> : <h3 className="form-label inv z">Invalid number</h3>}
                                </div>}

                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPickerBase selectedDate={bday} handleDateChange={handlebdayChange} valid={bdayValid} title={"Birthday"}></CustomizedPickerBase>

                                </div>
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <select
                                        value={selectGender}
                                        className={genderClasses}
                                        style={{ width: `${screenWidth > 400 ? "14rem" : "100%"}` }}
                                        onChange={(event) => handleSelectGender(event)}
                                    >
                                        {genderOptions.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                    {detailValidity.gender ? <h3 className="form-label">Gender</h3> : <h3 className="form-label inv z">Invalid gender</h3>}
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: `22rem`, height: "6rem", display: "block" }} onClick={detailValidate}>Next</button>
                            </div>

                        </div>
                    </motion.div> </AnimatePresence>}

                    {currentStep === 4 && <AnimatePresence> <motion.div
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
                        style={{ width: "50vw", marginTop: "2rem" }}
                    > <div>
                            <div>
                                <heading className="page-heading" style={{ width: "100%", marginBottom: "1rem" }}>
                                    <div className="heading-icon-pin svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">&nbsp;Mart Location</h1>
                                </heading>
                                <h2 className="heading-tertiary">{locationName}</h2>
                            </div>

                            <div style={{ height: "24rem", margin: "1rem auto", width: "100%" }}>
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
                            <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: "100%", height: "6rem", margin: "0" }} onClick={currentLoc}><h2 className="heading-secondary outline-button margin-side">Get Current Location</h2></button>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem", justifyContent:"space-around" }}>
                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                <button className="product-action-2 heading-secondary" type="button" style={{ marginLeft: "auto", width: `22rem`, height: "6rem", display: "block", margin: "0" }} onClick={locationValidate}>Next</button>
                            </div>

                        </div>
                    </motion.div> </AnimatePresence>
                    }

                    {currentStep === 5 && <AnimatePresence>
                        <div className="flex-row">
                            <motion.div className="design-primary round-borderer round-borderer-extra"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { scale: 0 },
                                    visible: { scale: 1 },
                                    exit: { scale: 0 },
                                }}
                                transition={{ duration: 0.2 }}
                                style={{ width: `${screenWidth > 450 ? "60rem" : "95vw"}`, padding: "1rem", margin: "0.5rem", height:`${screenWidth > 900 ? "auto" : "70rem"}`, overflowY:"scroll" }}
                            >
                                <span className="page-heading flex-row-align">
                                    <div className="heading-icon-brush svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">Design Your Mart</h1>
                                </span>

                                {formInputValidity.mainDark && formInputValidity.mainLight ? <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Main Colors</h3> : <h3 className="form-label inv z" style={{ margin: "0.5rem 0" }}>Enter Valid Main Colors</h3>}

                                <div className="text-group">
                                    <input onFocus={handleFocus} type="text" placeholder="Dark Color" className={darkClasses} autoComplete="off" style={{ width: "100%" }} value={DarkColor} onChange={handleDarkColorChange}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Light Color" className={lightClasses} autoComplete="off" style={{ width: "100%" }} value={LightColor} onChange={handleLightColorChange}></input>
                                </div>

                                {formInputValidity.bgBody && formInputValidity.bgItem ? <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Background Colors</h3> : <h3 className="form-label inv z" style={{ margin: "0.5rem 0" }}>Enter Valid Background Colors</h3>}

                                <div className="text-group">
                                    <input onFocus={handleFocus} type="text" placeholder="Body Bg" className={bodyClasses} autoComplete="off" style={{ width: "100%" }} value={bgBody} onChange={handleBgBody}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Item Bg" className={itemClasses} autoComplete="off" style={{ width: "100%" }} value={bgItem} onChange={handleBgItem}></input>
                                </div>

                                {formInputValidity.borderTL && formInputValidity.borderTR && formInputValidity.borderBL && formInputValidity.borderBR ? <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Border Radius (px)</h3> : <h3 className="form-label inv z" style={{ margin: "0.5rem 0" }}>Invalid Border Radius (0 and above)</h3>}
                                <div className="text-group-4">
                                    <input type="number" placeholder="T L" className={TLClasses} autoComplete="off" style={{ width: "100%" }} value={borderTL} onChange={handleBorderTL}></input>
                                    <input type="number" placeholder="T R" className={TRClasses} autoComplete="off" style={{ width: "100%" }} value={borderTR} onChange={handleBorderTR}></input>
                                    <input type="number" placeholder="B L" className={BLClasses} autoComplete="off" style={{ width: "100%" }} value={borderBL} onChange={handleBorderBL}></input>
                                    <input type="number" placeholder="B R" className={BRClasses} autoComplete="off" style={{ width: "100%" }} value={borderBR} onChange={handleBorderBR}></input>
                                </div>

                                {formInputValidity.outlineDark && formInputValidity.outlineLight && formInputValidity.outlineFont ? <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Outline Button</h3> : <h3 className="form-label inv z" style={{ margin: "0.5rem 0" }}>Enter Valid Outline Colors</h3>}
                                <div className="text-group-3">
                                    <input onFocus={handleFocus} type="text" placeholder="Dark Color" className={outlineDarkClasses} autoComplete="off" style={{ width: "100%" }} value={outlineDark} onChange={handleOutlineDark}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Light Color" className={outlineLightClasses} autoComplete="off" style={{ width: "100%" }} value={outlineLight} onChange={handleOutlineLight}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Text Color" className={outlineFontClasses} autoComplete="off" style={{ width: "100%" }} value={outlineText} onChange={handleOutlineText}></input>
                                </div>

                                {formInputValidity.solidDark && formInputValidity.solidLight && formInputValidity.solidFont ? <h3 className="heading-tertiary" style={{ margin: "0.5rem 0" }}>Solid Button</h3> : <h3 className="form-label inv z" style={{ margin: "0.5rem 0" }}>Enter Valid Solid Colors</h3>}
                                <div className="text-group-3">
                                    <input onFocus={handleFocus} type="text" placeholder="Dark Color" className={solidDarkClasses} autoComplete="off" style={{ width: "100%" }} value={solidDark} onChange={handleSolidDark}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Light Color" className={solidLightClasses} autoComplete="off" style={{ width: "100%" }} value={solidLight} onChange={handleSolidLight}></input>
                                    <input onFocus={handleFocus} type="text" placeholder="Text Color" className={solidFontClasses} autoComplete="off" style={{ width: "100%" }} value={solidText} onChange={handleSolidText}></input>
                                </div>

                                {screenWidth <= 900 && <>
                                <span className="page-heading flex-row-align">
                                        <div className="heading-icon-typography svg-color">&nbsp;</div>
                                        <h1 className="heading-secondary no-margin">Typography</h1>
                                    </span>

                                    <div className="text-group-3" style={{ marginTop: "1rem" }}>
                                        <FontOptions defaultFont={textPrimaryFont} type={"heading-primary-select"} effect={setTextPrimaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={primaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textPrimary} onChange={handleTextPrimary}></input>
                                    </div>
                                    <div className="text-group-3" style={{ marginTop: "1rem" }}>
                                        <FontOptions defaultFont={textSecondaryFont} type={"heading-secondary-select"} effect={setTextSecondaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={secondaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textSecondary} onChange={handleTextSecondary}></input>
                                    </div>
                                    <div className="text-group-3" style={{ margin: "1rem 0" }}>
                                        <FontOptions defaultFont={textTertiaryFont} type={"heading-tertiary-select"} effect={setTextTertiaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={tertiaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textTertiary} onChange={handleTextTertiary}></input>
                                    </div>

                                <span className="page-heading flex-row-align" style={{ marginBottom: "0.5rem" }}>
                                    <div className="heading-icon-dropshadow">
                                        <div className="heading-icon-sun svg-color">&nbsp;</div>
                                    </div>
                                    <h1 className="heading-secondary no-margin">Light Themes</h1>
                                </span>

                                <div className="theme-set-grid">
                                    <ThemePack themeSet={themeSet1} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet2} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet3} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet4} set={setAllTheme}></ThemePack>
                                </div>
                                </>}

                                <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem", justifyContent: "space-around" }}>
                                    <button className="product-action-3 heading-secondary flex-row-align" type="button" style={{ width: "22rem", height: "6rem", margin: "0" }} onClick={() => hardReset(themeSet1)}><h2 className="heading-secondary outline-button margin-side white">Reset</h2></button>
                                    <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                    {screenWidth > 450 && <button className="product-action-2 heading-secondary" type="button" style={{ width: "22rem", height: "6rem", display: "block", margin: "0" }} onClick={designValidate}>Next</button>}
                                </div>
                                {screenWidth <= 450 && <button className="product-action-2 heading-secondary" type="button" style={{ width: `100%`, height: "6rem", display: "block", margin: "0", marginTop:"1rem" }} onClick={designValidate}>Next</button>}

                            </motion.div>

                            {screenWidth > 900 && <motion.div className="design-primary round-borderer round-borderer-extra"
                                key={currentStep}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { scale: 0 },
                                    visible: { scale: 1 },
                                    exit: { scale: 0 },
                                }}
                                transition={{ duration: 0.2 }}
                                style={{ maxWidth: "70rem", padding: "1rem", height: "auto", margin: "0.5rem" }}
                            >

                                    <span className="page-heading flex-row-align">
                                        <div className="heading-icon-typography svg-color">&nbsp;</div>
                                        <h1 className="heading-secondary no-margin">Typography</h1>
                                    </span>

                                    <div className="text-group-3" style={{ marginTop: "1rem" }}>
                                        <FontOptions defaultFont={textPrimaryFont} type={"heading-primary-select"} effect={setTextPrimaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={primaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textPrimary} onChange={handleTextPrimary}></input>
                                    </div>
                                    <div className="text-group-3" style={{ marginTop: "1rem" }}>
                                        <FontOptions defaultFont={textSecondaryFont} type={"heading-secondary-select"} effect={setTextSecondaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={secondaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textSecondary} onChange={handleTextSecondary}></input>
                                    </div>
                                    <div className="text-group-3" style={{ margin: "1rem 0" }}>
                                        <FontOptions defaultFont={textTertiaryFont} type={"heading-tertiary-select"} effect={setTextTertiaryFont}></FontOptions>
                                        <input onFocus={handleFocus} type="text" placeholder="Text Color" className={tertiaryColorClasses} autoComplete="off" style={{ width: "100%" }} value={textTertiary} onChange={handleTextTertiary}></input>
                                    </div>

                                <span className="page-heading flex-row-align" style={{ marginBottom: "0.5rem" }}>
                                    <div className="heading-icon-dropshadow">
                                        <div className="heading-icon-sun svg-color">&nbsp;</div>
                                    </div>
                                    <h1 className="heading-secondary no-margin">Light Themes</h1>
                                </span>

                                <div className="theme-set-grid">
                                    <ThemePack themeSet={themeSet1} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet2} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet3} set={setAllTheme}></ThemePack>

                                    <ThemePack themeSet={themeSet4} set={setAllTheme}></ThemePack>
                                </div>

                            </motion.div>}
                        </div>
                    </AnimatePresence>}

                    {currentStep === 6 && <AnimatePresence> <motion.div
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
                            <heading className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-credit svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Credit Card Details</h1>
                            </heading>
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
                                    <input style={{ width: "100%", margin: "0" }} type="number" className={cardmonthClasses} placeholder="MM" autoComplete="off" value={cardmonth} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardmonth(newValue); } }}></input>
                                    {cardValidity.mm ? <h3 className="form-label">Month</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">/</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "100%", margin: "0" }} type="number" className={cardyearClasses} placeholder="YY" autoComplete="off" value={cardyear} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 2) { setcardyear(newValue); } }}></input>
                                    {cardValidity.yy ? <h3 className="form-label">Year</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>

                                <label className="heading-tertiary product-currency">CVV:</label>

                                <div className="flex-col-none">
                                    <input style={{ width: "100%", margin: "0" }} type="number" className={cvvClasses} placeholder="CVV" autoComplete="off" value={cvv} onChange={(event) => { const newValue = event.target.value; if (newValue.length <= 3) { setcvv(newValue); } }}></input>
                                    {cardValidity.cvv ? <h3 className="form-label">&nbsp;</h3> : <h3 className="form-label inv z">Invalid</h3>}
                                </div>
                            </div>

                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>
                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: `22rem`, height: "6rem", display: "block" }} onClick={cardValidate} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? <div>{checkmark}</div> : "Next")}</button>

                            </div>

                        </div>
                    </motion.div> </AnimatePresence>}

                    {currentStep === 7 && <AnimatePresence> <motion.div
                        style={{width:"50rem", maxHeight:"75%", overflowY:"scroll", margin:"1rem", marginTop:"15vh"}}
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
                            <heading className="page-heading" style={{ width: "100%" }}>
                                <div className="heading-icon-finale svg-color">&nbsp;</div>
                                <h1 className="heading-secondary no-margin">&nbsp;Finalize Details</h1>
                            </heading>

                            {shopimg !== "" && <img className="company-logo-med" src={shopimg} style={{ margin: "0", marginBottom: "1rem", display: "inline" }}></img>}

                            <div className="user-data-col">
                            <div className="flex-row">
                            <div className="text-sec-profile svg-secondary-2">&nbsp;</div><h2 className="heading-secondary">Profile Details</h2>
                            </div>
                            <div className="flex-row">
                                            <div className="text-ter-shop svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Mart Name:</span> {MartName}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-name svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Name:</span> {lname}, {fname}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-mail svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Registered Email:</span> {email}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-password svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Registered Password</span> {password}</h2>
                                        </div>
                                        <div className="flex-row">
                                                <div className="text-ter-cake svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Age:</span> {formatDateTime(bday)} - {today.getFullYear() -  new Date(bday).getFullYear()} years old</h2>
                                        </div>

                                        <div className="flex-row">
                                                {selectGender === "Male" &&
                                                    <div className="text-ter-gender1 svg-tertiary-2">&nbsp;</div>
                                                }
                                                {selectGender === "Female" &&
                                                    <div className="text-ter-gender2 svg-tertiary-2">&nbsp;</div>
                                                }
                                                {selectGender === "Other" &&
                                                    <div className="text-ter-gender3 svg-tertiary-2">&nbsp;</div>
                                                }
                                                <h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Gender:</span> {selectGender}</h2>
                                            </div>

                                            <div className="flex-row">
                            <div className="text-sec-shop svg-secondary-2">&nbsp;</div><h2 className="heading-secondary">Shop Information</h2>
                            </div>

                                        <div className="flex-row">
                                            <img src={shopicon} style={{height:"16px", width:"16px"}}></img><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Shop Icon</span></h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-mail svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Shop Email</span> {semail}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-phone svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Shop Phone</span> {phone}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-pin svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Shop Location:</span> {locationName}</h2>
                                        </div>
           
                                        <div className="flex-row">
                                            <div className="text-ter-company svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Company Name:</span> {company}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-calendar svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Foundation Year:</span> {new Date(foundyear).getFullYear()}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-description svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Shop Description</span></h2>
                                        </div>
                                        <h2 className="heading-tertiary" style={{whiteSpace:"pre-wrap"}}>{shopdesc}</h2>
                                        
                                        <div className="flex-row">
                            <div className="text-sec-credit svg-secondary-2">&nbsp;</div><h2 className="heading-secondary">Card Information</h2>
                            </div>
                            <div className="flex-row">
                                            <div className="text-ter-name svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Card Name:</span> {cardname}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-credit svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Card Number:</span> {cardnum}</h2>
                                        </div>
                                        
                                        <div className="flex-row" style={{justifyContent:"space-between"}}>
                                        <div className="flex-row">
                                            <div className="text-ter-calendar svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>Expiry Date:</span> {cardmonth}/{cardyear}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-cvv svg-tertiary-2">&nbsp;</div><h2 className="heading-tertiary"><span style={{fontWeight:"900"}}>CVV:</span> {cvv}</h2>
                                        </div>
                                        </div>
                                        
                                        <h2 className="heading-tertiary">The details within can be changed upon the creation of your mart. However, there are more details that can be changed upon exploration such as the creation of your about page, privacy policy, and more. Create your mart to be able to make categories, add products, and manage orders.</h2>
                                        <h2 className="heading-tertiary" style={{fontWeight:"900"}}>Upon creation, login with the registered email and password to gain access. Your ecommerce journey starts today!</h2>

                                    </div>
                            <div className="flex-row" style={{ marginTop: "1rem", gap: "2rem" }}>

                                <button className="product-action-1 heading-secondary flex-row-align" type="button" style={{ width: `22rem`, height: "6rem", margin: "0" }} onClick={handlePreviousStep}><h2 className="heading-secondary outline-button margin-side">Previous</h2></button>
                                <button className="product-action-2 heading-secondary" type="button" style={{ margin: "0 auto", width: `22rem`, height: "6rem", display: "block" }} disabled={loading} onClick={submitData}>{loading ? <div className="spinner"></div> : (completion ? <div>{checkmark}</div> : "Finish")}</button>

                            </div>

                        </div>
                    </motion.div> </AnimatePresence>}

                </div>
            </div>

        </>
    );
}

export default CreateMart

export { getServerSideProps }