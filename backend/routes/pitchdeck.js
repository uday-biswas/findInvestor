const express = require("express")
const router = express.Router()


const { 
    getPitchDeckDetails
} = require("../controllers/pitchdeck")


// ********************************************************************************************************
//                                      Investor routes
// ********************************************************************************************************

// routes for getting investor details according to the search terms
router.get("/getpitchdeckdetails", getPitchDeckDetails)

module.exports = router
