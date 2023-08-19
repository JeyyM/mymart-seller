import Backdrop from "../Modal/Backdrop";
import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductBarChart from "./ProductBar";
import seedrandom from "seedrandom";

function ModalCategory({data, modalStatus, disable, currency}) {
  const router = useRouter()
  console.log("data here", data)

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

  let totalProfit = 0
  let totalOrders = 0
  let combinedProducts = []

  const [rank3, setRank3] = useState(1)
  const handleRank3 = () => {
    if (rank3 < 2) {
      setRank3(rank3 + 1);
    } else {
      setRank3(1);
    }
  };

  const [rank4, setRank4] = useState(1)
  const handleRank4 = () => {
    if (rank4 < 3) {
      setRank4(rank4 + 1);
    } else {
      setRank4(1);
    }
  };

  if (data !== null){

    const categColor = () => {
      const rng = seedrandom(data[0].category.toString());
      return '#' + Math.floor(rng() * 16777215).toString(16);
  }

  const color = categColor()
  
  data.forEach((item) => {
    totalProfit += item.profit;
    totalOrders += item.orders;
  });

  combinedProducts = data.map((item, index) => ({
     name: item.name, profit: item.profit, orders: item.orders
  }));

  console.log("fucking", data)
  
  return (
    <Fragment>
      <AnimatePresence
        initial={true}
        mode={"wait"}
        onExitComplete={() => null}
      >
        {modalStatus && (
          <Backdrop onClick={disable}className="categ-modals">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={`categ-modal`}
              variants={appear}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{height:"auto"}}
            >
                  <span className="page-heading">
          <div style={{backgroundColor:`${color}`, height:"3rem", width:"3rem", borderRadius:"50%"}}>&nbsp;</div>
        <h1 className="heading-primary no-margin" style={{whiteSpace:"pre-wrap"}}>&nbsp;{data[0].category}</h1>
      </span>

      <div className='flex-row' style={{ justifyContent: "space-between" }}>
      <div className="flex-row" style={{ paddingBottom: '0rem' }}>
              {rank3 === 1 ? <><div className="text-sec-profit svg-tertiary">&nbsp;</div></> : <><div className="text-sec-cube svg-tertiary">&nbsp;</div></>}
              <h2 className="heading-secondary">{rank3 === 1 ? <>Profits:{currency} {totalProfit}</> : <>Buys: {totalOrders} order/s</>}</h2>
            </div>

            <div className='flex-row' style={{marginRight:"1rem"}}>
            <div className="heading-icon-average svg-secondary" onClick={handleRank4}>&nbsp;</div>
              <div className="heading-icon-tune svg-secondary" onClick={handleRank3}>&nbsp;</div>
            </div>
          </div>
      <div className='detail-chart' style={{transform:"translateY(-1rem)"}}>
              <ProductBarChart data={combinedProducts} chosen={rank3} sort={rank4}></ProductBarChart>
          </div>

          <div className="cart-rows">
                {data.map((item, index) => (
                  <div className="cart-row" key={index}>
                    <img className="cart-img round-borderer" src={item.image} alt={item.name}></img>
                    <div className="flex-col-2" style={{ width: "auto" }}>
                      <a href={`/${item.url}`} target="_blank" className="heading-secondary" style={{ whiteSpace: "pre-wrap", display: "inline", textDecoration: "none" }}>{item.name.length > 32 ? item.name.substring(0, 20) + "..." : item.name}</a>
                    </div>

                    <div className="cart-pay">
                      <h2 className="heading-tertiary" style={{ marginBottom: "1rem" }}>Price: {currency} {item.price} / {item.unit}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </Fragment>
  );
        }
}

export default ModalCategory;
