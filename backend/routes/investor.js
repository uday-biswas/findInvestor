const express = require("express")
const router = express.Router()


const { 
    getInvestorDetails
} = require("../controllers/investor")


// ********************************************************************************************************
//                                      Investor routes
// ********************************************************************************************************

// routes for getting investor details according to the search terms
router.get("/getInvestorDetails", getInvestorDetails)

module.exports = router
