import Navbar from "@/Components/LandingPage/Navbar";
import React, { useState } from "react";
import Image from "../../src/assets/Untitled.png";
import { CollectionCategory } from "@/Components/LandingPage/CollectionCategory";

const LandingPage = () => {
  
  const [isHovered, setIsHovered] = useState(false);

  
    return (
        <>
            <>
                <Navbar />

                <div className="flex justify-around items-center h-screen w-screen gap-5">

                    <div className="text-3xl font-bold w-[50%]  h-full flex items-center justify-center ">
                        Welcome to IntHint
                    </div>

                    <div className="w-[50%] h-full flex items-center justify-center">
                        <img
                            src={Image}
                            alt="IntHint"
                            className="max-w-full max-h-full object-contain drop-shadow-lg shadow-blue-500"
                        />
                    </div>
                </div>

                <CollectionCategory></CollectionCategory>


            </>
        </>
    );
};

export default LandingPage;
