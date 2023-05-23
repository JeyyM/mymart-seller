import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useRouter } from "next/router";


function ActiveNotifs(props) {
    const router = useRouter();
    const slide = {
        hidden: {
            x: "-100vw",
            opacity: 1,
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
            x: "-100vw",
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

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




    return (
        <Fragment>
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
        </Fragment>
    );
}

export default ActiveNotifs;
