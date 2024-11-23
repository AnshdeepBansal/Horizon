import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");

  // Function to fetch the place photo based on place name
  const fetchPlacePhoto = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const query = place?.placeName; // Using place name for the query
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${API_KEY}`;

      // Fetch place data
      const response = await fetch(searchUrl);
      const data = await response.json();

      // If photo exists, return photo URL; otherwise, return default
      if (data?.results?.[0]?.photos?.[0]?.photo_reference) {
        const photoReference = data.results[0].photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
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
      <div className="shadow-md border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all">
        <img
          src={photoUrl || "/default.jpeg"} // Use photo URL or default image
          alt={place?.placeName}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-600">{place?.PlaceDetails}</p>
          <h2 className="font-semibold text-sm mt-3">🕒{place?.TimeToTravel}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
