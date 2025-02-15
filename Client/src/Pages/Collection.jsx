import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/Components/LandingPage/Navbar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

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
    const { category } = useParams();

    return (
        <div className="w-full ">
            <Navbar></Navbar>

            <Drawer key={""}>
                <div className="flex flex-col justify-center items-center mt-10 w-full ">
                    <h2 className="font-bold text-xl">
                        Collections of {category} Interview Questions
                    </h2>
                    <div className="mt-7 w-full flex flex-col justify-center items-center">
                        <Card className="w-[90%] p-4 bg-gray-900 text-white">
                            <div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium leading-none">
                                        Title
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Description
                                    </p>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <div>10 questions</div>
                                    <Separator orientation="vertical" />
                                    <div>02/12/25</div>
                                    <Separator orientation="vertical" />
                                    <div className="flex gap-3">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button
                                                    variant="link"
                                                    className="text-white"
                                                >
                                                    John
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-semibold">
                                                            Anas
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
                                                                Joined December
                                                                2021
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                </div>
                            </div>
                            <CardHeader className="flex items-center gap-4 "></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    You have 3 unread messages.
                                </div>
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    Push Notifications disabled.
                                </div>
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    Enable notifications for updates.
                                </div>
                                <DrawerTrigger asChild>
                                    <Button className="w-[30%] bg-blue-500 hover:bg-blue-600">
                                        Read More
                                    </Button>
                                </DrawerTrigger>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <DrawerContent>
                    <div className="mx-auto w-full p-4 flex flex-col gap-2 justify-center items-center">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Is it accessible?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design
                                    pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Is it styled?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that
                                    matches the other components&apos;
                                    aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it animated?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's animated by default, but you can
                                    disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it animated?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's animated by default, but you can
                                    disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it animated?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's animated by default, but you can
                                    disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Is it animated?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's animated by default, but you can
                                    disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <DrawerClose asChild>
                            <Button variant="outline">Close </Button>
                        </DrawerClose>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default Collection;
