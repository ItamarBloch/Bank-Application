const Transaction = require("../models/transaction.js");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function makeTransactions(req, res) {
    const { email, amount } = req.body; 
    
    const token = req.headers.authorization?.split(" ")[1];

    let currentUser;
    try {
        currentUser = jwt.verify(token, JWT_SECRET); // Decode the token using your secret
    } catch (err) {
        console.log("Make Transaction: verify token error", err);
        return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    // ++ add to check if user has enough money
    // ++ if he doesnt send to it self

    // Find the receiver user by email
    const receiver = await User.findOne({ email });

    if (!receiver) {
        return res.status(404).send({ message: "Receiver not found" }); 
    }

    // Create the transaction
    const transaction = new Transaction({
        sender: { name: currentUser.name, id: currentUser.userId },
        receiver: { name: receiver.name, id: receiver._id }, // You'll need to resolve the user ID from the email, or handle it accordingly
        amount: amount,
    });

    try {
        await transaction.save();
        res.status(201).send({ message: "Transaction successful", transaction });
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).send({ message: "Server error while saving transaction" });
    }
    
}

async function getTransactions(req, res)
{
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    let currentUser;
    try {
        currentUser = jwt.verify(token, JWT_SECRET); // Decode the token using your secret
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized: Invalid token" });
    }

    // Fetch transactions where the current user is either the sender or receiver
    try {
        const transactions = await Transaction.find({
            $or: [
                { 'sender.id': currentUser.userId }, // Match sender ID
                { 'receiver.id': currentUser.userId } // Match receiver ID
            ]
        });

        res.status(200).send({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send({ message: "Server error while fetching transactions" });
    }
}

module.exports = {getTransactions, makeTransactions};