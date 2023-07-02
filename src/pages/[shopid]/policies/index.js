import { Fragment } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function Policies(martID) {
    const router = useRouter();
    const [markdownContent, setMarkdownContent] = useState("");
    const [hidden, setHidden] = useState(false);

    const handleInputChange = (event) => {
        setMarkdownContent(event.target.value);
    };

    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;

    return (
        <Fragment>
            <Head>
                <title>Terms and Conditions</title>
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

            <span className="page-heading">
                <div className="heading-icon-dropshadow">
                    <div className="heading-icon-policy svg-color">&nbsp;</div>
                </div>
                <h1 className="heading-primary no-margin">&nbsp;Terms and Conditions&nbsp;</h1>
            </span>

            <div className="policy-container">
                <textarea
                    value={markdownContent}
                    onChange={handleInputChange}
                    placeholder="Enter Markdown Content"
                    className="markdown-half markdown-textarea"
                ></textarea>
                <div className="markdown-half markdown-preview">
                    <ReactMarkdown
                        className="markdown-body"
                        children={markdownContent}
                        skipHtml={false} // Render raw HTML within Markdown
                        remarkPlugins={[gfm]}
                    />

                </div>
            </div>
        </Fragment>
    );
}

export default Policies;

export { getServerSideProps };
