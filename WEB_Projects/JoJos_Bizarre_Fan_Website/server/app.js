const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

const mongo_uri = "mongodb+srv://Crzzy98:Asaada98@my-project-db.vdxh6xr.mongodb.net/my-project-db?retryWrites=true&w=majority&appName=my-project-db"
const port = 3000

//Controllers for routing
const login = require("./controllers/loginController.js")
const scene = require("./controllers/sceneController.js")
//Parse incoming requests as json and store data in req.body
app.use(express.json())

//Add CORs middleware to accomodate security
app.use(cors());

app.use("/login", login)
app.use("/scenes", scene)

app.get("/", (req, res) => {
    res.send({ message: "Hello" });
})

mongoose.connect(mongo_uri).then(()=> {
    app.listen(port, () => {
        console.log("Server listening on port ", port)
    })
})
