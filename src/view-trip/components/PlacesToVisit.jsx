import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ obj }) {
  const data = obj?.tripData?.itinerary;

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg md:text-xl mt-5 mb-5">Places To Visit</h2>
      <div>
        {data?.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-md md:text-lg mb-3">
              Day {item?.DayNumber}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {item?.places?.map((place, idx) => (
                <div key={idx} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600 mb-1">
                    {place?.BestTime}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
