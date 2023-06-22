import { Fragment, useEffect } from "react";
import { getServerSideProps } from "../categories";
import Head from "next/head";
import { useState } from "react";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const libraries = ['places'];

export default function Details() {
  const positionZ = { lat: 41.8781, lng: -87.6298 };
  const positionB = { lat: 42.8781, lng: -88.6298 };

  const containerStyle = { width: '100%', height: '100%' };

  const [directions, setDirections] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const directionsServiceOptions = {
        destination: positionB,
        origin: positionZ,
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
  }, [isLoaded]);

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

  if (loadError) return "Error loading maps";

  return (
    <Fragment>
      <Head>
        <title>Contact Details & Footer</title>
      </Head>

      <section className="contact-container">
        <div className="detail-slot">
          <div style={{ height: "calc(100% - 16rem)" }}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={positionZ}
                zoom={10}
              >

                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      polylineOptions: {
                        strokeColor: 'blue',
                      },
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </div>
          <div style={{ backgroundColor: "white", height: "3rem", width: "90%", margin: "1rem auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span>{getTravelTime()}</span>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export { getServerSideProps };
