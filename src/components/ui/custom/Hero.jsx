import React, { useState } from 'react'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";


function Hero() {
  const [openDialog , setOpenDialog] = useState(false);
  const navigate  = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUser(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUser = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const handleClick = ()=>
  {
    const user = localStorage.getItem('user');
    if(!user)
    {
        setOpenDialog(true);
    }
    else
      navigate('/create-trip');
  }
  return (
    <>
    <div className="z-10 flex flex-col items-center lg:mx-52 gap-10 mt-14" >
      <h1 className='font-extrabold text-[35px] lg:text-[50px] text-center mt-10 lg:mt-16'><span className='text-white'>Discover Your Next Adventure with Us:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-2xl text-gray-700 text-center'>Your personal trip planner and tarvel curator, creating custom itineraries tailored to your interests and budget</p>
        <Button onClick={()=>{handleClick()}} className="h-16 text-xl font-serif shadow-xl rounded-xl hover:scale-105 transition-all hover:bg-black">Get Strated, it's Free</Button>
    </div>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-extrabold font-mono text-black text-2xl text-center mb-1">
              <img className="h-20" src="logoo.jpg" />
              Hey, Welcome to HORIZON !
            </DialogTitle>
            <DialogDescription>
              <Button onClick={login} className="w-full">
                <FcGoogle /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Hero
