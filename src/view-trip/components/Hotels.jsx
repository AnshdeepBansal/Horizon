import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hotels({ obj }) {
  const list = obj?.tripData?.hotels || [];

  // State to store photos for each hotel
  const [photoUrls, setPhotoUrls] = useState([]);

  // Function to fetch photo references for each hotel
  const fetchPlacePhotos = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const photoPromises = list.map(async (hotel) => {
        const query = `${hotel?.HotelName} in ${hotel?.HotelAddress}`;
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&key=${API_KEY}`;

        // Fetch place data
        const response = await fetch(searchUrl);
        const data = await response.json();

        // If photo exists, return photo URL; otherwise, return default
        if (data?.results?.[0]?.photos?.[0]?.photo_reference) {
          const photoReference = data.results[0].photos[0].photo_reference;
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
        } else {
          return "/default.jpeg"; // Default image if no photo available
        }
      });

      // Resolve all photo promises and update state
      const resolvedPhotos = await Promise.all(photoPromises);
      setPhotoUrls(resolvedPhotos);
    } catch (error) {
      console.error("Error fetching place photos:", error);
    }
  };

  // Fetch photos when the component mounts
  useEffect(() => {
    if (list.length > 0) {
      fetchPlacePhotos();
    }
  }, [list]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel?.HotelName + "," + hotel?.HotelAddress
            )}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-105 hover:shadow-sm hover:border transition-all rounded-xl p-2 cursor-pointer hover:bg-white h-[350px]">
              <img
                src={photoUrls[index] || "/default.jpeg"} // Use photo URL or default image
                className="rounded-xl object-cover h-[180px] w-full"
                alt={hotel?.HotelName}
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.HotelName}</h2>
                <h2 className="text-xs text-gray-500">📍{hotel?.HotelAddress}</h2>
                <h2 className="text-sm">
                  ${hotel?.pricePerNight?.min} - ${hotel?.pricePerNight?.max} per
                  night
                </h2>
                <h2 className="text-sm">⭐{hotel?.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
