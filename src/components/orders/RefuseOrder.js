import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const libraries = ['places'];

function RefuseOrder(props) {
    const router = useRouter()
    let totals = 0
    // if (props.modalStatus){
    //     totals = props.order.totals.order + props.order.totals.fees
    // }
    let filteredOrders = []
    let removedItems = []

    if (props.modalStatus){
        filteredOrders = props.order.order.filter(order => {
            return !props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          removedItems = props.order.order.filter(order => {
            return props.removeList.some(pair => pair[0] === order.name && pair[1] === order.category);
          });

          const removedItemsTotalPrice = removedItems.reduce((total, item) => total + parseFloat(item.price), 0);

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
            await props.change(props.order, ownerMessage)
            props.disable()
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
                                    <h2 className="heading-primary no-margin">Refuse Order?</h2>
                                </span>

                                <div className="confirm-contents">
                                    <div className="warning-logo">&nbsp;</div>
                                </div>

                                <h2 className="heading-tertiary" style={{ margin: "1rem" }}>Are you sure you want to refuse the order? Upon refusing, the customer won&apos;t be charged. This order will be put into the customer records. Data such as the stock will be returned. This cannot be undone.</h2>


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

                                <div className="dark-underline" style={{ margin: "1rem 0", paddingBottom: "1rem" }}>
                                    <h2 className="heading-secondary">Refusal Message</h2>

                                    <textarea
                                        rows='3'
                                        value={ownerMessage}
                                        className={"desc-text-area"}
                                        placeholder="Refusal Message"
                                        onChange={handleMessageChange}
                                    ></textarea>
                                </div>

                                <div className="order-button-grid-2">
                                    <button className="product-action-1 heading-secondary refuse-button" onClick={props.disable} >Cancel</button>
                                    <button className="product-action-3 white heading-secondary refuse-button" onClick={confirm}>Refuse</button>
                                </div>


                            </motion.div>
                        </Backdrop>
                    )}
                </AnimatePresence>
            </Fragment>
        );
    }
}

export default RefuseOrder;