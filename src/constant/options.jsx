export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole Traveles in exploration',
        icon:'✈️',
        people:'1 person'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions = [
    {
        id:5,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:6,
        title:'Moderate',
        desc:'Keep const on the average side',
        icon:'💰'
    },
    {
        id:7,
        title:'Luxury',
        desc:'Do not worry about the cost',
        icon:'💸'
    },
]

export const AI_PROMPT=`Generate a detailed Travel Plan for the location: {location}, for {totalDays} days for {traveler} with a {budget} budget. 

1. Weather:(String) general Weather conditions there with approx range of temperature

2. Provide a Hotels options list in the following format:
   - HotelName: (String) Name of the hotel.
   - HotelAddress: (String) Full address of the hotel.
   - pricePerNight: (Map) Estimated price range for a night in USD with:
     - currency: USD
     - min: Minimum price for one night.
     - max: Maximum price for one night.
   - geoCoordinates: (Map) GPS coordinates with:
     - latitude: Latitude value.
     - longitude: Longitude value.
   - rating: (Number) Hotel rating.

3. Provide a detailed itinerary for the trip. 
   - Each day should be represented by a DayNumber field.
   - Each day should contain a list of places to visit with the following details:
     - placeName: (String) Name of the place.
     - PlaceDetails: (String) Description of the place.
     - geoCoordinates: (Map) GPS coordinates for the place with latitude and longitude.
     - rating: (Number) Place rating.
     - TimeToTravel: (String) Time estimated to travel to/from this place.
     - BestTime: (String) Best time to visit this place.

3. Format the response strictly in JSON format only, with the following structure:

{
  "tripData": {
    "Weather":"string"
    "hotels": [
      {
        "HotelName": "string",
        "HotelAddress": "string",
        "pricePerNight": {
          "currency": "USD",
          "min": number,
          "max": number
        },
        "geoCoordinates": {
          "latitude": number,
          "longitude": number
        },
        "rating": number
      },
      ...
    ],
    "itinerary": [
      {
        "DayNumber": number,
        "places": [
          {
            "placeName": "string",
            "PlaceDetails": "string",
            "geoCoordinates": {
              "latitude": number,
              "longitude": number
            },
            "rating": number,
            "TimeToTravel": "string",
            "BestTime": "string"
          },
          ...
        ]
      },
      ...
    ]
  }
}
Please ensure that all keys, styles, and variable names match this format exactly.`;