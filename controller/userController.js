import asyncHandler from "express-async-handler"
import { userModel as User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//@desc Register a User
//@route Post /api/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory.");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already Exists")
    }

    /// hash password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword)

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email, })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }

})

//@desc Login User
//@route Post /api/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory.");
    }

    //compared password with hash password
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
})


//@desc Current User Info
//@route Get /api/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

export {
    registerUser,
    loginUser,
    currentUser
}