const mongoose  = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((error) => 
        console.log("error in connecting db:", error)
    );
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
},{timestamps: true})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        requires: true,
        default: 0,
    }
}, {
    timestamps: true,
})

const User = new mongoose.model("User", userSchema);
const Account = new mongoose.model("Account", accountSchema);

module.exports = { User, Account, connectDb };