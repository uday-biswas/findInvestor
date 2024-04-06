const express = require("express")
const router = express.Router()


const { 
    getListDetails,
    createList,
    deleteList,
    addInvestorToList,
    removeInvestorFromList,
    addPageToList,
} = require("../controllers/list")


// ********************************************************************************************************
//                                      Investor routes
// ********************************************************************************************************

// routes for getting investor details according to the search terms
router.get("/getListDetails", getListDetails)
router.post("/createList", createList)
router.delete("/deleteList", deleteList)
router.put("/addPageToList", addPageToList)
router.post("/addInvestorToList", addInvestorToList)    
router.put("/removeInvestorFromList", removeInvestorFromList)

module.exports = router