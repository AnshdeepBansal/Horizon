import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/default.jpeg");

  // Function to fetch the place photo based on the location
  const fetchLocationPhoto = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const query = trip?.userSelection?.location?.label; // Using location label for the query
      if (!query) return;

      const searchUrl = `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&key=${API_KEY}`;

      // Fetch place data
      const response = await fetch(searchUrl);
      const data = await response.json();

      // If photo exists, update the photo URL; otherwise, use default
      if (data?.results?.[0]?.photos?.[0]?.photo_reference) {
        const photoReference = data.results[0].photos[0].photo_reference;
        const photoUrl = `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${API_KEY}`;
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching location photo:", error);
    }
  };

  // Fetch photo when the component mounts or when trip data changes
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      fetchLocationPhoto();
    }
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
        <div className="hover:scale-105 transition-all">
            <img src={photoUrl}
            alt={trip?.userSelection?.location?.label} className="object-cover rounded-xl h-[200px] w-full" />
            <div>
                
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                
            </div>
        </div>
    </Link>
  );
}

export default TripCard;
