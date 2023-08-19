import { Fragment, useEffect } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import MdSample from "@/components/terms/MdSample";
import Link from "next/link";
import pako from "pako";

function Policies({ shopID, screenWidth }) {

    const compressedBytes = new Uint8Array(atob(shopID).split("").map((c) => c.charCodeAt(0)));
    const decompressedBytes = pako.inflate(compressedBytes, { to: "string" });
    const final = JSON.parse(decompressedBytes);

    const router = useRouter();
    const favicon = final.shopData.shopDetails.imageData.icons.icon;
    const terms = final.shopData.shopTerms.terms

    const [markdownContent, setMarkdownContent] = useState(terms);
    const [hidden, setHidden] = useState(false);
    function handleHidden() {
        setHidden(!hidden)
    }

    const handleInputChange = (event) => {
        setMarkdownContent(event.target.value);
    };

    const [help, setHelp] = useState(false)
    function handleHelp() {
        setHelp(!help)
    }

    const [loading, setLoading] = useState(false)

    const acceptClass = "product-action-2 flex-row-align"
    const acceptText = "heading-tertiary margin-side solid-text-color"

    function waitSeconds() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    async function submitChanges() {
        setLoading(true)

        const response = await fetch(
            `../../api/set-terms?martid=${router.query.shopid}&key=terms`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(markdownContent)
            }
        );
        const data = await response.json();

        await waitSeconds()
        router.reload()
    }

    const [hiddenWrite, setHiddenWrite] = useState(true)
    function handleHiddenWrite() {
        setHiddenWrite(!hiddenWrite)
    }

    useEffect(() => {
        if (screenWidth <= 1000) { setHidden(false); setHiddenWrite(true) }
    }, [screenWidth])

    return (
        <Fragment>
            <Head>
                <title>Terms & Conditions</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <MdSample modalStatus={help} disable={handleHelp} screenWidth={screenWidth} hidden={hidden} hiddenWrite={hiddenWrite}></MdSample>

            <style jsx global>{`
        /* Use GitHub Markdown CSS globally */
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }

        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
      `}</style>

            {screenWidth <= 1000 && <div className="design-prev-set">
                <button className="product-action-1 design-prev-button" onClick={handleHiddenWrite}>
                    <div className="exchange-preview svg-outline margin-side">&nbsp;</div>
                </button>
            </div>}

            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-policy svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin" style={{ fontSize: `${screenWidth > 300 ? "3.5rem" : "3rem"}` }}>&nbsp;Terms & Conditions&nbsp;</h1>
                {screenWidth > 600 && <>
                    <Link href={`/${router.query.shopid}/policies/privacy`} className="heading-tertiary add-categ-init" style={{ width: "max-content", textDecoration: "none" }} disabled={loading}>
                        &nbsp; Privacy Policy &nbsp;</Link>
                    <button onClick={submitChanges} className={acceptClass} style={{ width: "18rem", margin: "1rem 1rem", height: "3.5rem" }} disabled={loading}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>{loading ? "Submitting..." : "Submit Changes"}</h3></button>
                </>}
                <button className="help-button" onClick={handleHelp} style={{ zIndex: "99" }}><div className="heading-icon-question svg-color">&nbsp;</div></button>
            </span>

            {screenWidth <= 600 && <span className="page-heading">
                <Link href={`/${router.query.shopid}/policies/privacy`} className="heading-tertiary add-categ-init" style={{ width: "max-content", textDecoration: "none" }} disabled={loading}>
                    &nbsp; Privacy Policy &nbsp;</Link>
                <button onClick={submitChanges} className={acceptClass} style={{ width: "18rem", margin: "1rem 1rem", height: "3.5rem" }} disabled={loading}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>{loading ? "Submitting..." : "Submit Changes"}</h3></button>
            </span>}

            <div className="policy-container">
                <div style={{ position: "relative" }}>
                    {screenWidth > 1000 && <button className="product-action-1 hide-button" onClick={handleHidden}>
                        <div className="heading-icon-eye svg-outline margin-side">&nbsp;</div>
                    </button>}
                    {screenWidth > 1000 ? (
                        !hidden && (
                            <textarea
                                value={markdownContent}
                                onChange={handleInputChange}
                                placeholder="Enter Markdown Content"
                                className="markdown-half markdown-textarea"
                                style={{ width: `${screenWidth <= 1000 ? "90vw" : "45vw"}` }}
                            ></textarea>
                        )
                    ) : (
                        !hiddenWrite && (
                            <textarea
                                value={markdownContent}
                                onChange={handleInputChange}
                                placeholder="Enter Markdown Content"
                                className="markdown-half markdown-textarea"
                                style={{ width: `${screenWidth <= 1000 ? "90vw" : "45vw"}` }}
                            ></textarea>
                        )
                    )}

                </div>
                {hiddenWrite && <div className="markdown-half markdown-preview" style={{ width: `${hidden || screenWidth <= 1000 ? "90vw" : "45vw"}` }}>
                    <ReactMarkdown
                        className="markdown-body"
                        skipHtml={false}
                        remarkPlugins={[gfm]}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </div>}
            </div>
        </Fragment>
    );
}

export default Policies;

export { getServerSideProps };
