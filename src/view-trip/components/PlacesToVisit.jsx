import { Key } from "lucide-react";
import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesToVisit({ obj }) {
  const data = obj?.tripData?.itinerary;
  let c = 1;
  return (
    <div>
      <h2 className="font-bold text-lg mt-5 mb-5">Places To Visit</h2>
      <div>
        {data?.map((item, index) => (
          <div key={index}>
            <h2>Day {item?.DayNumber}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.places?.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">
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
