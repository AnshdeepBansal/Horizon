import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend } from "react-icons/io";

function InfoSection({ obj }) {
  const data = obj?.userSelection;

  // State to hold the photo URL
  const [photoUrl, setPhotoUrl] = useState("/default.jpeg");

  // Function to fetch the place photo
  const GetPlacePhoto = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const query = data?.location?.label;
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;

      // Fetch place data
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (searchData?.results?.[0]?.photos?.[0]?.photo_reference) {
        const photoReference = searchData.results[0].photos[0].photo_reference;

        // Construct the photo URL
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${API_KEY}`;
        setPhotoUrl(photoUrl); // Update state with the photo URL
      } else {
        console.error("No photo reference found for the place.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  // Fetch the photo when the component mounts
  useEffect(() => {
    GetPlacePhoto();
  }, [data]);

  return (
    <div>
      <img
        src={photoUrl} // Fallback image
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{data?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📆 {data?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {data?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🙋🏽 {data?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
