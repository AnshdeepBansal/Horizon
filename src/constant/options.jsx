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

export const AI_PROMPT='Generate Travel Plan for Location : {location} , for {totalDays} days for {traveler} with a {budget} budget , Give me a Hotels options list with HotelName , HotelAddress, Price per night(range) ,geo coordinates , rating , description and suggest itinerary with array of list only containing DayNumber , placeName ,  PlaceDetails , Geo Coordinates , tickets Pricing(estimated) in USD,rating ,Time Travel each of the location for {totalDays} days with each day plan with best time to visit in a seperate list  in JSON format only'