import { Fragment } from "react";
import Head from "next/head";
import { getServerSideProps } from "../categories";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function Policies(martID) {
    const router = useRouter();
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon;

    const markdownData = `# Heading 1
## Heading 2
#### Heading 4
### Heading 3
##### Heading 5
###### Heading 6
    
## Horizontal Rules
    
#

---

## Emphasis
__This is bold text__
*This is italic text*
~~Strikethrough~~

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Lists

Bullet Lists

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces a new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit

Ordered Lists

1. Just put ordered numbers as usual
2. It will work as it normally should
1. Each new item can be put with 1. to automatically number

You may also start with advanced numbers

57. foo
1. bar

## Text Boxes

Highlight \`Put Text within backticks\`

Indented content gets put in text boxes

    line 1
    line 2
    line 3

Block code within \`\`\` backticks

\`\`\`
Sample text here...
\`\`\`

## Tables

Put content within this formatting to make tables

| Option  | Description |
| ------- | ----------- |
| Item 1  | Content 1   |
| Item 2  | Content 2   |
| Item 3  | Content 3   |

To right align, just put : on the lines

| Option    | Description |
| ---------: | -----------: |
| Item 1    | Content 1   |
| Item 2    | Content 2   |
| Item 3    | Content 3   |

## Links

[link text](http://youtube.com)

[link with title when you hover put within ""](http://youtube.com "hover text!")

## Images

![Name](https://octodex.github.com/images/minion.png "Hover Text")`;
    

    const [markdownContent, setMarkdownContent] = useState(markdownData);
    const [hidden, setHidden] = useState(false);

    const handleInputChange = (event) => {
        setMarkdownContent(event.target.value);
    };


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
