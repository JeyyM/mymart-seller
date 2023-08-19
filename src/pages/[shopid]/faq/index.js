import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import NewFaq from "@/components/faq/NewFaq"
import { useRouter } from "next/router"
import { FaQq } from "react-icons/fa"
import pako from "pako";

function FaQ({ shopID, screenWidth }) {
    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const router = useRouter()
    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    const slide = {
        hidden: {
            x: "-10rem",
            opacity: 0,
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
            x: "-10rem",
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
    };

    const id = final._id
    const favicon = final.shopData.shopDetails.imageData.icons.icon

    const [newItem, setNewItem] = useState(false);
    const handleNewItem = () => {
        setNewItem(!newItem);
    };

    const [answers, setAnswers] = useState(final.shopData.shopFaq.answers)

    const [Expanded, setExpanded] = useState([]);
    const toggleExpand = (index) => {
        if (Expanded.includes(index)) {
            setExpanded(Expanded.filter((expIndex) => expIndex !== index));
        } else {
            setExpanded([...Expanded, index]);
        }
    };

    async function finishSubmit(items){
        handleNewItem()

        const response = await fetch(
            `../../api/set-faq?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(items)
            }
        );
        const data = await response.json();
    }

    return <Fragment>
        <Head>
            <title>Frequently Asked Questions</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>
        <NewFaq modalStatus={newItem} disable={handleNewItem} submit={finishSubmit}></NewFaq>

        <header className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-quiz svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin" style={{fontSize: `${screenWidth > 550 ? "3.5rem" : screenWidth > 500 ? "3rem" : "2.5rem"}`}}>&nbsp;Frequently Asked Questions&nbsp;</h1>
            <button className="heading-tertiary add-categ-init" style={{ width: `${screenWidth > 600 ? "max-content" : screenWidth > 400 ? "20rem" : "18rem"}`, height: `${screenWidth > 600 ? "4rem" : "7rem"}` }} onClick={handleNewItem}>
                &nbsp; Request New Question &nbsp;</button>
        </header>

        {answers.length > 0 ? <div className="faq-container">
            <AnimatePresence>
                {answers.map((answer, index) => {
                    return (
                        <motion.div className="qna-item round-borderer round-borderer-extra" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                            <div className="flex-row-spaceless flex-centered">
                                <button className="order-toggle" onClick={() => toggleExpand(index)}>
                                    <div className={Expanded.includes(index) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                </button>
                                <h2 className="heading-secondary margin-vert" onClick={() => toggleExpand(index)}>{answer.q}</h2>

                            </div>

                            <motion.div
                                style={{ overflow: 'hidden' }}
                                initial={Expanded.includes(index) ? 'visible' : 'hidden'}
                                animate={Expanded.includes(index) ? 'visible' : 'hidden'}
                                variants={SlideHeight}>
                                <h3 className="heading-tertiary">{answer.a}</h3>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div> :
            <div className="empty-contents">
                <div className="empty-quiz svg-color">&nbsp;</div>
                <h2 className="empty-text">There seems to be no FAQs yet</h2>
            </div>}
    </Fragment>
}

export default FaQ

export { getServerSideProps }