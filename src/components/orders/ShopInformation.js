import { motion, AnimatePresence, } from "framer-motion";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import Backdrop from "../Modal/Backdrop";
import { useRouter } from "next/router";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Link from "next/link";

const libraries = ['places'];

function ShopInformation(props) {
  const {screenWidth} = props
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
        destination: martCoords,
        origin: userCoords,
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
    const dateObject = new Date(props.user.profile.birth);
    const birthyear = dateObject.getFullYear()
    const age = today.getFullYear() - birthyear

    const containerStyle = { width: '100%', height: '20rem' };

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

    const numbers = props.details.shopPhone
    const emails = props.details.shopEmails
    const socials = props.details.shopSocials
    const paymentDetails = props.payment
    const fees = paymentDetails.Adds
    const takebacks = paymentDetails.Takebacks
    const checkoutData = paymentDetails.checkoutInfo

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
                className="edit-order-modal round-borderer"
                variants={appear}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span className="page-heading">
                  <div className="heading-icon-magnifying svg-color">&nbsp;</div>
                  <h2 className="heading-secondary no-margin">&nbsp;Mart Information</h2>
                </span>

                <div className="info-3" style={{ gap: "1rem" }}>
                  <div className="user-data-col">
                    <span className="page-heading">
                      <div className="text-sec-phone svg-secondary">&nbsp;</div>
                      <h2 className="heading-secondary no-margin">&nbsp;Phone</h2>
                    </span>
                    {numbers.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
                    {numbers.map((num, index) => {
                      return <h3 key={index} className="heading-tertiary">{num}</h3>;
                    })}
                  </div>

                  <div className="user-data-col">
                    <span className="page-heading">
                      <div className="text-sec-mail svg-secondary">&nbsp;</div>
                      <h2 className="heading-secondary no-margin">&nbsp;Email</h2>
                    </span>
                    {emails.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
                    {emails.map((email, index) => {
                      return <h3 key={index} className="heading-tertiary">{email}</h3>;
                    })}

                  </div>

                  <div className="user-data-col">
                    <span className="page-heading">
                      <div className="text-sec-socials svg-secondary">&nbsp;</div>
                      <h2 className="heading-secondary no-margin">&nbsp;Socials</h2>
                    </span>
                    <div className="socials-container">
                      {socials.length === 0 ? <h3 className="heading-tertiary">-</h3> : ""}
                      {socials.map((index) => {
                        return <Link key={index.link} href={index.link} target="_blank">
                          <img className="social-icon" src={`/socials/${index.type}.webp`}></img>
                        </Link>
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid-col-2" style={{ marginTop: "1rem", gridTemplateColumns: `${screenWidth > 600 ? "1fr 1fr" : "1fr"}` }}>
                  <div className="user-data-col">
                  <span className="page-heading">
                      <div className="text-sec-pin svg-secondary">&nbsp;</div>
                      <h2 className="heading-secondary no-margin">&nbsp;Location</h2>
                    </span>
                    <div className="flex-row">
                      <h2 className="heading-tertiary">{props.details.shopLocation} <span style={{ fontWeight: "900" }}>({getTravelTime()}) away.</span></h2>
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

                  {screenWidth > 600 && <div className="user-data-col" style={{ paddingLeft: "1rem" }}>
                    <h2 className="heading-tertiary" style={{fontWeight: "900" }}>The owner may edit your orders such as reducing ordered amounts and adding new products. Edited items will be marked as such.</h2>
                    {takebacks.allowRefunds === false ? <div>
                      <h2 className="heading-tertiary">Refunds are not allowed.</h2>
                    </div> : <div>
                      <h2 className="heading-tertiary">Refunds are allowed within {takebacks.refundCount} {takebacks.refundDuration}/s of receiving with a penalty of {takebacks.refundFee}% of the order's total, fees not included. Items must be returned on-site in good condition within the refund period.</h2>
                    </div>}

                    {takebacks.allowCancel === false ? <div>
                      <h2 className="heading-tertiary">Cancellations are not allowed.</h2>
                    </div> : <div>
                      <h2 className="heading-tertiary">Cancellations are allowed within {takebacks.cancelCount} {takebacks.cancelDuration}/s of ordering with a penalty of {takebacks.cancelFee}% of the order's total, fees not included. Approved orders cannot be cancelled.</h2>
                    </div>}
                    <Link href={`/${router.query.shopid}/terms`}><h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Terms and Conditions and Privacy Policy</h2></Link>

                  </div>}
                </div>
                {screenWidth <= 600 && <div className="user-data-col" style={{ paddingLeft: "1rem", marginTop:"1rem" }}>
                    <h2 className="heading-tertiary" style={{fontWeight: "900" }}>The owner may edit your orders such as reducing ordered amounts and adding new products. Edited items will be marked as such.</h2>
                    {takebacks.allowRefunds === false ? <div>
                      <h2 className="heading-tertiary">Refunds are not allowed.</h2>
                    </div> : <div>
                      <h2 className="heading-tertiary">Refunds are allowed within {takebacks.refundCount} {takebacks.refundDuration}/s of receiving with a penalty of {takebacks.refundFee}% of the order's total, fees not included. Items must be returned on-site in good condition within the refund period.</h2>
                    </div>}

                    {takebacks.allowCancel === false ? <div>
                      <h2 className="heading-tertiary">Cancellations are not allowed.</h2>
                    </div> : <div>
                      <h2 className="heading-tertiary">Cancellations are allowed within {takebacks.cancelCount} {takebacks.cancelDuration}/s of ordering with a penalty of {takebacks.cancelFee}% of the order's total, fees not included. Approved orders cannot be cancelled.</h2>
                    </div>}
                    <Link href={`/${router.query.shopid}/terms`}><h2 className="heading-tertiary" style={{ fontWeight: "900" }}>Terms and Conditions and Privacy Policy</h2></Link>

                  </div>}
                <h3 className="heading-secondary" style={{ marginTop: "1rem" }}>Checkout Message</h3>
                <h3 className="heading-tertiary">{checkoutData.message}</h3>

                <div className="margin-side">
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

export default ShopInformation;

{/* <div className="grid-col-2" style={{ gap: "1rem" }}>
<div className="user-data-col">
    <div className="flex-row">
        <div className="text-sec-name svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.profile.last}, {props.user.profile.first}</h2>
    </div>
    <div className="flex-row">
        <div className="text-sec-mail svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.email}</h2>
    </div>
    <div className="flex-row">
        <div className="text-sec-phone svg-secondary">&nbsp;</div><h2 className="heading-secondary">{props.user.profile.pnum}</h2>
    </div>
    <div className="flex-row">
            <div className="text-ter-cake svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{formatDateTime(props.user.profile.birth)} - {age} years old</h2>
    </div>
    <div className="flex-row">
            {props.user.profile.gender === "Male" &&
                <div className="text-ter-gender1 svg-tertiary">&nbsp;</div>
            }
            {props.user.profile.gender === "Female" &&
                <div className="text-ter-gender2 svg-tertiary">&nbsp;</div>
            }
            {props.user.profile.gender === "Other" &&
                <div className="text-ter-gender3 svg-tertiary">&nbsp;</div>
            }
            <h2 className="heading-tertiary">{props.user.profile.gender}</h2>
        </div>

    <div className="flex-row">
        <div className="text-ter-occupation svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.profile.other ? props.user.profile.customjob : props.user.profile.job}</h2>
    </div>
    <div className="flex-row">
        <div className="text-ter-company svg-tertiary">&nbsp;</div><h2 className="heading-tertiary">{props.user.profile.company}</h2>
    </div>
</div>

<div className="user-data-col">
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
</div> */}