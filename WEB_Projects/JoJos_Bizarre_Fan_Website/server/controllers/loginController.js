const express = require("express")
const router = express.Router()
const loginModel = require("../models/loginModel.js")

//Request this route to retrieve all user info
router.get("/", async (req, res) => {
    console.log("got to route")
    try{
        const users = await loginModel.find()
 
        console.log(users)
        console.log(`Stringified in controller: ${JSON.stringify(users)}`)

        res.json(users)
    }catch(err){
        console.log("Attempt to get user info from server failed.\n Prompt user...", err)
        console.log('Error while fetching')
        res.status(500).json({ message: err.message });
    }
})
router.post("/create", async (req,res)=>{
    console.log("Req body: ", req.body)
    const newAccount = req.body
    await loginModel.create(newAccount)
})

module.exports = router