import React, { useState } from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Hero() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUser(codeResp),
    onError: (error) => console.error("Login failed", error),
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
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => console.error("Error fetching user info:", err));
  };

  const handleClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
    } else {
      navigate("/create-trip");
    }
  };

  return (
    <>
      <div className="z-10 flex flex-col items-center lg:mx-52 gap-8 m-2 mt-10">
        <h1 className="font-extrabold text-[35px] lg:text-[50px] text-center mt-10 lg:mt-16 bg-slate-500 bg-opacity-20 rounded-2xl p-4">
          <span className="text-white">Discover Your Next Adventure with Us:</span>{" "}
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-lg lg:text-2xl text-gray-900 text-center bg-slate-100 bg-opacity-25 rounded-xl p-4">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Button
          onClick={handleClick}
          className="h-14 text-lg lg:text-xl font-serif shadow-xl rounded-xl hover:scale-105 transition-transform hover:bg-black px-6"
        >
          Get Started, it’s Free
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-extrabold font-mono text-black text-2xl text-center mb-2">
              <img className="h-20 mx-auto" src="logoo.jpg" alt="Horizon Logo" />
              Hey, Welcome to HORIZON!
            </DialogTitle>
            <DialogDescription>
              <Button onClick={login} className="w-full flex items-center justify-center gap-2 py-3">
                <FcGoogle className="text-xl" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Hero;
