import dotenv from "dotenv";
import { app } from "./app.js"; 
import dbConnect from "./db/index.js"; 


dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 5000;
console.log(port); 

dbConnect().then(() => {
        app.listen(port, () => {
            console.log(`Server running on PORT ${port}`);
        });
}) 
.catch((error) => {
        console.error("Error during server startup:", error);
    });
