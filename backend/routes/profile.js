const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")


const {
    updateProfile,
    deleteAccount,
    getAllUserDetails
} = require("../controllers/profile")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// routes for getting all the user information for particular user
router.get("/getUserDetails", auth, getAllUserDetails)
// routes of update the profile
router.put("/updateProfile", updateProfile)
// routes for delete the account
router.delete("/deleteAccount", auth, deleteAccount)

module.exports = router
