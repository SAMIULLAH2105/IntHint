import mongoose,{Schema} from "mongoose";
const CollectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    visibility: { type: String, enum: ["public", "private"], required: true },
    questions: [
      {
        text: { type: String, required: true }, 
        answers: [
          {
            text: { type: String, required: true }, 
          },
        ],
      },
    ],
  }, { timestamps: true });
  
export const collection = mongoose.model("collection", CollectionSchema);
  