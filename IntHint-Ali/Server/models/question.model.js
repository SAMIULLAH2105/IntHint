import mongoose,{Schema} from "mongoose";

const questionSchema = new Schema({
    partOfCollection: { type: mongoose.Schema.Types.ObjectId, ref: "collection", required: true },
    question_text: { type: String, required: true },
    
    
   
    
},{
    timestamps:true
});

export const question=mongoose.model("question",questionSchema);

