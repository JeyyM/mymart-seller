import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Backdrop from "../Modal/Backdrop";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function MdSample(props) {
    const router = useRouter()
    const {screenWidth, hiddenWrite} = props

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

    const markdownData = `
## These are the formatting for the text to be able to design your terms and conditions and privacy policy pages. Simply do what is put into the editable text area.
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
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

    useEffect(() => {setMarkdownContent(markdownData)}, [props.modalStatus])

    const handleInputChange = (event) => {
        setMarkdownContent(event.target.value);
    };

    return (
        <Fragment>
            <AnimatePresence
                initial={true}
                mode={"wait"}
                onExitComplete={() => null}
            >
                {props.modalStatus && (
                    <Backdrop onClick={props.disable} className="categ-modals">
                        <motion.div
                            key={props.chosenItem}
                            className="policy-container-modal"
                            variants={appear}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                    {screenWidth <= 1000 && hiddenWrite ? (
                        <div onClick={(e) => e.stopPropagation()}>
                            <textarea
                                value={markdownContent}
                                onChange={handleInputChange}
                                placeholder="Enter Markdown Content"
                                className="markdown-half markdown-textarea"
                                style={{width:`${screenWidth <= 1000 ? "90vw" : "45vw"}`}}
                                onClick={(e) => e.stopPropagation()}
                            ></textarea>
                        </div>
                    ) : (
                        screenWidth > 1000 && (
                            <div onClick={(e) => e.stopPropagation()}>
                            <textarea
                                value={markdownContent}
                                onChange={handleInputChange}
                                placeholder="Enter Markdown Content"
                                className="markdown-half markdown-textarea"
                                style={{width:`${screenWidth <= 1000 ? "90vw" : "45vw"}`}}
                            ></textarea>
                            </div>
                        )
                    )}


                   { screenWidth <= 1000 && !hiddenWrite ? (<div className="markdown-half markdown-preview" style={{ width: `${screenWidth <= 1000 ? "90vw" : "45vw"}` }} onClick={(e) => { e.stopPropagation() }}>
                                <ReactMarkdown
                                    className="markdown-body"
                                    skipHtml={false}
                                    remarkPlugins={[gfm]}
                                >
                                {markdownContent}
                                </ReactMarkdown>
                            </div>) : screenWidth > 1000 && (<div className="markdown-half markdown-preview" style={{ width: `${screenWidth <= 1000 ? "90vw" : "45vw"}` }} onClick={(e) => { e.stopPropagation() }}>
                                <ReactMarkdown
                                    className="markdown-body"
                                    skipHtml={false}
                                    remarkPlugins={[gfm]}
                                >
                                {markdownContent}
                                </ReactMarkdown>
                            </div>)}

                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </Fragment>
    );
}

export default MdSample;
