import { Fragment, useEffect } from "react"
import Head from "next/head"
import { useState } from "react"
import { useRouter } from "next/router"
import { getServerSideProps } from "../_app"

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

export default function Details({ shopID, user }) {
  const footerItems = shopID.shopData.shopDetails.footerData
  const favicon = shopID.shopData.shopDetails.imageData.icons.icon

  let userCard = {}
  let userLocation = ""
  let userCoords = {}

  console.log(user)

  if (user !== undefined) {
      userCard = user.card
      userLocation = user.location
      userCoords = user.locationCoords
  }

  const router = useRouter()

  const mapContainerStyle = { width: '100%', height: '100%' };

  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState(userLocation);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (window.google && window.google.maps && center) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: center }, (results, status) => {
        if (status === 'OK') {
          setLocationName(results[0].formatted_address);
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }
  }, [center]);

  function currentLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function resetLoc() {
    setCenter(userLocation)
  }

  useEffect(() => { setCenter(userCoords) }, [])

  const handleMapClick = (event) => {
    const newCenter = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCenter(newCenter);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCenter }, (results, status) => {
      if (status === 'OK') {
        setLocationName(results[0].formatted_address);
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry !== undefined) {
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setLocationName(place.formatted_address);
      } else {
        console.log('Geocode was not successful for the following reason: ', status);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return <Fragment>
    <Head>
      <title>Contact Details & Footer</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
    </Head>

    <section className="contact-container">

      <div className="detail-slot">

        <h2 className="heading-tertiary">{locationName}</h2>

        <div style={{ height: "calc(100% - 16rem)" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
            onLoad={() => console.log("Map loaded")}
          >
            <Marker position={center} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />

            <div style={{ position: 'relative', width: '50%', height: '40px', margin: '0 auto' }}>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input type="text" placeholder="Enter a location" style={{ width: '100%', height: '100%', border: "1px solid black", padding: "1rem" }} />
              </Autocomplete>
            </div>
          </GoogleMap>
        </div>

        <div className="flex-row" style={{ marginTop: "1rem", width: "100%", justifyContent: "space-around" }}>
          <button onClick={currentLoc} className="product-action-2 heading-secondary">Current Location</button>
          <button onClick={resetLoc} className="product-action-3 heading-secondary white">Reset to Default</button>
        </div>
      </div>

    </section>
  </Fragment>
}

export { getServerSideProps }