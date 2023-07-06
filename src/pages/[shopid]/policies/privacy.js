import { Fragment } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import MdSample from "@/components/terms/MdSample";
import Link from "next/link";

function Policies(martID) {
    const router = useRouter();
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;
    const privacy = martID.shopID.shopData.shopTerms.privacy

    const [markdownContent, setMarkdownContent] = useState(privacy);
    const [hidden, setHidden] = useState(false);
    function handleHidden(){
        setHidden(!hidden)
    }

    const handleInputChange = (event) => {
        setMarkdownContent(event.target.value);
    };

    const [help, setHelp] = useState(false)
    function handleHelp(){
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
            `../../api/set-terms?martid=${router.query.shopid}&key=privacy`,
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

    return (
        <Fragment>
            <Head>
                <title>Privacy Policy</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>
            <MdSample modalStatus={help} disable={handleHelp}></MdSample>

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

            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-policy svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">&nbsp;Privacy Policy&nbsp;</h1>
                <Link href={`/${router.query.shopid}/policies`} className="heading-tertiary add-categ-init" style={{ width: "max-content", textDecoration:"none" }} disabled={loading}>
                &nbsp; Terms & Conditions &nbsp;</Link>
                <button onClick={submitChanges} className={acceptClass} style={{ width: "18rem", margin: "1rem 1rem", height: "3.5rem" }} disabled={loading}><h3 className={acceptText} style={{ transform: "translateY(0rem)" }}>{loading ? "Submitting..." : "Submit Changes"}</h3></button>

                <button className="help-button" onClick={setHelp}><div className="heading-icon-question svg-color">&nbsp;</div></button>
            </span>

            <div className="policy-container">
            <div style={{position:"relative"}}>
            <button className="product-action-1 hide-button" onClick={handleHidden}>
                        <div className="heading-icon-eye svg-outline margin-side">&nbsp;</div>
            </button>
                {!hidden && <textarea
                    value={markdownContent}
                    onChange={handleInputChange}
                    placeholder="Enter Markdown Content"
                    className="markdown-half markdown-textarea"
                >
                </textarea>}
                </div>
                <div className="markdown-half markdown-preview" style={{width:`${hidden ? "90vw" : "45vw"}`}}>
                    <ReactMarkdown
                        className="markdown-body"
                        children={markdownContent}
                        skipHtml={false}
                        remarkPlugins={[gfm]}
                    />

                </div>
            </div>
        </Fragment>
    );
}

export default Policies;

export { getServerSideProps };
