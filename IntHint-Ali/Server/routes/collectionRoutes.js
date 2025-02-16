import express from "express";
import {
    getAllPublicCollections,
    getPublicCollectionsByCompany,
    getCollectionsByUserId,
    createCollection,
    updateCollection,
    deleteCollection,
    addQuestionToCollection,
    removeQuestionFromCollection,
    toggleCollectionVisibility,
    downloadCollection
    
} from "../controllers/collections.controller.js"
import { verifyJWT } from "../middleware/authMiddleware.js";

const collectionRouter = express.Router();

// Public Routes
collectionRouter.get("/public", getAllPublicCollections);
collectionRouter.get("/publicByCompany/:company", getPublicCollectionsByCompany);

// Private Routes (Require Authentication)

collectionRouter.get("/getByUserId",verifyJWT,getCollectionsByUserId)
collectionRouter.post("/createCollection", verifyJWT, createCollection);
collectionRouter.put("/updateCollection/:collectionId", verifyJWT, updateCollection);
collectionRouter.delete("/deleteCollection/:collectionId", verifyJWT, deleteCollection);
collectionRouter.post("/addQuestion/:collectionId", verifyJWT, addQuestionToCollection);
collectionRouter.delete("/removeItem/:collectionId/:questionId", verifyJWT, removeQuestionFromCollection);
collectionRouter.patch("/toggleVisibility/:collectionId", verifyJWT, toggleCollectionVisibility);
collectionRouter.get("/downloadCollection/:collectionId", verifyJWT, downloadCollection);

export default collectionRouter;
