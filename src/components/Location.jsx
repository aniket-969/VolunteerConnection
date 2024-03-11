import React from 'react'
import { useState, useEffect } from 'react';
import { fetchLocationDetails } from '../utils/fetchLocation';
import { useUserContext } from '../context/AuthProvider';

const Location = () => {

  const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
  const {userLocation,setUserLocation,locationDetails,setLocationDetails} = useUserContext()
  // console.log(userLocation);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            
            getLocationDetails(latitude, longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
      }
  
  
    }; 
  
    useEffect(() => { 
  
      getLocation();
  
    }, []);
   
    async function getLocationDetails(latitude, longitude) {
      try {
       
        // console.log({ latitude, longitude });
        setUserLocation({ latitude, longitude });
        const data = await fetchLocationDetails(latitude, longitude, import.meta.env.VITE_LOCATIONKEY);
        console.log('Location Details:', data.components);
        setLocationDetails(data.components)
      } catch (error) { 
        console.error('Error:', error);
      }
    }

    // console.log(locationDetails);
  return (
    <div className=''>
    {location ? (
      <div className='text-xs flex flex-col items-center justify-center'>
         <p >
        Your current location :
      </p>
      <p> Latitude {parseFloat(location.latitude.toFixed(3))} , Longitude {parseFloat(location.longitude.toFixed(3))}</p>
      </div>
     
      
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <p className='flex justify-center items-center'>Please allow location access</p>
    )}
  </div>
  )
}

export default Location