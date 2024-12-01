import { db } from '@/service/firebaseConfig';
import {doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import Weather from '../components/Weather';

function ViewTrip() {
  
    const {tripId} = useParams();
    const [tripData , setTripData] = useState({});
    const navigate = useNavigate();
    const user  = localStorage.getItem('user');
    useEffect( ()=>
        {
            if(!user)
                navigate('/');
            tripId&&getData();
    },[tripId])

    const getData = async()=>{
        const tripRef = doc(db,'AItrips',tripId); 
        const snap = await getDoc(tripRef);    
        if (!snap.exists) {
            console.log('No such document!');
        } else {
            setTripData(snap.data());
        }
    }
    console.log('Document data:', tripData);
    return (
    <div className='md:px-20 lg:px-40 bg-slate-50' >
      <InfoSection obj={tripData}/>
      <Weather obj={tripData?.tripData}/>
      <Hotels obj={tripData?.tripData} location={tripData?.userSelection?.location?.label}/>
      <PlacesToVisit obj={tripData}/>
      <Footer/>
    </div>
  )
}

export default ViewTrip
