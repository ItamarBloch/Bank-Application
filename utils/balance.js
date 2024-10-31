const User = require("../models/user");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function getBalance(req, res) {
    const token = req.headers["authorization"]?.split(" ")[1];

    let decodeToken = jwt.verify(token, JWT_SECRET);

    const currentUser = await User.findOne({ email: decodeToken.email });

    if (!currentUser) {
        return res.status(404).send({ message: "User not found" }); 
    }

    return res.status(200).send({ balance: currentUser.balance });
}

async function updateBalance(senderAcc, reciverAcc, amount)
{
    // Convert balance and amount to numbers
    const amountNum = parseFloat(amount); 
    senderAcc.balance = parseFloat(senderAcc.balance) - amountNum;
    reciverAcc.balance = parseFloat(reciverAcc.balance) + amountNum;

    try 
    {
        await senderAcc.save();
        await reciverAcc.save();
    }
    catch (error) 
    {
        console.error('Error finding user:', error);
        res.status(500).send({success: false, "message": 'Server error' });
    }
}

module.exports = {getBalance , updateBalance};
