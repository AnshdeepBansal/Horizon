import { db } from '@/service/firebaseConfig';
import {doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

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
        const tripRef = doc(db,'AiTrips',tripId); 
        const snap = await getDoc(tripRef);    
        if (!snap.exists) {
            console.log('No such document!');
        } else {
            setTripData(snap.data());
        }
    }
    console.log('Document data:', tripData);
    return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56' >
      <InfoSection obj={tripData}/>
      <Hotels obj={tripData?.tripData}/>
      <PlacesToVisit obj={tripData?.tripData}/>
      <Footer/>
    </div>
  )
}

export default ViewTrip
