import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // Function to fetch the place photo based on place name
  const fetchPlacePhoto = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const query = place?.placeName; // Using place name for the query
      const searchUrl = `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${API_KEY}`;

      // Fetch place data
      const response = await fetch(searchUrl);
      const data = await response.json();

      // If photo exists, return photo URL; otherwise, return default
      if (data?.results?.[0]?.photos?.[0]?.photo_reference) {
        const photoReference = data.results[0].photos[0].photo_reference;
        const photoUrl = `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${API_KEY}`;
        setPhotoUrl(photoUrl); // Update state with the photo URL
      } else {
        setPhotoUrl("/default.jpeg"); // Default image if no photo available
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("/default.jpeg"); // Set to default in case of error
    }
  };

  // Fetch photo when the component mounts or when place changes
  useEffect(() => {
    if (place?.placeName) {
      fetchPlacePhoto();
    }
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place?.placeName
      )}`}
      target="_blank"
    >
      <div className="h-[260px] flex items-center gap-4 p-4 shadow-md border rounded-xl bg-white hover:scale-105 transition-transform mt-2">
        {/* Image Section */}
        <div className="w-2/5 h-100%">
          <img
            src={photoUrl || "/default.jpeg"} // Use photo URL or default image
            alt={place?.placeName}
            className="h-[220px] rounded-xl object-cover object-center"
          />
        </div>

        {/* Text Section */}
        <div className="w-3/5 flex flex-col justify-between items-start">
          <h2 className="font-bold text-lg sm:text-xl">{place?.placeName}</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">{place?.PlaceDetails}</p>
          <h2 className="font-semibold text-sm sm:text-base mt-3">🕒 {place?.TimeToTravel}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
