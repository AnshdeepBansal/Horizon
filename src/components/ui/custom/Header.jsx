import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert , setOpenAlert] = useState(false);
  const [signIn , setSignIn] = useState(false);

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
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDialog(false);
        setSignIn(true);
      });
  };

  const Logout = () => {
    localStorage.clear();
    setOpenAlert(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if(user)
      setSignIn(true);
  },[]);
  return (
    <div className="sticky top-0 p-2 px-3 shadow-lg flex justify-between items-center bg-white z-50">
      <div className="flex justify-center items-center">
        <img className="h-10 md:h-16" src="/logoo.jpg" />
        <div className="from-accent-foreground font-bold py-1 md:py-2 text-center text-xl lg:text-3xl">
          Horizon
        </div>
      </div>
      <div>
        {signIn ? (
          <div className="flex gap-2 items-center">
            <Link to="/create-trip">
            <Button variant="outline" className="h-[30px] w-[70px] text-[10px] lg:h-[45px] lg:w-[115px] lg:text-[16px] rounded-full hover:scale-105 transition-all hover:bg-blue-100">
              Create trip +
            </Button>
            </Link>
            <Link to="/my-trips">
            <Button variant="outline" className="h-[30px] w-[70px] text-[10px] lg:h-[45px] lg:w-[115px] lg:text-[16px] rounded-full hover:scale-105 transition-all hover:bg-blue-100">
              My Trips
            </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] lg:h-[40px] lg:w-[40px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col">
                <div className="shadow-lg p-2 text-center rounded-xl text-sm">
                  Hey! {user?.name}
                </div>
                <div className="shadow-lg p-2 text-center rounded-xl text-sm">
                  {user?.email}
                </div>
                <div
                  onClick={()=>{setOpenAlert(true)}}
                  className="text-sm shadow-sm p-2 hover:bg-red-400 mt-5 transition-colors  bg-red-100 cursor-pointer rounded-xl text-center font-medium hover:text-white"
                >
                  LogOut
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <Button className="h-8 md:h-10 hover:scale-105 transition-all">Sign In</Button>
          </div>
        )}
      </div>
      <Dialog className="m-1" open={openDialog} onOpenChange={setOpenDialog}>
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


      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be Logged Out
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{setOpenAlert(false)}}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={Logout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Header;
