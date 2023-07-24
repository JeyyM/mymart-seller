import { Fragment } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Link from "next/link";

function Policies(martID) {
    const router = useRouter();
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;
    const privacy = martID.shopID.shopData.shopTerms.privacy

    const [markdownContent, setMarkdownContent] = useState(privacy);

    const acceptClass = "product-action-2 flex-row-align"
    const acceptText = "heading-tertiary margin-side solid-text-color"

    return (
        <Fragment>
            <Head>
                <title>Privacy Policy</title>
                <link rel="icon" type="image/jpeg" href={favicon} />
            </Head>

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

            <heading className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-policy svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">&nbsp;Privacy Policy&nbsp;</h1>
                <Link href={`/${router.query.shopid}/policies`} className="heading-tertiary add-categ-init" style={{ width: "max-content", textDecoration:"none" }}>
                &nbsp; Terms & Conditions &nbsp;</Link>
            </heading>

            <div className="policy-container">
                <div className="markdown-half markdown-preview" style={{width:"90vw", minHeight:"90vh"}}>
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
