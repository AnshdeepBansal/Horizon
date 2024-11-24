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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert , setOpenAlert] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUser(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUser = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
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

  const Logout = () => {
    localStorage.clear();
    setOpenAlert(false);
    window.location.reload();
  };

  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="sticky top-0 p-1 px-3 shadow-lg flex justify-between items-center bg-white z-50">
      <div className="flex justify-center items-center">
        <img className="h-20" src="/logoo.jpg" />
        <div className="from-accent-foreground font-bold py-3 text-center text-3xl">
          Horizon
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 items-center">
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full hover:scale-105 transition-all hover:bg-blue-100">
              Create trip +
            </Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full hover:scale-105 transition-all hover:bg-blue-100">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-1">
                <div className="shadow-lg p-2 text-center rounded-xl">
                  Hey! {user?.name}
                </div>
                <div className="shadow-lg p-2 text-center rounded-xl">
                  {user?.email}
                </div>
                <div
                  onClick={()=>{setOpenAlert(true)}}
                  className="shadow-sm p-2 hover:bg-red-400 mt-5 transition-colors  bg-red-100 cursor-pointer rounded-xl text-center font-medium hover:text-white"
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
            <Button className="hover:scale-105 transition-all">Sign In</Button>
          </div>
        )}
      </div>
      <Dialog open={openDialog}>
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
