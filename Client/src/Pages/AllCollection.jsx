import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/Components/LandingPage/Navbar";
import { FaDownload } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { storeContext } from "@/Store/Store";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import axios from "axios";

const AllCollection = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [searchType, setSearchType] = useState("");
    const { category } = useParams();
    const { isAuth } = useContext(storeContext);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/collections/public`
                );
                console.log(response, category)
                setCollections(response.data.data);
                setFilteredCollections(response.data.data);
            } catch (err) {
                console.error("Error fetching collections:", err);
                // setError(
                //     err.response?.data?.message || "Failed to fetch collections"
                // );
            }
                // setCollections([
                //     {
                //         _id: "65c3f4f8a5d9e3b8b1a7d2c1",
                //         title: "Amazon System Design",
                //         description:
                //             "A collection of system design interview questions for Amazon.",
                //         company: "Amazon",
                //         ownedBy: {
                //             _id: "65c1d3b5a2e4f6d8c9b2e4f6",
                //             userName: "John Doe",
                //         },
                //         visibility: "public",
                //         questions: [
                //             {
                //                 text: "How would you design a URL shortening service like Bitly?",
                //                 answers: [
                //                     {
                //                         text: "Use a hash function to generate short URLs.",
                //                     },
                //                     {
                //                         text: "Store mappings in a database with expiration timestamps.",
                //                     },
                //                 ],
                //             },
                //             {
                //                 text: "How does a load balancer work?",
                //                 answers: [
                //                     {
                //                         text: "It distributes incoming traffic across multiple servers.",
                //                     },
                //                 ],
                //             },
                //             {
                //                 text: "What are the benefits of microservices?",
                //                 answers: [
                //                     { text: "Scalability and flexibility." },
                //                     { text: "Improved fault isolation." },
                //                 ],
                //             },
                //         ],
                //         createdAt: "2025-02-16T12:34:56.789Z",
                //         updatedAt: "2025-02-16T12:34:56.789Z",
                //     },
                // ]);
                // setFilteredCollections([
                //     {
                //         _id: "65c3f4f8a5d9e3b8b1a7d2c1",
                //         title: "Amazon System Design",
                //         description:
                //             "A collection of system design interview questions for Amazon.",
                //         company: "Amazon",
                //         ownedBy: {
                //             _id: "65c1d3b5a2e4f6d8c9b2e4f6",
                //             userName: "John Doe",
                //         },
                //         visibility: "public",
                //         questions: [
                //             {
                //                 text: "How would you design a URL shortening service like Bitly?",
                //                 answers: [
                //                     {
                //                         text: "Use a hash function to generate short URLs.",
                //                     },
                //                     {
                //                         text: "Store mappings in a database with expiration timestamps.",
                //                     },
                //                 ],
                //             },
                //             {
                //                 text: "How does a load balancer work?",
                //                 answers: [
                //                     {
                //                         text: "It distributes incoming traffic across multiple servers.",
                //                     },
                //                 ],
                //             },
                //             {
                //                 text: "What are the benefits of microservices?",
                //                 answers: [
                //                     { text: "Scalability and flexibility." },
                //                     { text: "Improved fault isolation." },
                //                 ],
                //             },
                //         ],
                //         createdAt: "2025-02-16T12:34:56.789Z",
                //         updatedAt: "2025-02-16T12:34:56.789Z",
                //     },
                // ]);
        };

        fetchCollections();
    }, [category]);

    function handleSearch(params) {
      console.log(searchQuery, searchType)
        if (searchType === "company") {
          console.log(filteredCollections)
            setFilteredCollections(
                collections.filter((collection) =>
                    collection.company
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        }
        else if (searchType === "user") {
          console.log(filteredCollections)
            setFilteredCollections(
                collections.filter((collection) =>
                    collection.ownedBy.userName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        }
         else {
            setFilteredCollections(collections); 
        }
    }

    const handleDownload = (collection) => {
        if (!isAuth) {
            alert("Please Login First");
            navigate("/auth/login");
        } else {
            let textContent = `Collection: ${collection.title}\n`;
            textContent += `Description: ${collection.description}\n\n`;

            collection.questions.forEach((q, index) => {
                textContent += `Q${index + 1}: ${q.text}\n`;
                q.answers.forEach((answer, idx) => {
                    textContent += `   - A${idx + 1}: ${answer.text}\n`;
                });
                textContent += "\n";
            });

            const blob = new Blob([textContent], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${collection.title.replace(/\s+/g, "_")}.txt`;
            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="w-full ">
            <Navbar></Navbar>
            <div className="flex flex-col justify-center items-center mt-10 w-[100%]">
                <h2 className="font-bold text-xl">
                    Collections of {category} Interview Questions
                </h2>
            </div>
            <div className="flex justify-end items-end w-full pr-10">
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Search By</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={searchType}
                                onValueChange={setSearchType}
                            >
                                <DropdownMenuRadioItem value="company">
                                    By Company
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="user">
                                    By User
                                </DropdownMenuRadioItem>
                                {/* <DropdownMenuRadioItem value="time">
                                    By Time
                                </DropdownMenuRadioItem> */}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            type="email"
                            placeholder="Enter"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button onClick={() => {handleSearch()}}>Search</Button>
                    </div>
                </div>
            </div>

            <div className="mt-7 w-full flex flex-col justify-center items-center">
                {filteredCollections.map((collection) => (
                    <Drawer key={collection._id}>
                        <Card className="w-[90%] p-4 bg-gray-900 text-white">
                            <div>
                                <div className="space-y-1">
                                    <h4 className="text-lg font-semibold">
                                        {collection.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {collection.description}
                                    </p>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <div>
                                        {collection.questions.length} questions
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div>
                                        {new Date(
                                            collection.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div>{collection.company}</div>
                                    <Separator orientation="vertical" />
                                    <div className="flex gap-3">
                                        {/* <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    className="text-white"
                                                >
                                                    {collection.ownedBy
                                                        ?.userName || "Unknown"}
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-semibold">
                                                            {collection.ownedBy
                                                                ?.userName ||
                                                                "Unknown"}
                                                        </h4>
                                                        <Avatar>
                                                            <AvatarImage
                                                                src="https://github.com/shadcn.png"
                                                                alt="User"
                                                            />
                                                            <AvatarFallback>
                                                                U
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex items-center pt-2">
                                                            <span className="text-xs text-muted-foreground">
                                                                Joined Unknown
                                                                Date
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard> */}
                                    </div>
                                </div>
                            </div>
                            <CardHeader className="flex items-center gap-4 "></CardHeader>
                            <CardContent className="space-y-4">
                                {collection.questions
                                    .slice(0, 3)
                                    .map((q, index) => (
                                        <div
                                            key={index}
                                            className="p-3 bg-gray-800 rounded-lg"
                                        >
                                            {q.text}
                                        </div>
                                    ))}
                                <DrawerTrigger asChild>
                                    <Button className="w-[30%] bg-blue-500 hover:bg-blue-600">
                                        Read More
                                    </Button>
                                </DrawerTrigger>
                                <Button
                                    onClick={() => handleDownload(collection)}
                                    className="w-[30%] ml-2 bg-blue-500 hover:bg-blue-600"
                                >
                                    Download <FaDownload></FaDownload>
                                </Button>
                            </CardContent>
                        </Card>

                        <DrawerContent>
                            <div className="mx-auto w-full p-4 flex flex-col gap-2 justify-center items-center">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    {collection.questions.map((q, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                        >
                                            <AccordionTrigger>
                                                {q.text}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {q.answers.map(
                                                    (answer, idx) => (
                                                        <p key={idx}>
                                                            {answer.text}
                                                        </p>
                                                    )
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                <DrawerClose asChild>
                                    <Button variant="outline">Close </Button>
                                </DrawerClose>
                            </div>
                        </DrawerContent>
                    </Drawer>
                ))}
            </div>
        </div>
    );
};

export default AllCollection;
