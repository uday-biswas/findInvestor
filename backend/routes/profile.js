const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")


const {
    updateProfile,
    upgradeUser,
    paymentSuccess,
} = require("../controllers/profile")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// routes of update the profile
router.put("/updateProfile", updateProfile)
// routes for upgrade the user
router.post("/upgradeUser", upgradeUser)
// routes for payment success
router.post("/paymentSuccess", paymentSuccess)

module.exports = router
