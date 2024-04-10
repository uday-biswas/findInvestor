const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")


const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    upgradeUser,
    paymentSuccess,
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
// routes for upgrade the user
router.post("/upgradeUser", upgradeUser)
// routes for payment success
router.post("/paymentSuccess", paymentSuccess)

module.exports = router
