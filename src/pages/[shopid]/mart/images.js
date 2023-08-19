import { Fragment, useState } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import PopModal from "@/components/Mart/PopModal";
import BannerCarousel from "@/components/Mart/BannerCarousel";

function Images(martID) {
    const { screenWidth } = martID
    const router = useRouter();
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

    function startsImgur(word) {
        return word.startsWith("https://i.imgur.com/") || word.startsWith("https://picsum.photos/");
    }

    const imageInfo = martID.shopID.shopData.shopDetails.imageData

    const [favicon, setFavicon] = useState(imageInfo.icons.icon);
    const handleFaviconChange = (event) => {
        setFavicon(event.target.value);
    };

    const [logo, setLogo] = useState(imageInfo.icons.logo);
    const handleLogoChange = (event) => {
        setLogo(event.target.value);
    };

    const [Notifs, setNotifs] = useState(imageInfo.notifications);
    function handleAddNotifs() {
        const newNotifs = [
            ...Notifs,
            {
                type: "heading-tertiary-notif",
                textcol: "#000000",
                col1: "#ffffff",
                col2: "#b5b5b5",
                content: "Item [link]",
                link: "",
                active: true,
            },
        ];
        setNotifs(newNotifs);
    }

    function handleNotifTextType(index) {
        const newNotifs = [...Notifs];
        newNotifs[index].type = event.target.value;
        setNotifs(newNotifs);
    }

    function handleNotifTextTColor(index) {
        const newNotifs = [...Notifs];
        newNotifs[index].textcol = event.target.value;
        setNotifs(newNotifs);
    }

    function handleNotifText(event, index) {
        const newNotifs = [...Notifs];
        newNotifs[index].content = event.target.value;
        setNotifs(newNotifs);
    }

    function handleNotifLink(event, index) {
        const newNotifs = [...Notifs];
        newNotifs[index].link = event.target.value;
        setNotifs(newNotifs);
    }

    function handleNotifC1(index) {
        const newNotifs = [...Notifs];
        newNotifs[index].col1 = event.target.value;
        setNotifs(newNotifs);
    }

    function handleNotifC2(index) {
        const newNotifs = [...Notifs];
        newNotifs[index].col2 = event.target.value;
        setNotifs(newNotifs);
    }

    function handleToggle(index) {
        const newNotifs = [...Notifs];
        newNotifs[index].active = !newNotifs[index].active;
        setNotifs(newNotifs);
    }

    function contentLink(content, link, color) {
        const pattern = /\[(.*?)\]/g;
        const matches = content.match(pattern);

        if (!matches) {
            return content;
        }

        const elements = [];
        let lastIndex = 0;

        for (const match of matches) {
            const startIndex = content.indexOf(match, lastIndex);
            const endIndex = startIndex + match.length;
            const linkText = match.slice(1, -1);

            elements.push(content.substring(lastIndex, startIndex));
            elements.push(
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: color }}
                >
                    {linkText}
                </a>
            );

            lastIndex = endIndex;
        }

        if (lastIndex < content.length) {
            elements.push(content.substring(lastIndex));
        }

        return elements;
    }

    const [confirmDelete1, setConfirmDelete1] = useState(null);
    const [confirmDelete2, setConfirmDelete2] = useState(null);

    function handleDeleteNotif(index) {
        if (confirmDelete1 === index) {
            let newNotifs = Notifs.filter((item, i) => i !== index);
            setNotifs(newNotifs);
            setConfirmDelete1(null);
        } else {
            setConfirmDelete1(index);
            setTimeout(() => {
                setConfirmDelete1(null);
            }, 2000);
        }
    }

    const [activeNotifs, setActiveNotifs] = useState([]);
    function handleActive() {
        const activeNotifs = Notifs.filter((notif) => notif.active);
        setActiveNotifs(activeNotifs);
    }

    function handleDeleteActive(index) {
        let newNotifs = activeNotifs.filter((item, i) => i !== index);
        setActiveNotifs(newNotifs);
    }

    const [PopupStatus, setPopupStatus] = useState(imageInfo.popups.active)
    function handlePopupStatus() {
        setPopupStatus(!PopupStatus)
    }

    const [Popup, setPopup] = useState(imageInfo.popups.image);
    const handlePopupChange = (event) => {
        setPopup(event.target.value);
    };

    const [PopupLink, setPopupLink] = useState(imageInfo.popups.link);
    const handlePopupLinkChange = (event) => {
        setPopupLink(event.target.value);
    };

    const [startPop, setStartPop] = useState(false)
    const handleStart = () => {
        setStartPop(!startPop)
    }

    const [bannerItems, setBannerItems] = useState(imageInfo.banners)

    function handleBannerImage(event, index) {
        const newBanners = [...bannerItems];
        newBanners[index].image = event.target.value;
        setBannerItems(newBanners);
    }

    function handleBannerLink(event, index) {
        const newBanners = [...bannerItems];
        newBanners[index].link = event.target.value;
        setBannerItems(newBanners);
    }

    function handleAddBanner() {
        const newBanners = [
            ...bannerItems,
            {
                image: "",
                link: "",
                active: true,
            },
        ];
        setBannerItems(newBanners);
    }

    function handleBannerToggle(index) {
        const newBanners = [...bannerItems];
        newBanners[index].active = !newBanners[index].active;
        setBannerItems(newBanners);
    }

    function handleDeleteBanner(index) {
        if (confirmDelete2 === index) {
            let newBanners = bannerItems.filter((item, i) => i !== index);
            setBannerItems(newBanners);
            setConfirmDelete2(null);
        } else {
            setConfirmDelete2(index);
            setTimeout(() => {
                setConfirmDelete2(null);
            }, 2000);
        }
    }

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function submitChanges(data) {
        setLoading(true)
        const response = await fetch(
            `../../api/set-images?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();

        await waitSeconds()

        router.reload()
    }

    const [loading, setLoading] = useState(false)

    return (
        <Fragment>
            <Head>
                <title>Images & Pop-ups</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>

            <PopModal modalStatus={startPop} disable={handleStart} image={Popup} link={PopupLink}></PopModal>

            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-pop-up svg-color">&nbsp;</div>
                </div>

                {/* <h1 className="heading-primary no-margin"  style={{ fontSize: `${screenWidth > 500 ? "3.5rem" : screenWidth > 450 ? "3rem" : "2.5rem"}`}}>Contact Details and Footer&nbsp;</h1>
      <button onClick={submitChanges} className="heading-tertiary add-categ-init" style={{ width: `${screenWidth > 600 ? "21rem" : screenWidth > 400 ? "23rem" : "18rem"}`, height: `${screenWidth > 400 ? "4rem" : "7rem"}` }} disabled={loading}><div className="heading-icon-check svg-color">&nbsp;</div>{loading ? "Submitting..." : "Submit Changes"} &nbsp;</button> */}

                <h1 className="heading-primary no-margin" style={{ fontSize: `${screenWidth > 500 ? "3.5rem" : screenWidth > 450 ? "3rem" : "2.5rem"}` }}>
                    &nbsp;Images & Pop-ups &nbsp;
                </h1>
                <button
                    disabled={loading}
                    className="heading-tertiary add-categ-init"
                    style={{ width: `${screenWidth > 600 ? "max-content" : screenWidth > 400 ? "23rem" : "18rem"}`, height: `${screenWidth > 400 ? "4rem" : "7rem"}` }}
                    onClick={() => {
                        const validatedPopup = startsImgur(Popup) ? Popup : "https://i.imgur.com/removed.png";
                        const validatedFavicon = startsImgur(favicon) ? favicon : "https://i.imgur.com/removed.png";
                        const validatedLogo = startsImgur(logo) ? logo : "https://i.imgur.com/removed.png";

                        const popupData = { active: PopupStatus, image: validatedPopup, link: PopupLink };
                        const iconInfo = { icon: validatedFavicon, logo: validatedLogo };

                        const payload = { icons: iconInfo, notifications: Notifs, popups: popupData, banners: bannerItems }
                        submitChanges(payload)
                    }}
                >
                    <div className="heading-icon-check svg-color">&nbsp;</div>
                    {loading ? "Submitting..." : "Submit Changes"} &nbsp;
                </button>
            </span>

            <div className="images-container">
                <div className="images-column-1">
                    <div className="images-column">
                        <div className="images-inputs">

                            <div>
                                <span className="page-heading flex-row-align">
                                    <div className="heading-icon-favicon svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">Set Shop Icon</h1>
                                    <img src={favicon} alt="Favicon" style={{ height: "16px", width: "16px" }}></img>
                                </span>
                                <h3 className="heading-tertiary" style={{ margin: "1rem" }}>
                                    Input an Imgur jpeg link
                                </h3>

                                <input
                                    className="text-small input-number"
                                    type="text"
                                    placeholder="Imgur Link"
                                    onChange={handleFaviconChange}
                                    value={favicon}
                                ></input>

                            </div>

                            <div>
                                <span
                                    className="page-heading flex-row-align"
                                    style={{ marginTop: "1rem" }}
                                >
                                    <div className="heading-icon-navbar-logo svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">Set Navbar Logo</h1>
                                </span>
                                <h3 className="heading-tertiary" style={{ marginBottom: "1rem" }}>
                                    Input an Imgur jpeg link
                                </h3>

                                <input
                                    className="text-small input-number"
                                    type="text"
                                    placeholder="Imgur Link"
                                    onChange={handleLogoChange}
                                    value={logo}
                                ></input>
                            </div>
                        </div>
                        <img
                            alt="Mart Logo"
                            src={logo}
                            className="company-logo-med"
                            style={{ margin: "2rem auto" }}
                        />
                    </div>
                    <div className="images-column">
                        <span className="page-heading flex-row-align">
                            <div className="heading-icon-pop-up svg-color">&nbsp;</div>
                            <h1 className="heading-secondary no-margin">Set Pop-up</h1>
                            <div className="flex-row-align">
                                <input
                                    checked={PopupStatus}
                                    onChange={() => handlePopupStatus()}
                                    type="checkbox"
                                    id="pop"
                                    className="toggle-switch"

                                />
                                <label htmlFor={`pop`} className="toggle-label">
                                    Toggle
                                </label>
                            </div>
                            <button className="add-img" type="button" onClick={handleStart}>
                                <div className="heading-icon-play svg-color">
                                    &nbsp;
                                </div>
                            </button>
                        </span>

                        <h3 className="heading-tertiary" style={{ margin: "1rem" }}>
                            Create a pop-up upon entering the homepage. Put an image that once clicked, will lead to the link of your promo.
                        </h3>

                        <div className="flex-row">
                            <div className="flex-col">
                                <label
                                    className="heading-tertiary"
                                    style={{ marginBottom: "1rem" }}
                                >
                                    Image Link: &nbsp;
                                </label>
                                <div className="flex-row-align">
                                    <input
                                        type="text"
                                        placeholder="imgur Link"
                                        className="text-small input-number"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={Popup}
                                        onChange={(event) => handlePopupChange(event)}
                                    ></input>
                                </div>
                            </div>
                            {screenWidth > 400 && <div className="flex-col">
                                <label
                                    className="heading-tertiary"
                                    style={{ marginBottom: "1rem" }}
                                >
                                    Link Path: &nbsp;
                                </label>
                                <div className="flex-row-align">
                                    <input
                                        type="text"
                                        placeholder="Link"
                                        className="text-small input-number"
                                        autoComplete="off"
                                        style={{ width: "100%", margin: "0" }}
                                        value={PopupLink}
                                        onChange={(event) => handlePopupLinkChange(event)}
                                    ></input>
                                </div>
                            </div>}
                        </div>

                        {screenWidth <= 400 && <div className="flex-col" style={{ marginTop: "2rem" }}>
                            <label
                                className="heading-tertiary"
                                style={{ marginBottom: "1rem" }}
                            >
                                Link Path: &nbsp;
                            </label>
                            <div className="flex-row-align">
                                <input
                                    type="text"
                                    placeholder="Link"
                                    className="text-small input-number"
                                    autoComplete="off"
                                    style={{ width: "100%", margin: "0" }}
                                    value={PopupLink}
                                    onChange={(event) => handlePopupLinkChange(event)}
                                ></input>
                            </div>
                        </div>}

                        <div className="pop-up-container">
                            <img alt="Pop-up" src={Popup} className="pop-up-prev"></img>
                        </div>

                    </div>

                    {screenWidth <= 800 && <div className="images-column">
                        <span
                            className="page-heading flex-row-align"
                            style={{ padding: "1rem" }}
                        >
                            <div className="heading-icon-notification svg-color">&nbsp;</div>
                            <h1 className="heading-secondary no-margin">Notification Maker</h1>
                            <button className="add-img" type="button" onClick={handleAddNotifs}>
                                <div className="heading-icon-plus-marginless svg-color">
                                    &nbsp;
                                </div>
                            </button>
                            <button className="add-img" type="button" onClick={handleActive}>
                                <div className="heading-icon-play svg-color">
                                    &nbsp;
                                </div>
                            </button>
                        </span>
                        <h3 className="heading-tertiary" style={{ margin: "1rem" }}>
                            Create notifications that appear on the homepage. Put text in [ ] to
                            assign them to a link. Use these for announcements and news.
                        </h3>

                        <AnimatePresence>
                            {Notifs.map((item, index) => (
                                <div className="detail-row-about" key={index}>
                                    <motion.div
                                        className="detail-row-about"
                                        key={index}
                                        variants={slide}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <div
                                            className="flex-col set-container"
                                            style={{ gap: "1rem", marginBottom: "1rem", position: "relative" }}
                                        >

                                            <div className="flex-row">
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Text Content: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Content"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", margin: "0" }}
                                                            value={item.content}
                                                            onChange={(event) => handleNotifText(event, index)}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-row">
                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Heading Type: &nbsp;
                                                    </label>
                                                    <select
                                                        value={item.type}
                                                        onChange={(event) =>
                                                            handleNotifTextType(index, event.target.value)
                                                        }
                                                        className="text-options text-span"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                    >
                                                        <option value="heading-primary-notif">
                                                            Primary Heading
                                                        </option>
                                                        <option value="heading-secondary-notif">
                                                            Secondary Heading
                                                        </option>
                                                        <option value="heading-tertiary-notif">
                                                            Tertiary heading
                                                        </option>
                                                    </select>
                                                </div>

                                                {screenWidth <= 450 && <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Text Color: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Text Color"
                                                        className="text-small input-number"
                                                        autoComplete="off"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                        value={item.textcol}
                                                        onChange={(event) =>
                                                            handleNotifTextTColor(index, event.target.value)
                                                        }
                                                    ></input>
                                                </div>}

                                                {screenWidth > 450 && <>
                                                    <div className="flex-col">
                                                        <label
                                                            className="heading-tertiary"
                                                            style={{ marginBottom: "1rem" }}
                                                        >
                                                            Link: &nbsp;
                                                        </label>
                                                        <div className="flex-row-align">
                                                            <input
                                                                type="text"
                                                                placeholder="Link"
                                                                className="text-small input-number"
                                                                autoComplete="off"
                                                                style={{ width: "100%", margin: "0" }}
                                                                value={item.link}
                                                                onChange={(event) => handleNotifLink(event, index)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex-col">
                                                        <label
                                                            className="heading-tertiary"
                                                            style={{ marginBottom: "1rem" }}
                                                        >
                                                            Toggle Notif: &nbsp;
                                                        </label>
                                                        <div className="flex-row-align">
                                                            <input
                                                                checked={item.active}
                                                                onChange={() => handleToggle(index)}
                                                                type="checkbox"
                                                                id={`notif${index}`}
                                                                className="toggle-switch"
                                                            />
                                                            <label htmlFor={`notif${index}`} className="toggle-label">
                                                                Toggle
                                                            </label>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>

                                            {screenWidth <= 1600 && <div className="flex-row">
                                                {screenWidth > 450 && <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Text Color: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Text Color"
                                                        className="text-small input-number"
                                                        autoComplete="off"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                        value={item.textcol}
                                                        onChange={(event) =>
                                                            handleNotifTextTColor(index, event.target.value)
                                                        }
                                                    ></input>
                                                </div>}

                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Color Dark: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Color Dark"
                                                        className="text-small input-number"
                                                        autoComplete="off"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                        value={item.col1}
                                                        onChange={(event) =>
                                                            handleNotifC1(index, event.target.value)
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Color Light: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Color Dark"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", marginTop: "1rem" }}
                                                            value={item.col2}
                                                            onChange={(event) =>
                                                                handleNotifC2(index, event.target.value)
                                                            }
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>}
                                            {screenWidth <= 450 && <div className="flex-row">
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Link: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Link"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", margin: "0" }}
                                                            value={item.link}
                                                            onChange={(event) => handleNotifLink(event, index)}
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Toggle Notif: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            checked={item.active}
                                                            onChange={() => handleToggle(index)}
                                                            type="checkbox"
                                                            id={`notif${index}`}
                                                            className="toggle-switch"
                                                        />
                                                        <label htmlFor={`notif${index}`} className="toggle-label">
                                                            Toggle
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>}

                                            <div
                                                className="top-notif"
                                                style={{
                                                    backgroundImage: `linear-gradient(to top right, ${item.col1}, ${item.col2})`,
                                                }}
                                            >
                                                <h2
                                                    className={item.type}
                                                    style={{ color: `${item.textcol}` }}
                                                >
                                                    {contentLink(item.content, item.link, item.textcol)}
                                                </h2>
                                                <button className="notif-close-button"><div className="notif-close" style={{ backgroundImage: `linear-gradient(to top right, ${item.textcol}, ${item.textcol})` }}>&nbsp;</div></button>
                                            </div>
                                        </div>

                                        <button className="add-img" type="button" onClick={() => handleDeleteNotif(index)} style={{ position: "absolute", top: "0", right: "0", margin: "1rem" }}>

                                            {confirmDelete1 === index ? (
                                                <div className="heading-icon-check-marginless svg-color">
                                                    &nbsp;
                                                </div>
                                            ) : (
                                                <div className="heading-icon-minus-marginless svg-color">
                                                    &nbsp;
                                                </div>
                                            )}
                                        </button>

                                    </motion.div>
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>}
                </div>

                {screenWidth > 800 && <div className="images-column-1">
                    <div className="images-column">
                        <span
                            className="page-heading flex-row-align"
                            style={{ padding: "1rem" }}
                        >
                            <div className="heading-icon-notification svg-color">&nbsp;</div>
                            <h1 className="heading-secondary no-margin">Notification Maker</h1>
                            <button className="add-img" type="button" onClick={handleAddNotifs}>
                                <div className="heading-icon-plus-marginless svg-color">
                                    &nbsp;
                                </div>
                            </button>
                            <button className="add-img" type="button" onClick={handleActive}>
                                <div className="heading-icon-play svg-color">
                                    &nbsp;
                                </div>
                            </button>
                        </span>
                        <h3 className="heading-tertiary" style={{ margin: "1rem" }}>
                            Create notifications that appear on the homepage. Put text in [ ] to
                            assign them to a link. Use these for announcements and news.
                        </h3>

                        <AnimatePresence>
                            {Notifs.map((item, index) => (
                                <div className="detail-row-about" key={index}>
                                    <motion.div
                                        className="detail-row-about"
                                        key={index}
                                        variants={slide}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <div
                                            className="flex-col set-container"
                                            style={{ gap: "1rem", marginBottom: "1rem", position: "relative" }}
                                        >

                                            <button className="add-img" type="button" onClick={() => handleDeleteNotif(index)} style={{ position: "absolute", right: "0", marginRight: "0.5rem", marginTop: "-1.5rem" }}>
                                                {confirmDelete1 === index ? (
                                                    <div className="heading-icon-check-marginless svg-color">
                                                        &nbsp;
                                                    </div>
                                                ) : (
                                                    <div className="heading-icon-minus-marginless svg-color">
                                                        &nbsp;
                                                    </div>
                                                )}
                                            </button>
                                            <div className="flex-row">
                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Heading Type: &nbsp;
                                                    </label>
                                                    <select
                                                        value={item.type}
                                                        onChange={(event) =>
                                                            handleNotifTextType(index, event.target.value)
                                                        }
                                                        className="text-options text-span"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                    >
                                                        <option value="heading-primary-notif">
                                                            Primary Heading
                                                        </option>
                                                        <option value="heading-secondary-notif">
                                                            Secondary Heading
                                                        </option>
                                                        <option value="heading-tertiary-notif">
                                                            Tertiary heading
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Text Color: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Text Color"
                                                        className="text-small input-number"
                                                        autoComplete="off"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                        value={item.textcol}
                                                        onChange={(event) =>
                                                            handleNotifTextTColor(index, event.target.value)
                                                        }
                                                    ></input>
                                                </div>

                                                {screenWidth > 1600 && <>
                                                    <div className="flex-col">
                                                        <label className="heading-tertiary">
                                                            Color Dark: &nbsp;
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Color Dark"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", marginTop: "1rem" }}
                                                            value={item.col1}
                                                            onChange={(event) =>
                                                                handleNotifC1(index, event.target.value)
                                                            }
                                                        ></input>
                                                    </div>
                                                    <div className="flex-col">
                                                        <label className="heading-tertiary">
                                                            Color Light: &nbsp;
                                                        </label>
                                                        <div className="flex-row-align">
                                                            <input
                                                                type="text"
                                                                placeholder="Color Dark"
                                                                className="text-small input-number"
                                                                autoComplete="off"
                                                                style={{ width: "100%", marginTop: "1rem" }}
                                                                value={item.col2}
                                                                onChange={(event) =>
                                                                    handleNotifC2(index, event.target.value)
                                                                }
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>

                                            {screenWidth <= 1600 && <div className="flex-row">
                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Color Dark: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Color Dark"
                                                        className="text-small input-number"
                                                        autoComplete="off"
                                                        style={{ width: "100%", marginTop: "1rem" }}
                                                        value={item.col1}
                                                        onChange={(event) =>
                                                            handleNotifC1(index, event.target.value)
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="flex-col">
                                                    <label className="heading-tertiary">
                                                        Color Light: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Color Dark"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", marginTop: "1rem" }}
                                                            value={item.col2}
                                                            onChange={(event) =>
                                                                handleNotifC2(index, event.target.value)
                                                            }
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>}

                                            {screenWidth <= 1400 && <div className="flex-row">
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Text Content: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Content"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", margin: "0" }}
                                                            value={item.content}
                                                            onChange={(event) => handleNotifText(event, index)}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>}

                                            <div className="flex-row">
                                                {screenWidth > 1400 && <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Text Content: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Content"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", margin: "0" }}
                                                            value={item.content}
                                                            onChange={(event) => handleNotifText(event, index)}
                                                        ></input>
                                                    </div>
                                                </div>}
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Link: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            type="text"
                                                            placeholder="Link"
                                                            className="text-small input-number"
                                                            autoComplete="off"
                                                            style={{ width: "100%", margin: "0" }}
                                                            value={item.link}
                                                            onChange={(event) => handleNotifLink(event, index)}
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className="flex-col">
                                                    <label
                                                        className="heading-tertiary"
                                                        style={{ marginBottom: "1rem" }}
                                                    >
                                                        Toggle Notif: &nbsp;
                                                    </label>
                                                    <div className="flex-row-align">
                                                        <input
                                                            checked={item.active}
                                                            onChange={() => handleToggle(index)}
                                                            type="checkbox"
                                                            id={`notif${index}`}
                                                            className="toggle-switch"
                                                        />
                                                        <label htmlFor={`notif${index}`} className="toggle-label">
                                                            Toggle
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="top-notif"
                                                style={{
                                                    backgroundImage: `linear-gradient(to top right, ${item.col1}, ${item.col2})`,
                                                }}
                                            >
                                                <h2
                                                    className={item.type}
                                                    style={{ color: `${item.textcol}` }}
                                                >
                                                    {contentLink(item.content, item.link, item.textcol)}
                                                </h2>
                                                <button className="notif-close-button"><div className="notif-close" style={{ backgroundImage: `linear-gradient(to top right, ${item.textcol}, ${item.textcol})` }}>&nbsp;</div></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>}

            </div>

            <div className="active-notifs">
                <AnimatePresence>
                    {activeNotifs.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={slide}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={index}
                            className="top-notif"
                            style={{
                                backgroundImage: `linear-gradient(to top right, ${item.col1}, ${item.col2})`,
                            }}
                        >
                            <h2
                                className={item.type}
                                style={{ color: `${item.textcol}` }}
                            >
                                {contentLink(item.content, item.link, item.textcol)}
                            </h2>
                            <button className="notif-close-button"><div className="notif-close" style={{ backgroundImage: `linear-gradient(to top right, ${item.textcol}, ${item.textcol})` }} onClick={() => handleDeleteActive(index)}>&nbsp;</div></button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <span className="page-heading flex-row-align" style={{ marginBottom: "1rem" }}>
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-banner svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-secondary no-margin">Create Banners</h1>
                <button className="add-img" type="button" onClick={handleAddBanner}>
                    <div className="heading-icon-plus-marginless svg-color">
                        &nbsp;
                    </div>
                </button>
            </span>
            <BannerCarousel data={bannerItems} screenWidth={screenWidth}></BannerCarousel>
            <AnimatePresence>
                {bannerItems.map((item, index) => (
                    <div className="detail-row-about" key={index} style={{ width: "95%", margin: "1rem auto" }}>
                        <motion.div
                            className="detail-row-about"
                            key={index}
                            variants={slide}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div
                                className="flex-col set-container"
                                style={{ gap: "1rem", marginBottom: "1rem", position: "relative" }}
                            >

                                <button
                                    className="add-img"
                                    type="button"
                                    onClick={() => handleDeleteBanner(index)}
                                    style={{ position: "absolute", right: "0", top: "0", margin: "0.5rem" }}
                                >
                                    {confirmDelete2 === index ? (
                                        <div className="heading-icon-check-marginless svg-color">
                                            &nbsp;
                                        </div>
                                    ) : (
                                        <div className="heading-icon-minus-marginless svg-color">
                                            &nbsp;
                                        </div>
                                    )}
                                </button>

                                {screenWidth <= 600 && <div className="flex-col">
                                    <label
                                        className="heading-tertiary"
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        Banner Image: &nbsp;
                                    </label>
                                    <div className="flex-row-align">
                                        <input
                                            type="text"
                                            placeholder="Link"
                                            className="text-small input-number"
                                            autoComplete="off"
                                            style={{ width: "100%", margin: "0" }}
                                            value={item.image}
                                            onChange={(event) => handleBannerImage(event, index)}
                                        ></input>
                                    </div>
                                </div>}
                                <div className="flex-row">
                                    {screenWidth > 600 && <div className="flex-col">
                                        <label
                                            className="heading-tertiary"
                                            style={{ marginBottom: "1rem" }}
                                        >
                                            Banner Image: &nbsp;
                                        </label>
                                        <div className="flex-row-align">
                                            <input
                                                type="text"
                                                placeholder="Link"
                                                className="text-small input-number"
                                                autoComplete="off"
                                                style={{ width: "100%", margin: "0" }}
                                                value={item.image}
                                                onChange={(event) => handleBannerImage(event, index)}
                                            ></input>
                                        </div>
                                    </div>}
                                    <div className="flex-col">
                                        <label
                                            className="heading-tertiary"
                                            style={{ marginBottom: "1rem" }}
                                        >
                                            Banner Link: &nbsp;
                                        </label>
                                        <div className="flex-row-align">
                                            <input
                                                type="text"
                                                placeholder="Content"
                                                className="text-small input-number"
                                                autoComplete="off"
                                                style={{ width: "100%", margin: "0" }}
                                                value={item.link}
                                                onChange={(event) => handleBannerLink(event, index)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="flex-col">
                                        <label
                                            className="heading-tertiary"
                                            style={{ marginBottom: "1rem" }}
                                        >
                                            Toggle Banner: &nbsp;
                                        </label>
                                        <div className="flex-row-align">
                                            <input
                                                checked={item.active}
                                                onChange={() => handleBannerToggle(index)}
                                                type="checkbox"
                                                id={`banner ${index}`}
                                                className="toggle-switch"
                                            />
                                            <label htmlFor={`banner ${index}`} className="toggle-label">
                                                Toggle
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <button
                                className="add-img"
                                type="button"
                                onClick={() => handleDeleteBanner(index)}
                            >
                                {confirmDelete2 === index ? (
                                    <div className="heading-icon-check-marginless svg-color">
                                        &nbsp;
                                    </div>
                                ) : (
                                    <div className="heading-icon-minus-marginless svg-color">
                                        &nbsp;
                                    </div>
                                )}
                            </button> */}

                        </motion.div>
                    </div>
                ))}
            </AnimatePresence>

        </Fragment>
    );
}

export default Images;

export { getServerSideProps };
