const express = require("express")
const router = express.Router()
const sceneModel = require("../models/sceneModel.js")

//Request this route to retrieve all user info
router.get("/", async (req, res) => {
    console.log("got to route")
    try{
        const scenes = await sceneModel.find()
 
        console.log(scenes)
        console.log(`Stringified in controller: ${JSON.stringify(scenes)}`)

        res.json(scenes)
    }catch(err){
        console.log("Attempt to get scene info from server failed.\n Prompt user...", err)
        console.log('Error while fetching')
        res.status(500).json({ message: err.message });
    }
})
router.post("/create", async (req,res)=>{
    console.log("Req body: ", req.body)
    const newScene = req.body
    await sceneModel.create(newScene)
})
router.delete("/:id", async (req,res)=> {
    console.log('delete route reached...')
    console.log('ID:')
    const {id } = req.params
    console.log(id)

    await sceneModel.findByIdAndDelete(id)
})
module.exports = router