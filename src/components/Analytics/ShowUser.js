import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const libraries = ['places'];

function ShowUser(props) {
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

    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/\//g, '-');

        const formattedDateTime = `${formattedDate}`;

        return formattedDateTime;
    }

    const today = new Date()

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
        const dateObject = new Date(props.user.birth);
        const birthyear = dateObject.getFullYear()
        const age = today.getFullYear() - birthyear

        const containerStyle = { width: '100%', height: '20rem' };

        userCoords = props.user.coords

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
                                key={props.user.email}
                                onClick={(e) => e.stopPropagation()}
                                className="edit-order-modal"
                                variants={appear}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <span className="page-heading">
                                    <h2 className="heading-primary no-margin">User Profile</h2>
                                    <div className="heading-icon-dropshadow">
                                        <div className="heading-icon-profile svg-color">&nbsp;</div>
                                    </div>
                                </span>

                                <div className="show-user-grid" style={{ gap: "1rem" }}>
                                    <div className="user-data-col">
                                        <div className="flex-row">
                                            <div className="text-sec-name svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.username}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-sec-mail svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.email}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-sec-phone svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.phone}</h2>
                                        </div>
                                        <div className="flex-row">
                                                <div className="text-ter-cake svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{formatDateTime(props.user.birth)} - {age} years old</h2>
                                        </div>
                                        <div className="flex-row">
                                                {props.user.gender === "Male" &&
                                                    <div className="text-ter-gender1 svg-tertiary">&nbsp;</div>
                                                }
                                                {props.user.gender === "Female" &&
                                                    <div className="text-ter-gender2 svg-tertiary">&nbsp;</div>
                                                }
                                                {props.user.gender === "Other" &&
                                                    <div className="text-ter-gender3 svg-tertiary">&nbsp;</div>
                                                }
                                                <h2 className="heading-tertiary">{props.user.gender}</h2>
                                            </div>

                                        <div className="flex-row">
                                            <div className="text-ter-occupation svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.other ? props.user.customjob : props.user.job}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-company svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.company}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-calendar svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">Made on: {formatDateTime(props.user.creation)}</h2>
                                        </div>
                                    </div>

                                    <div className="user-data-col">
                                    <div className="flex-row">
                                            <div className="text-ter-receipt svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">Total Orders: {props.user.orderCount}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-profit svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">Total Profit: {props.currency} {props.user.totalProfit}</h2>
                                        </div>
                                        <div className="flex-row">
                                            <div className="text-ter-tags svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">Total Spent: {props.currency} {props.user.totalSpent}</h2>
                                        </div>

                                        <div className="flex-row">
                                            <div className="text-ter-pin svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.location} <span style={{fontWeight:"900"}}>({getTravelTime()}) away.</span></h2>
                                        </div>

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
                                </div>

                                <div className="margin-side" style={{ marginTop: "1rem" }}>
                                    <button className="product-action-1 heading-secondary" onClick={props.disable} style={{ width: "18rem", margin: "0" }}>Close</button>
                                </div>


                            </motion.div>
                        </Backdrop>
                    )}
                </AnimatePresence>
            </Fragment>
        );
    }
}

export default ShowUser;