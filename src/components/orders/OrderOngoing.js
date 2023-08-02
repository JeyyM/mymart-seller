import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";


function OrderOngoing(props) {
  const router = useRouter()
  const MotionLink = motion(Link);

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, '-');

    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    return formattedDateTime;
  }

  function formatDateTime2(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, '-');

    const formattedDateTime = `${formattedDate}`;

    return formattedDateTime;
  }

  const itemTotal = () => {
    let total = 0;

    props.item.order.forEach((item) => {
      total += item.cartValue;
    });

    return total;
  };

  const calculateTotal = () => {
    let total = 0;

    props.item.order.forEach((item) => {
      const totalCost = item.cartValue * parseFloat(item.price);
      total += totalCost;
    });

    return total + props.item.totals.fees;
  };

  const itemClasses = `${(props.item.status === "refused" || props.item.status === "cancelled") ? "category round-borderer-extra-red" : "category"}`;

  return (
    <>
      <div
        className={itemClasses}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: "relative" }}
        draggable={false}
      >
        <div className="image-container">
          <img src={props.item.order[0].image} className="category-img" alt={props.item.order[0].name}></img>
        </div>
        <div className="category-content">
          <div>
            <h2 className="heading-secondary category-name">{props.item.id}</h2>

            <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
              <div className="text-ter-calendar svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;On: {formatDateTime(props.item.currentTime)}</h2>
            </div>

            <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
              <h2 className="heading-tertiary">for&nbsp;</h2> {props.item.mode === "delivery" ? <div className="text-ter-shipping svg-tertiary">&nbsp;</div> : <div className="text-ter-basket svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{props.item.mode}</span></h2>
            </div>

            {props.item.status === "accepted" && <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
              <div className="text-ter-alarm svg-tertiary">&nbsp;</div> <h2 className="heading-tertiary">&nbsp;Expect By: {formatDateTime2(props.item.expectBy)}</h2>
            </div>}

            {props.item.finishedOn !== undefined && <div className="flex-row-spaceless" style={{ alignItems: "center" }}>
              {props.item.status === "finished" ? <div className="text-ter-finished svg-tertiary">&nbsp;</div> : <div className="text-ter-refused svg-tertiary">&nbsp;</div>} <h2 className="heading-tertiary">&nbsp;<span style={{ fontWeight: "900" }}>{props.item.status === "finished" ? "Finished" : props.item.status === "refused" ? "Refused" : "Cancelled"} On: {formatDateTime(props.item.finishedOn)}</span></h2>
            </div>}

          </div>
          <div className="product-number-container">
            <h2 className="heading-secondary product-numbers product-price">{itemTotal()} Item/s</h2>
            <h2 className="heading-secondary product-numbers">Total: {props.currency} {calculateTotal()}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderOngoing;
