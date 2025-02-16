import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { collection } from "../models/collection.model.js";

export const getAllPublicCollections = asyncHandler(async (req, res) => {
    try {
        const collections = await collection.find({ visibility: "public" }); // Fetch only public collections
        res.status(200).json(new ApiResponse(200, collections, "Public collections retrieved successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "Failed to fetch public collections"));
    }
});

export const getCollectionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const userCollections = await collection.find({ ownedBy: userId });

    if (!userCollections.length) {
        throw new ApiError(404, "No collections found for this user");
    }

    res.status(200).json(new ApiResponse(200, userCollections, "User collections retrieved successfully"));
});

export const createCollection = asyncHandler(async (req, res) => {
    const { title, description, company, visibility, questions } = req.body;

    const newCollection = await collection.create({
        title,
        description,
        company:company.trim(),
        ownedBy: req.user._id,
        visibility: visibility || "private",
        questions: questions || []
    });

    if (!newCollection) {
        throw new ApiError(403, "Could not create collection");
    }

    res.status(201).json(new ApiResponse(201, newCollection, "Collection created successfully"));
});

export const updateCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const updates = req.body;

    const updatedCollection = await collection.findOneAndUpdate(
        { _id: collectionId, ownedBy: req.user._id },
        updates,
        { new: true }
    );

    if (!updatedCollection) {
        throw new ApiError(404, "Collection not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, updatedCollection, "Collection updated successfully"));
});

export const deleteCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;

    const deletedCollection = await collection.findOneAndDelete({ _id: collectionId, ownedBy: req.user._id });

    if (!deletedCollection) {
        throw new ApiError(404, "Collection not found or unauthorized");
    }
    res.status(200).json(new ApiResponse(200, null, "Collection deleted successfully"));
});

export const addQuestionToCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const { text, answers } = req.body; // Question text and answers array

    const updatedCollection = await collection.findOneAndUpdate(
        { _id: collectionId, ownedBy: req.user._id },
        { $push: { questions: { text, answers } } }, // Push an object, not ID
        { new: true }
    );
    if (!updatedCollection) {
        throw new ApiError(404, "Collection not found or unauthorized");
    }
    res.status(200).json(new ApiResponse(200, updatedCollection, "Question added successfully"));

});

export const removeQuestionFromCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const { questionText } = req.body; // Identify question by its text

    const collectionToUpdate = await collection.findById(collectionId);
    
    if (!collectionToUpdate) {
        throw new ApiError(404, "Collection not found");
    }

    if (collectionToUpdate.ownedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized: You do not own this collection");
    }

    const updatedCollection = await collection.findByIdAndUpdate(
        collectionId,
        { $pull: { questions: { text: questionText } } }, // Remove question by text
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, updatedCollection, "Question removed successfully"));
});

export const toggleCollectionVisibility = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const { visibility } = req.body;

    console.log("Collection ID:", collectionId);
    console.log("User ID:", req.user._id); // authenticated user ID

    const collectionToUpdate = await collection.findById(collectionId);
    
    if (!collectionToUpdate) {
        throw new ApiError(404, "Collection not found");
    }

    // Checking if the user is the owner
    if (collectionToUpdate.ownedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized: You do not own this collection");
    }

    collectionToUpdate.visibility = visibility;
    await collectionToUpdate.save();

    res.status(200).json(new ApiResponse(200, collectionToUpdate, `Collection visibility changed to ${visibility}`));
});

export const downloadCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;

    const foundCollection = await collection.findOne({ _id: collectionId, visibility: "public" });

    if (!foundCollection) {
        throw new ApiError(404, "Collection not found or not public");
    }
    res.status(200).json(new ApiResponse(200, foundCollection, "Collection download initiated"));
});
