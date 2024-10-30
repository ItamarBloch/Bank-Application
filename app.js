
const express = require("express"); // catch the default export (like library)
const mongoose = require("mongoose"); // catch the default export
const cors = require("cors"); // catch the default export
require('dotenv').config();
const {signup, signin, verify} = require("./controllers/authentication.js"); // catch the specific {$fucntion_name} from export
const {getTransactions, makeTransactions} = require("./controllers/transactions.js");
const authorizeToken = require("./middleware/authorizeToken");

const app = express(); // create an instance of server
 
const uri = process.env.DATABASE_URL; // the mongose specific port is: 27017 and the ip of the DB is what you chose

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });//connect to the DB

app.use(express.json()) // every request Parse it with the style of express.json (FromBuffer)
app.use(cors()); // allows front to access the server (backend) (postman have access without it i dont know why)

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
    }); 

app.post("/signup", signup); 
app.post("/signin", signin); 
app.get("/verify-email", verify);

app.post("/transactions", authorizeToken, makeTransactions);
app.get("/transactions", authorizeToken, getTransactions);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
    });

