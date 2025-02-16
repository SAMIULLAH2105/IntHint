import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/Components/LandingPage/Navbar";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { CiEdit } from "react-icons/ci";

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

const Collection = () => {
    // const { category } = useParams();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        async function getCollections() {
            // try {
            //     const response = await axios.get(
            //         "http://localhost:5000/api/collections/getByUserId",
            //         {
            //             withCredentials: true,
            //         }
            //     );

            //     setCollections(response.data.data);
            // } catch (error) {
            //     console.error(
            //         "Error fetching collections:",
            //         error.response?.data || error.message
            //     );
            // }

            setCollections([
                {
                    _id: "65b8c2a9f9d123456789abcd",
                    title: "React Interview Questions",
                    description: "Common React questions for interviews.",
                    company: "Meta",
                    ownedBy: "65b123abc456def789012345",
                    visibility: "private",
                    questions: [
                        {
                            text: "What are React hooks?",
                            answers: [
                                "Hooks are functions that let you use state and lifecycle features.",
                            ],
                        },
                        {
                            text: "What is useEffect used for?",
                            answers: [
                                "Handling side effects in function components.",
                            ],
                        },
                    ],
                    createdAt: "2025-02-16T10:30:00.123Z",
                    updatedAt: "2025-02-16T10:35:00.456Z",
                },
                {
                    _id: "65b8c2b5f9d123456789efgh",
                    title: "Data Structures Questions",
                    description: "Questions on algorithms and data structures.",
                    company: "Google",
                    ownedBy: "65b123abc456def789012345",
                    visibility: "public",
                    questions: [
                        {
                            text: "Explain the difference between a stack and a queue.",
                            answers: ["Stack: LIFO, Queue: FIFO"],
                        },
                    ],
                    createdAt: "2025-02-15T14:20:00.789Z",
                    updatedAt: "2025-02-16T09:00:00.321Z",
                },
            ]);
        }
        getCollections();
    }, []);

    const handleDownload = (collection) => {
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
    };

    const handleCollectionDelete = async (collection) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/collections/deleteCollection/${collection._id}`,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data.message);
        } catch (error) {
            console.error(
                "Error deleting collection:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="w-full ">
            <Navbar></Navbar>

            <div className="flex items-center justify-center mt-8">
                <h2 className="font-bold text-xl">Your Collections</h2>
            </div>

            <div className="flex flex-col items-center mt-10 w-full">
                {collections.map((collection) => (
                    <Drawer key={collection._id}>
                        <div className="mt-7 w-full flex flex-col items-center justify-center">
                            <Card className="w-[90%] p-4 bg-gray-900 text-white">
                                <div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium leading-none flex items-center gap-2">
                                            {collection.title}
                                            <button>
                                                <CiEdit className="text-[1rem]" />
                                            </button>
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {collection.description}
                                        </p>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex h-5 items-center space-x-4 text-sm">
                                        <div>
                                            {collection.questions.length}{" "}
                                            questions
                                        </div>
                                        <Separator orientation="vertical" />
                                        <div>
                                            {new Date(
                                                collection.createdAt
                                            ).toLocaleDateString()}
                                        </div>
                                        <Separator orientation="vertical" />
                                        <div className="flex gap-2">
                                            {collection.visibility ===
                                            "private" ? (
                                                <>
                                                    Private <FaLock />
                                                </>
                                            ) : (
                                                <>
                                                    Public <FaUnlock />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="space-y-4 mt-5">
                                    {collection.questions.length > 0 ? (
                                        collection.questions
                                            .slice(0, 3)
                                            .map((q, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 bg-gray-800 rounded-lg"
                                                >
                                                    {q.text}
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-gray-400">
                                            No questions available
                                        </p>
                                    )}
                                    <DrawerTrigger asChild>
                                        <Button className="w-[30%] bg-blue-500 hover:bg-blue-600">
                                            Read More
                                        </Button>
                                    </DrawerTrigger>
                                    <Button
                                        onClick={() =>
                                            handleDownload(collection)
                                        }
                                        className="w-[30%] ml-2 bg-blue-500 hover:bg-blue-600"
                                    >
                                        Download <FaDownload></FaDownload>
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleCollectionDelete(collection)
                                        }
                                        className="w-[30%] bg-blue-500 hover:bg-blue-600 ml-2"
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <DrawerContent>
                            <div className="mx-auto w-full p-4 flex flex-col gap-2 items-center">
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
                                                {q.answers.length > 0 ? (
                                                    <ul className="list-disc pl-5">
                                                        {q.answers.map(
                                                            (a, i) => (
                                                                <li key={i}>
                                                                    {a}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-400">
                                                        No answers provided
                                                    </p>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                <DrawerClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </div>
                        </DrawerContent>
                    </Drawer>
                ))}
            </div>
        </div>
    );
};

export default Collection;
