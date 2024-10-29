
const express = require("express"); // catch the default export (like library)
const mongoose = require("mongoose"); // catch the default export
const cors = require("cors"); // catch the default export
require('dotenv').config();
const {signup, signin, verify} = require("./controllers/autotication.js"); // catch the specific {$fucntion_name} from export
const {getTransactions, makeTransactions} = require("./controllers/transactions.js");


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
    }); // ‘/’ represents the root or main endpoint of our server. (app.get (GET))

app.post("/signup", signup); //it is a callback that automaticliy recieves rec/res
app.post("/signin", signin); //it is a callback that automaticliy recieves rec/res
app.get("/verify-email", verify);

app.post("/transactions", makeTransactions);
app.get("/transactions", getTransactions); //it is a callback that automaticliy recieves rec/res

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
    });//listen to port (the server is UP with port ($port))  // () =>     LAMBDA

