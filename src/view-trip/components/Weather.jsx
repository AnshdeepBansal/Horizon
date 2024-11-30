import React from "react";

function Weather({ obj }) {
  const data = obj?.tripData;

  return (
    <div className="p-6 m-2 bg-gray-50 rounded-xl shadow-md border border-gray-200">
      <h2 className="font-semibold text-xl text-gray-800 mb-4">Weather Conditons</h2>
      <p className="text-gray-600 text-lg">{data?.Weather || "Weather data not available"}</p>
    </div>
  );
}

export default Weather;
