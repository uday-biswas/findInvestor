const express = require("express")
const router = express.Router()


const {
    getListDetails,
    createList,
    deleteList,
    addInvestorToList,
    removeInvestorFromList,
    updateList,
} = require("../controllers/list")


// ********************************************************************************************************
//                                      Investor routes
// ********************************************************************************************************

// routes for getting investor details according to the search terms
router.get("/getListDetails", getListDetails)
router.post("/createList", createList)
router.delete("/deleteList", deleteList)
router.post("/addInvestorToList", addInvestorToList)
router.put("/removeInvestorFromList", removeInvestorFromList)
router.put("/updateList", updateList)

module.exports = router
