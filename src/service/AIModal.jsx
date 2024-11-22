  import { GoogleGenerativeAI } from "@google/generative-ai";
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Location : las Vegas , for 3 days for Couple with a cheap budget , Give me a Hotels  options list with HotelName , HotelAddress, Price ,geo coordinates , rating , description and suggest itinerary with place Name ,  Place Details , Geo Coordinates , tickets Pricing(estimate) ,rating (estimate),Time Travel each of the location for 3 with each day plan with best time to visit in JSON format only"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": 3,\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": {\n        \"estimate\": 50,\n        \"currency\": \"USD\"\n      },\n      \"imageUrl\": \"placeholder_circus_circus.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1739\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Vegas hotel with a circus theme, affordable rooms, and on-site entertainment.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"300 Fremont St, Las Vegas, NV 89101\",\n      \"price\": {\n        \"estimate\": 60,\n        \"currency\": \"USD\"\n      },\n      \"imageUrl\": \"placeholder_the_d.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1402\n      },\n      \"rating\": 4.0,\n      \"description\": \"Downtown location, known for its retro vibe and reasonable prices.\"\n    },\n    {\n      \"hotelName\": \"Main Street Station Casino, Brewery & Hotel\",\n      \"hotelAddress\": \"200 S Main St, Las Vegas, NV 89101\",\n      \"price\": {\n        \"estimate\": 70,\n        \"currency\": \"USD\"\n      },\n      \"imageUrl\": \"placeholder_main_street_station.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1667,\n        \"longitude\": -115.1402\n      },\n      \"rating\": 3.8,\n      \"description\": \"Historic downtown hotel with a brewery and affordable rooms.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Vibrant pedestrian mall with light shows and street performers.\",\n        \"imageUrl\": \"placeholder_fremont_street.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.167,\n          \"longitude\": -115.14\n        },\n        \"ticketPricing\": {\n          \"estimate\": 0,\n          \"currency\": \"USD\"\n        },\n        \"rating\": 4.2,\n        \"time\": \"Evening (7 PM - 10 PM)\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation south of Las Vegas.\",\n        \"imageUrl\": \"placeholder_seven_magic_mountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.002,\n          \"longitude\": -114.865\n        },\n        \"ticketPricing\": {\n          \"estimate\": 0,\n          \"currency\": \"USD\"\n        },\n        \"rating\": 4.5,\n        \"time\": \"Afternoon (2 PM - 5 PM)\"\n      },\n      {\n        \"placeName\": \"The Strip (walking)\",\n        \"placeDetails\": \"Explore the iconic Las Vegas Strip, focusing on free attractions and people-watching.\",\n        \"imageUrl\": \"placeholder_las_vegas_strip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.11,\n          \"longitude\": -115.17\n        },\n        \"ticketPricing\": {\n          \"estimate\": 0,\n          \"currency\": \"USD\"\n        },\n        \"rating\": 5,\n        \"time\": \"Evening (6 PM - 9 PM)\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Scenic drives and hiking trails.\",\n        \"imageUrl\": \"placeholder_red_rock_canyon.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.2,\n          \"longitude\": -115.8\n        },\n        \"ticketPricing\":{\n          \"estimate\": 15,\n          \"currency\": \"USD\"\n        },\n        \"rating\": 4.8,\n        \"time\": \"Morning (9 AM - 1 PM)\"\n      }\n    ]\n  }\n}\n```\n"},
            ],
          },
        ],
      });