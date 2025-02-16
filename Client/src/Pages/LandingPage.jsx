import Navbar from "@/Components/LandingPage/Navbar";
import React, { useState } from "react";
import Image from "../../src/assets/Untitled.png";
import { CollectionCategory } from "@/Components/LandingPage/CollectionCategory";
import Footer from "@/Components/Footer";
import { Typewriter } from "react-simple-typewriter";

const LandingPage = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="overflow-x-hidden">
                <Navbar />

                <div className="flex justify-around items-center h-screen w-screen gap-5">
                    <div className="text-3xl font-bold w-[30%] flex-col h-full flex items-center justify-center pl-15">
                        Welcome to InterviewAce
                        <h1 className="">
                            <Typewriter
                                words={[
                                    "Master Tech Interviews!",
                                    "Crack Your Next Interview!",
                                    "Code. Learn. Succeed.",
                                    "Your Ultimate Prep Hub!",
                                    "Ace Every Coding Challenge!",
                                    "Practice Like a Pro!",
                                    "Level Up Your Interview Game!",
                                    "Prepare. Perform. Prevail.",
                                    "Learn from the Best Questions!",
                                    "Decode the Interview Maze!",
                                ]}
                                loop={true}
                                cursorStyle="|"
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={1000}
                            />
                        </h1>
                    </div>

                    <div className="w-[70%] h-full flex items-center justify-center">
                        <img
                            src={Image}
                            alt="IntHint"
                            className="max-w-full max-h-full object-contain drop-shadow-lg shadow-blue-500"
                        />
                    </div>
                </div>

                <div className="bg-[#0f2a42] text-white pt-10 pb-10 flex flex-col justify-center items-center">
                    <h3 className="">About Us!</h3>
                    <div className="pl-10 pr-10 mt-10">
                        Welcome to CodeVault, your ultimate destination for
                        mastering tech interviews! Sharpen your algorithms, ace
                        system design, and tackle real-world coding challenges.
                        Start preparing today and unlock the doors to your dream
                        job!
                    </div>
                </div>

                <CollectionCategory></CollectionCategory>
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
