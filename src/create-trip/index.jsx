import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {doc , setDoc} from "firebase/firestore";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constant/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading , setLoading] = useState(false);
  
  const navigate  = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(!user)
    {
      navigate('/');
      return;
    }
    console.log(formData);
  }, [formData]);

  const  SaveAiTrip = async (TripData)=>
  {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AItrips", docID), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docID
    });    
    console.log("Database updated");
    setLoading(false);
    navigate('/view-trip/' + docID);
  }

  const handleGenerate = async () => {
    const user = localStorage.getItem('user');
    if(!user)
    {
      toast("Looks like you are not SIGNED IN");
      return;
    }
    if(formData?.noOfDays > 10)
    {
      toast("Saale Ghar thodi le liya udhar 🤬, 10 din se kam ki trip hoti hai😘");
      return;
    }
    if (
      !formData?.noOfDays ||
      formData?.noOfDays <= 0 ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData.location
    ) {
      toast("❌INVALID , Please ENTER ALL THE DETAILS CORRECTLY");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
    .replace("{totalDays}", formData?.noOfDays)
    .replace("{traveler}", formData?.traveler)
    .replace("{budget}", formData?.budget)
    .replace("{totalDays}", formData?.noOfDays);
    
    console.log(FINAL_PROMPT);
    try{
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("result aagya")
      console.log(result?.response?.text());
      SaveAiTrip(result?.response?.text()); 
      setLoading(false);
    }
    catch(err)
    {
      console.log(err);
    }
    setLoading(false);
    return;
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-60 px-5 p-10 bg-slate-50">
      <h2 className="font-bold text-3xl">Let's Create a Trip🏕️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, Horizon will generate
        a complete plan and customized itinerary based on your preferences 
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?🌏
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days you are planning your trip?📅
          </h2>
          <Input
            placeholder={"Example - 3"}
            type="number"
            min="1"
            max="10"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget?🤑</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white ${
                    formData?.budget == item.title && "border-black shadow-xl"
                  }`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white ${
                    formData?.traveler == item.people &&
                    "border-black shadow-xl"
                  }`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="my-24 justify-end flex">
        <Button
        className="h-14 min-w-48"
        disabled={loading} 
        onClick={handleGenerate}>
          {loading?<AiOutlineLoading3Quarters className="animate-spin"/>:
        "Generate Trip"
        }</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
