import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

function CancelOrder(props) {
  const router = useRouter()

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

  const checkmark = (
    <svg viewBox="0 0 100 100" width="7rem" height="7rem">
      <path id="checkmark" d="M25,50 L40,65 L75,30" stroke="#FFFFFF" strokeWidth="8" fill="none"
        strokeDasharray="200" strokeDashoffset="200">
        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.5s" begin="indefinite" />
      </path>
    </svg>
  )

  function waitSeconds() {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  const handleClick = async (event) => {
    await handleSubmit(event);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    props.finish(props.order)

    await waitSeconds();

    setLoading(false)
    setCompletion(true)

    router.reload()
  }

  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(false)

  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    if (!props.order || !props.order.cancelDuration) {
        setTimeDifference('Invalid order');
        return;
    }

    const interval = setInterval(() => {
        const currentTime = new Date();
        const cancelTime = new Date(props.order.cancelDuration);
        const timeDifferenceMs = cancelTime - currentTime;

        if (timeDifferenceMs <= 0) {
            clearInterval(interval);
            setTimeDifference('Cancellation period has passed');
        } else {
            const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

            const timeDifferenceStr = `${days > 0 ? days + ' days, ' : ''}${hours > 0 ? hours + ' hours, ' : ''}${minutes > 0 ? minutes + ' minutes, ' : ''}${seconds} seconds`;
            setTimeDifference(timeDifferenceStr);
        }
    }, 1000);

    return () => clearInterval(interval);
}, [props.order]);

  return (
    <Fragment>
      <AnimatePresence
        initial={true}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {props.modalStatus && (
          <Backdrop onClick={loading ? null : props.disable} className="categ-modals">
            <motion.div
              key={props.chosenItem}
              onClick={(e) => e.stopPropagation()}
              className={`confirm-modal`}
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="heading-secondary no-margin">Cancel Order?</h2>
              <div className="confirm-contents">
                <div className="warning-logo">&nbsp;</div>
                <h2 className="confirm-text heading-tertiary">{props.msg}</h2>
                <h2 className="heading-tertiary" style={{ margin: "1rem" }}>Are you sure you want to cancel your order? This cannot be undone. There will be a cancellation fee of {props.currency} {(props.order.totals.order * (props.order.cancelFee / 100)).toFixed(2)}.</h2>
              </div>
              <div className="add-categ-buttons">
                <button className="product-action-1 heading-secondary categ-button-1" type="button" onClick={props.disable} disabled={loading}>Cancel</button>
                <button className="product-action-3 heading-secondary categ-button-2 white" type="button" onClick={() => {if (timeDifference !== 'Cancellation period has passed'){handleClick(event)} else {props.disable()}}} disabled={loading}>{loading ? <div className="spinner"></div> : (completion ? checkmark : "Confirm")}</button>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default CancelOrder;
