import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import FaqModal from "@/components/faq/FaqModal"
import NewFaq from "@/components/faq/NewFaq"
import { useRouter } from "next/router"

function Mart(martID) {
    const router = useRouter()
    const SlideHeight = {
        hidden: { opacity: 1, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    const {screenWidth} = martID

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

    const id = martID.shopID._id
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon

    const [modal, setModal] = useState(false);
    const handleSetModal = () => {
        setModal(!modal);
    };

    const [newItem, setNewItem] = useState(false);
    const handleNewItem = () => {
        setNewItem(!newItem);
    };

    const [newQ, setQ] = useState("")
    const [newA, setA] = useState("")
    const [newIndex, setIndex] = useState(null)

    function switchUp(q, a, index) {
        setQ(q)
        setA(a)
        setIndex(index)
        handleSetModal()
        handleNewItem()
    }

    const [answers, setAnswers] = useState(martID.shopID.shopData.shopFaq.answers)
    const [questions, setQuestions] = useState(martID.shopID.shopData.shopFaq.questions)

    function changeReq(list) {
        setQuestions(list)
    }

    const [Expanded, setExpanded] = useState([]);
    const toggleExpand = (index) => {
        if (Expanded.includes(index)) {
            setExpanded(Expanded.filter((expIndex) => expIndex !== index));
        } else {
            setExpanded([...Expanded, index]);
        }
    };

    const [confirmDelete1, setConfirmDelete1] = useState(null);
    function handleDeleteDel(index) {
        if (confirmDelete1 === index) {
            let newAnswers = answers.filter((add, i) => i !== index);
            setAnswers(newAnswers);
            setConfirmDelete1(null);
        } else {
            setConfirmDelete1(index);
            setTimeout(() => {
                setConfirmDelete1(null);
            }, 2000);
        }
    }

    function changeQ(newItem, index) {
        const updatedAnswers = [...answers];
        updatedAnswers[index].q = newItem;
        setAnswers(updatedAnswers);
    }

    function changeA(newItem, index) {
        const updatedAnswers = [...answers];
        updatedAnswers[index].a = newItem;
        setAnswers(updatedAnswers);
    }

    function submitNew(item) {
        handleNewItem()
        let newQuestions = []

        if (newIndex !== undefined) {
            newQuestions = questions.filter((q, index) => index !== newIndex);
            setQuestions(newQuestions)
        } else {
            newQuestions = questions
        }

        if (item.q === "" || item.a === "") {
            return
        } else {
            let newAnswers = [...answers, item]
            setAnswers(newAnswers)
        }
    }

    const [loading, setLoading] = useState(false)

    const acceptClass = "product-action-2 flex-row-align"
    const acceptText = "heading-tertiary margin-side solid-text-color"

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function submitChanges() {
        setLoading(true)

        const requestBody = {
            q: questions,
            a: answers
        };

        const response = await fetch(
            `../../api/set-faq?martid=${router.query.shopid}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        const data = await response.json();

        await waitSeconds()
        router.reload()
    }

    return <Fragment>
        <Head>
            <title>Frequently Asked Questions</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>
        <FaqModal modalStatus={modal} disable={handleSetModal} questions={questions} change={changeReq} addNew={switchUp}></FaqModal>
        <NewFaq modalStatus={newItem} disable={switchUp} newQ={newQ} newA={newA} newIndex={newIndex} submit={submitNew}></NewFaq>

        <span className="page-heading">
            <div className="heading-icon-dropshadow">
                <div className="heading-icon-quiz svg-color">&nbsp;</div>
            </div>
            <h1 className="heading-primary no-margin" style={{fontSize: `${screenWidth > 400 ? "3.5rem" : screenWidth > 350 ? "3rem" : "2.5rem"}`}}>&nbsp;Frequently Asked Questions&nbsp;</h1>
            {screenWidth > 700 && <>
            <button className="heading-tertiary add-categ-init" style={{ width: "max-content" }} onClick={handleSetModal} disabled={loading}>
                &nbsp; Add New Item &nbsp;</button>
            <button className={acceptClass} style={{ width: "18rem", margin: "1rem 1rem", height: "3.5rem" }} disabled={loading} onClick={submitChanges}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>{loading ? "Submitting..." : "Submit Changes"}</h3></button>
            </>}
        </span>
        {screenWidth <= 700 && <span className="page-heading">
            <button className="heading-tertiary add-categ-init" style={{ width: "max-content" }} onClick={handleSetModal} disabled={loading}>
                &nbsp; Add New Item &nbsp;</button>
            <button className={acceptClass} style={{ width: "18rem", margin: "1rem 1rem", height: "3.5rem" }} disabled={loading} onClick={submitChanges}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>{loading ? "Submitting..." : "Submit Changes"}</h3></button>
            </span>}

        {answers.length > 0 ? <div className="faq-container">
            <AnimatePresence>
                {answers.map((answer, index) => {
                    return (
                        <motion.div className="qna-item round-borderer round-borderer-extra" key={index} variants={slide} initial="hidden" animate="visible" exit="exit">
                            <div className="flex-row-spaceless flex-centered">
                                <button className="order-toggle" onClick={() => toggleExpand(index)}>
                                    <div className={Expanded.includes(index) ? "heading-icon-chevron svg-color rotater transitionAll" : "heading-icon-chevron svg-color transitionAll"}>&nbsp;</div>
                                </button>
                                <input
                                    type="text"
                                    className="text-small input-number"
                                    placeholder="Question"
                                    value={answer.q}
                                    autoComplete="off"
                                    style={{ width: `${screenWidth > 550 ? "85%" : screenWidth > 450 ? "80%" : screenWidth > 330 ? "75%" : "70%"}` }}
                                    onChange={(event) => changeQ(event.target.value, index)}
                                ></input>

                            </div>
                            <button className="add-img" type="button" onClick={() => handleDeleteDel(index)} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                                {confirmDelete1 === index ? <div className="heading-icon-check-marginless svg-color">&nbsp;</div> : <div className="heading-icon-minus-marginless svg-color">&nbsp;</div>}
                            </button>


                            <motion.div
                                style={{ overflow: 'hidden' }}
                                initial={Expanded.includes(index) ? 'visible' : 'hidden'}
                                animate={Expanded.includes(index) ? 'visible' : 'hidden'}
                                variants={SlideHeight}>
                                <textarea
                                    value={answer.a}
                                    rows='3'
                                    className="desc-text-area"
                                    placeholder="Answer"
                                    style={{ width: "95%", display: "block", margin: "1.5rem auto 0.5rem" }}
                                    onChange={(event) => changeA(event.target.value, index)}
                                ></textarea>
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

export default Mart

export { getServerSideProps }