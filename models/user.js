import mongoose from "mongoose";

// Defining the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [/.+@.+\..+/, "Email invalid!"], // Simple regex for email validation
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
    default: "", // Assuming an empty string as default if no image is provided
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
