import * as FaIcons from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Link, useNavigate } from "react-router-dom";

export function CollectionCategory() {
    const navigate = useNavigate();
    const categories = [
        "Amazon",
        "Google",
        "Apple",
        "Facebook",
        "Microsoft",
        "Tesla",
        "IBM",
        "Intel",
        "Adobe",
        "Oracle",
        "Netflix",
        "Salesforce",
        "Spotify",
        "Uber",
        "Dropbox",
        
    ];

    function handleClick(category) {
        navigate(`/collection/${category}`);
    }

    return (
        <>
            <div className="text-3xl font-bold h-full flex items-center justify-center mb-10 mt-10">
                Explore the Tech Interview Question Collection of Top Companies
            </div>
            <div className="flex gap-5 flex-wrap">
                {categories.map((company, index) => {
                    const IconComponent = FaIcons[`Fa${company}`];

                    return (
                        <Drawer key={index}>
                            <DrawerTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[15rem] h-[6rem] ml-5 text-lg flex flex-col items-center justify-center gap-3 
                                           bg-[#0f2a42] text-white transition-colors 
                                           hover:bg-[#357cbb] hover:text-white hover:shadow-lg"
                                >
                                    {IconComponent ? (
                                        <IconComponent
                                            size={80}
                                            className="text-white"
                                        />
                                    ) : null}
                                    {company}
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full p-4">
                                    <DrawerHeader>
                                        <DrawerTitle>
                                            Explore the collection of the top
                                            tech questions asked at {company}
                                        </DrawerTitle>
                                        <DrawerTitle>
                                            <Button
                                                onClick={() =>
                                                    handleClick(company)
                                                }
                                            >
                                                Explore{" "}
                                                <FaArrowRight></FaArrowRight>
                                            </Button>
                                        </DrawerTitle>
                                    </DrawerHeader>
                                    <DrawerClose asChild>
                                        <Button variant="outline">
                                            Close{" "}
                                        </Button>
                                    </DrawerClose>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    );
                })}
            </div>
        </>
    );
}
