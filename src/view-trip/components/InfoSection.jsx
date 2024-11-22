import React from "react";
import { Button } from "@/components/ui/button";
import {IoIosSend} from "react-icons/io";


function InfoSection({ obj }) {
  const data = obj?.userSelection;
  return (
    <>
      <div>
        <img
          src="/default.jpeg"
          className="h-[340px] w-full object-cover rounded-xl"
          alt=""
        />
        <div className="flex justify-between items-center">
          <div className="my-5 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">{data?.location?.label}</h2>
            <div className="flex gap-5">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                📆{data?.noOfDays} Days
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                💰{data?.budget}
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                🙋🏽{data?.traveler}
              </h2>
            </div>
          </div>
          <Button><IoIosSend/></Button>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
