import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
