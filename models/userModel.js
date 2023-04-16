import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name."],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address."],
        unique: [true, "Email address already taken."],
    },
    password: {
        type: String,
        required: [true, "Please add the user password."],
    }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)


export { userModel }