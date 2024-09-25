const express = require("express");
const mongoose = require("mongoose");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const zod = require("zod");

const router = express.Router();

router.get("/balance",authMiddleware, async (req, res) => {
    try {
        const userId = await req.userId;
        // console.log("userId:",userId);
        const account = await Account.findOne({userId});
        // console.log("account", account);
        return res.status(200).json({
            balance: account.balance
        })

    } catch (error) {
        // console.log("error in getting balance: ", error);
        return res.status(411).json({
            message: "Error in getting balance"
        })
    }
})

// const transferBody = zod.object({
//     to : zod.string(),
//     amount: zod.number(),
// })

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        console.log("hello")
        const session = await mongoose.startSession();
        console.log("hello: again");

        session.startTransaction();
        const { to, amount } = req.body;

        // const { success } = transferBody.safeParse(req.body);
        // if(!success) {
        //     await session.abortTransaction();
        //     return res.status(400).json({
        //         message: "Invalid receiver or Insufficient balance"
        //     })
        // }
        console.log("req.userId: ", req.userId);

        const fromAccount = await Account.findOne({userId: req.userId}).session(session);
        console.log("fromAccount: ", fromAccount);

        if(fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        console.log("fromAccount before: ", fromAccount);
        
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        const fromAccountAfter = await Account.findOne({userId: req.userId}).session(session);

        console.log("fromAccount after: ", fromAccountAfter);

        await session.commitTransaction();

        return res.status(200).json({
            message: "Transaction successful"
        })

    } catch (error) {
        console.log("error in transaction: ", error);
        return res.status(400).json({
            message: "Error happened in transaction"
        })
    }
})

module.exports =  router ;