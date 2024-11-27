import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import TripCard from "./components/TripCard";

function MyTrips() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user')
  const [userTrips , setUserTrips] = useState([]);
  
  useEffect(() => {
    if(!user)
      navigate("/");
    GetUserTrips();
  }, []);

  const GetUserTrips =async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const q = query(
      collectionGroup(db, "AItrips"),
      where("userEmail","==",user?.email)
    );
    console.log("chal gya");
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
    console.log("over")
  }


  return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 m-2">
          <h2 className="font-bold text-3xl">My Trips</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-5">
            {
              userTrips?.length>0?userTrips.map((trip,index)=>(
                <TripCard trip={trip} key={index}/>
              )):
              [1,2,3,4,5,6].map((item,index)=>(
                <div className="h-[210px] w-full bg-slate-200 animate-pulse rounded-xl" key={index}>
                  
                </div>
              ))
            }
          </div>
        
        </div>
    );
}

export default MyTrips;
