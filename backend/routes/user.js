const express = require("express"); 
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET= process.env.JWT_SECRET

const router = express.Router();

const signUpSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
});

router.post("/signup", async (req, res) => {
    const {username, firstName, lastName, password} = req.body;
    // console.log("req.body: ", req.body);

    // validating inputs
    const { success } = signUpSchema.safeParse(req.body);

    if(!success) {
        // console.log("invalid inputs");
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }
    

    //check if user already exists
    const exists = await User.findOne({ username});
    if(exists) {
        // console.log("user already exists:");
        return res.status(411).json({message:"Email already taken / Incorrect inputs"});
    }

    // creating new user
    const newUser = await User.create({
        username,
        firstName,
        lastName,
        password,
    })

    const userId = newUser._id;

    // create new account

    await Account.create({
        userId,
        balance: 1+Math.random()*10000
    });

    // creating token using userid
    const token = jwt.sign({ userId }, JWT_SECRET);
    // console.log("new user created")

    return res.status(200).json({message:"User created successfully", token})
})

const signInSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    // validate inputs
    const { success } = signInSchema.safeParse(req.body);

    if(!success) {
        return res.status(411).json({message: "Email not registered / Incorrect inputs"});
    }

    // check is user exists or not
    const exists = await User.findOne({username, password});

    if(!exists) { 
        return res.status(411).json({message: "User with this username does not exists"});
    }

    // if it exists
    const token = jwt.sign({ userId: exists._id}, JWT_SECRET);

    return res.status(200).json({token});

})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { firstName, lastName, password } = req.body;

    const { success } = updateBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Invalid body"
        })
    }

    const updatedUser = await User.findByIdAndUpdate({_id: req.userId}, {
        firstName, 
        lastName,
        password
    })

    return res.status(200).json({message: "Updated Successfully"})
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })
    // console.log("userId: ", req.userId);
    const filteredUsers = users.filter((user) => user._id != req.userId);
    // console.log("filteredUser: ", filteredUsers);

    return res.json({
        user: filteredUsers.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})



module.exports = router;