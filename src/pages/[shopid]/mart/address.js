import { Fragment } from "react"
import { getServerSideProps } from "../categories"
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker } from '@react-google-maps/api';
import { useState, useEffect } from "react";
import { Autocomplete } from '@react-google-maps/api';

function Address(martID) {
  const libraries = ['places'];
  const mapContainerStyle = { width: '100%', height: '100%' };

  const [center, setCenter] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
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
  }, []);

  const handleMapClick = (event) => {
    const newCenter = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    setCenter(newCenter);
    console.log("sup")

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

  return (
    <Fragment>
      <section className="location-container">
        <span className="page-heading">
          <div className="heading-icon-dropshadow">
            <div className="heading-icon-home svg-color">&nbsp;</div>
          </div>
          <h1 className="heading-primary no-margin">Address Details</h1>
        </span>

        <h1>{locationName}</h1>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          onClick={handleMapClick}
          onLoad={() => console.log("Map loaded")}
        >
          <Marker position={center} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />

          <div style={{ position: 'relative', width: '400px', height: '40px', margin: '0 auto' }}>
  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
    <input type="text" placeholder="Enter a location" style={{ width: '100%', height: '100%' }} />
  </Autocomplete>
</div>

        
        </GoogleMap>
      </section>
    </Fragment>
  );
}

export default Address;

export { getServerSideProps };
