import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import CustomizedPicker from "../Mart/CustomizedPicker";

const libraries = ['places'];

function AcceptOrder(props) {
    const router = useRouter()
    const colormode = props.colormode
    let totals = 0
    let filteredOrders = []
    let removedItems = []

    if (props.modalStatus){
        filteredOrders = props.order.order.filter(order => {
            return !props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          removedItems = props.order.order.filter(order => {
            return props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          props.order.order = filteredOrders
          const totalPrice = filteredOrders.reduce((total, item) => {
            const price = parseFloat(item.price);
            const cartValue = item.cartValue;
            return total + (price * cartValue);
          }, 0);

          totals = totalPrice + props.order.totals.fees

          props.order.totals.order = totalPrice
    }
    
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

    const [Expect, setExpect] = useState("");
    const handleExpectChange = (date) => {
        setExpect(date);
    };

    const [ownerMessage, setOwnerMessage] = useState("")
    const handleMessageChange = (event) => {
        setOwnerMessage(event.target.value);
    };

    const [directions, setDirections] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
        libraries,
    });
    const martCoords = props.martCoords

    let userCoords = {}
    let chosenMode = {}

    if (colormode === true) {
        chosenMode = props.design.lightDesign
    } else if (colormode === false) {
        chosenMode = props.design.darkDesign
    }
    
    const [dateValid, setDateValid] = useState(true)

    useEffect(() => {
        setExpect("")
        setDateValid(true)
}, [props.modalStatus])


    useEffect(() => {
        if (isLoaded) {
            const directionsServiceOptions = {
                destination: userCoords,
                origin: martCoords,
                travelMode: 'DRIVING',
            };

            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(directionsServiceOptions, (response, status) => {
                if (status === 'OK') {
                    setDirections(response);
                } else {
                    console.log('Directions request failed due to: ' + status);
                }
            });
        }
    }, [isLoaded, props.modalStatus]);

    if (props.user !== null) {
        const containerStyle = { width: '50%', height: '20rem', margin: "0 auto" };

        userCoords = props.user.locationCoords


        const getTravelTime = () => {
            if (directions && directions.routes && directions.routes.length > 0) {
                const route = directions.routes[0];
                if (route.legs && route.legs.length > 0) {
                    const leg = route.legs[0];
                    return leg.duration.text;
                }
            }
            return '';
        };

        async function confirm() {
            const currentTime = new Date();
            const timeDifferenceMs = Expect.$d - currentTime;

            if (timeDifferenceMs > 0 && !isNaN(timeDifferenceMs)){
                setDateValid(true)

            await props.change(props.order, ownerMessage, Expect)
            props.disable()
         
        } else {
            setDateValid(false)
        }
        
        }

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
                                onClick={(e) => e.stopPropagation()}
                                className="edit-order-modal"
                                variants={appear}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <span className="page-heading">
                                    <h2 className="heading-primary no-margin">Accept Order?</h2>
                                </span>

                                <h2 className="heading-tertiary" style={{ margin: "1rem" }}>Upon accepting, the order will be put into the approved orders. You may unapprove or finish this order there. The customer will be notified of approved orders. Orders which were renamed, removed, or have deleted categories will be ignored. Empty orders will still be accepted.</h2>

                                {/* Are you sure you want to refuse the order? Upon refusing, the customer won't be charged. This order will be put into the customer records. Data such as the stock will be returned. This cannot be undone. */}

                                <div className="refuse-grid-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                                    <div className="flex-row">
                                        <div className="text-ter-pin svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.location} <span style={{ fontWeight: "900" }}>({getTravelTime()}) away</span></h2>
                                    </div>
                                    <h2 className="heading-secondary">Order Total: {props.currency} {totals}</h2>
                                </div>
                                <div className="">

                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={martCoords}
                                        zoom={10}
                                        options={{
                                            mapTypeControl: false
                                        }}
                                    >

                                        {directions && (
                                            <DirectionsRenderer
                                                directions={directions}
                                                options={{
                                                    polylineOptions: {
                                                        strokeColor: 'blue',
                                                        strokeOpacity: 0.5
                                                    },
                                                }}
                                            />
                                        )}
                                    </GoogleMap>
                                </div>

                                <div className="flex-row flex-row-align" style={{marginTop:"1rem"}}>
                                <h2 className="heading-secondary">Expect By: </h2>
                                <CustomizedPicker colormode={chosenMode} selectedDate={Expect} handleDateChange={handleExpectChange} valid={dateValid} title="Date"></CustomizedPicker>
                                </div>

                                <div className="dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                    <h2 className="heading-secondary">Approval Message</h2>

                                    <textarea
                                        rows='3'
                                        value={ownerMessage}
                                        className={"desc-text-area"}
                                        placeholder="Approval Message"
                                        onChange={handleMessageChange}
                                    ></textarea>
                                </div>

                                <div className="order-button-grid-2">
                                    <button className="product-action-1 heading-secondary refuse-button" onClick={props.disable}>Cancel</button>
                                    <button className="product-action-2 heading-secondary refuse-button" onClick={confirm}>Approve</button>
                                </div>
{/* 
                                <div className="form-group" style={{ marginTop: "1rem" }}>
                                    <CustomizedPicker colormode={chosenMode} selectedDate={Expect} handleDateChange={handleExpectChange} valid={true}></CustomizedPicker>
                                </div> */}


                            </motion.div>
                        </Backdrop>
                    )}
                </AnimatePresence>
            </Fragment>
        );
    }
}

export default AcceptOrder;