const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


//@desc Current User info
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User alreasy exists!");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        email,
        password: hashedPass
    });
    if (user) {
        res.status(201).send({ _id: user._id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }
    res.json({ message: "User registered!" });
});

//@desc Current User info
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401);
        throw new Error("Please enter all the fields!");
    }
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(200);
        throw new Error("Email or password is not valid!");
    }
});


//@desc Current User info
//@route GET /api/user/current
//@access private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };