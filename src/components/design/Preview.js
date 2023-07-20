import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";

function Preview(props) {
    const { modalStatus, disable, bgBody, bgItem, DarkColor, LightColor, textPrimary, textPrimaryFont, borderBL, borderBR, borderTL, borderTR,
        textSecondary, textSecondaryFont, textTertiary, textTertiaryFont, setIsClicked, setIsClicked2, setIsClicked3, outlineDark, outlineLight, outlineText,
        solidText, solidDark, solidLight, handlePrimaryAcc, handleSecondaryAcc, editFinal, setEditActive,
        handleTertiaryAcc, primaryContrast, primaryContrastBg, primaryContrastText,
        secondaryContrast, secondaryContrastBg, secondaryContrastText, tertiaryContrast,
        tertiaryContrastBg, tertiaryContrastText, isClicked, isClicked2, isClicked3, shopCurrency
    } = props
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

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const categSample = `category-sample ${isHovered ? "category-sample-hover" : ""}`;
    const categorySampleHover = {
        transform: 'translateY(-0.6rem) translateX(1rem)',
        filter: `drop-shadow(-6px 6px 0px ${DarkColor})`,
    };
    const categorySampleClick = {
        transform: "translateY(0rem) translateX(0rem)",
        filter: `drop-shadow(-1px 1px 0px ${DarkColor}) brightness(120%) drop-shadow(0px 0px 10px ${LightColor})`
    }

    const ActionDemo1 = {
        filter: "brightness(120%)",
        boxShadow: `0 0 0 2px ${solidDark}, 0 0 0 4px ${bgItem}`
    };

    const ActionDemo2 = {
        filter: "brightness(120%)",
        boxShadow: `inset 0 0 0 10px ${bgItem}, 0 0 0 2px ${outlineDark},
            0 0 0 4px ${bgItem}`
    };

    return (
        <Fragment>
            <AnimatePresence
                initial={false}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {modalStatus && (
                    <Backdrop onClick={disable} className="categ-modals">

                        <motion.div className="margin-side preview-modal"
                            onClick={disable}
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="design-demo item-setup-dark" onClick={(e) => e.stopPropagation()} style={{
                                backgroundImage: `linear-gradient( to right, ${bgBody}, ${bgBody}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgBody}`
                            }}>
                                <span className="page-heading flex-row-align">
                                    <div className="heading-icon-dropshadow-demo" style={{ filter: `drop-shadow(-2px 2px 0px ${textPrimary})` }}>
                                        <div className="heading-icon-preview" style={{ backgroundImage: `linear-gradient( to right, ${DarkColor}, ${LightColor} )` }}>&nbsp;</div>
                                    </div>

                                    <h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`, marginTop: "-1rem", marginLeft: "-0.5rem" }}>Main Preview</h1>

                                </span>

                                <div style={{ filter: `drop-shadow(-4px 4px 0px ${DarkColor})`, margin: "0 auto" }}>
                                    <div className={categSample} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseUp={() => setIsClicked(false)} onMouseDown={() => setIsClicked(true)}
                                        style={{
                                            borderRadius: `${borderTL}px ${borderTR}px ${borderBR}px ${borderBL}px`, cursor: "pointer",
                                            backgroundImage: `linear-gradient(${bgItem}, ${bgItem}), linear-gradient(${LightColor}, ${DarkColor})`, ... (isHovered ? categorySampleHover : {}), ...(isClicked ? categorySampleClick : {}),
                                        }}>

                                        <button
                                            className="categ-edit-button-prev"
                                            style={editFinal}
                                            onMouseDown={() => setEditActive(true)}
                                            onMouseUp={() => setEditActive(false)}
                                        >
                                            <div className="heading-icon-edit" style={{ backgroundImage: `linear-gradient(${LightColor}, ${DarkColor})` }}>&nbsp;</div>
                                        </button>

                                        <div className="image-container-demo" style={{ borderImage: `linear-gradient(45deg, ${DarkColor}, ${LightColor}) 1`, backgroundColor: `${bgItem}` }}>
                                            <img src="/categories.jpg" className="category-img" alt="Sample Image"></img>
                                        </div>

                                        <div className="category-content-demo" style={{ backgroundColor: `${bgItem}` }}>
                                            <div>
                                                <h2 className="heading-secondary-demo category-name" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}`, marginLeft: "1rem" }}>Heading Secondary</h2>
                                                <h3 className="heading-tertiary-demo" style={{ color: `${textTertiary}`, fontFamily: `${textTertiaryFont}`, marginLeft: "1rem" }}>Sample Heading Tertiary Sample Heading Tertiary Sample Heading Tertiary</h3>
                                            </div>
                                            <div className="product-number-container">
                                                <h2 className="heading-secondary-demo product-numbers product-price" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>{shopCurrency} 123</h2>
                                                <h2 className="heading-secondary-demo product-numbers" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}` }}>456 Units</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-group" style={{ marginTop: "1rem" }}>
                                    <button aria-label="Outline demo button" className="product-action-1-demo heading-secondary-demo" type="button" onMouseUp={() => setIsClicked3(false)} onMouseDown={() => setIsClicked3(true)} style={{
                                        margin: "0rem", width: "100%", color: `${outlineText}`, fontFamily: `${textSecondaryFont}`,
                                        backgroundImage: `linear-gradient(${bgItem}, ${bgItem}), linear-gradient(${outlineDark}, ${outlineLight})`, boxShadow: `inset 0 0 0 2rem ${bgItem}`, ...(isClicked3 ? ActionDemo2 : {})
                                    }}>Outline</button>
                                    <button aria-label="Solid demo button" className="product-action-2-demo heading-secondary-demo" type="button" onMouseUp={() => setIsClicked2(false)} onMouseDown={() => setIsClicked2(true)} style={{
                                        margin: "0rem", width: "100%", color: `${solidText}`,
                                        fontFamily: `${textSecondaryFont}`, backgroundImage: `linear-gradient(${solidLight}, ${solidDark})`, ...(isClicked2 ? ActionDemo1 : {})
                                    }}>Solid</button>
                                </div>

                            </div>
                            <div className="demo-typography item-setup" style={{ padding: "0rem" }} onClick={(e) => e.stopPropagation()}>
                                <span className="page-heading flex-row-align" style={{ padding: "1rem" }}>

                                    <div className="heading-icon-typography svg-color">&nbsp;</div>
                                    <h1 className="heading-secondary no-margin">Typography Preview</h1>
                                </span>

                                <div className="typo-prev-1 item-setup-2-b" style={{
                                    backgroundImage: `linear-gradient( to right, ${bgBody}, ${bgBody}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgBody}`
                                }}>
                                    <button aria-label="Primary accessibility button" onClick={handlePrimaryAcc} className="contrast-init" style={primaryContrastBg}><h2 className={primaryContrastText}>{primaryContrast >= 7 ? <div className="heading-icon-full-star" style={{ background: "linear-gradient(to right, #285430, #285430)" }}>&nbsp;</div> : primaryContrast >= 4.5 ? <div className="heading-icon-half-star" style={{ background: "linear-gradient(to right, #3b2f01, #3b2f01)" }}>&nbsp;</div> : <div className="heading-icon-no-star" style={{ background: "linear-gradient(to right, #540804, #540804)" }}>&nbsp;</div>}{primaryContrast}</h2></button><h1 className="heading-primary-demo" style={{ color: `${textPrimary}`, fontFamily: `${textPrimaryFont}`, marginLeft: "1rem" }}>Lorem Ipsum</h1>
                                </div>
                                <div className="typo-prev-2 item-setup-2" style={{
                                    backgroundImage: `linear-gradient( to right, ${bgItem}, ${bgItem}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgItem}`
                                }}>
                                    <button aria-label="Secondary accessibility button" onClick={handleSecondaryAcc} className="contrast-init" style={secondaryContrastBg}><h2 className={secondaryContrastText}>{secondaryContrast >= 7 ? <div className="heading-icon-full-star" style={{ background: "linear-gradient(to right, #285430, #285430)" }}>&nbsp;</div> : secondaryContrast >= 4.5 ? <div className="heading-icon-half-star" style={{ background: "linear-gradient(to right, #3b2f01, #3b2f01)" }}>&nbsp;</div> : <div className="heading-icon-no-star" style={{ background: "linear-gradient(to right, #540804, #540804)" }}>&nbsp;</div>} {secondaryContrast}</h2></button><h2 className="heading-secondary-demo" style={{ color: `${textSecondary}`, fontFamily: `${textSecondaryFont}`, marginLeft: "1rem" }}>Lorem Ipsum Dolor</h2>
                                </div>
                                <div className="typo-prev-3 item-setup-2" style={{
                                    backgroundImage: `linear-gradient( to right, ${bgItem}, ${bgItem}), 
        linear-gradient( to right, ${DarkColor}, ${LightColor})`, boxShadow: `inset 0 0 0 2rem ${bgItem}`
                                }}>
                                    <button aria-label="Tertiary accessibility button" onClick={handleTertiaryAcc} className="contrast-init" style={tertiaryContrastBg}><h2 className={tertiaryContrastText}>{tertiaryContrast >= 7 ? <div className="heading-icon-full-star" style={{ background: "linear-gradient(to right, #285430, #285430)" }}>&nbsp;</div> : tertiaryContrast >= 4.5 ? <div className="heading-icon-half-star" style={{ background: "linear-gradient(to right, #3b2f01, #3b2f01)" }}>&nbsp;</div> : <div className="heading-icon-no-star" style={{ background: "linear-gradient(to right, #540804, #540804)" }}>&nbsp;</div>} {tertiaryContrast}</h2></button><h2 className="heading-tertiary-demo" style={{ color: `${textTertiary}`, fontFamily: `${textTertiaryFont}`, marginLeft: "1rem" }}>Lorem Ipsum Dolor</h2>
                                </div>

                            </div>
                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default Preview;
