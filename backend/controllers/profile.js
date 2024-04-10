const Profile = require("../models/profile");
const User = require("../models/user");
const pitchdeck = require("../models/pitchdeck");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
require("dotenv").config();

const updateProfile = async (req, res) => {
  try {
    // fetch data
    const { gender = "", dob: dateOfBirth = "", about = "", contact: contactNumber = "",
      email } = req.body;

    // update profile
    const userDetails = await User.findOne({ email });
    console.log(`UserDETAIL : - > ${userDetails}`);

    const profileId = userDetails.additionalDetails || null; // Set to null if additionalDetails is missing

    if (!profileId) {
      return res.status(404).json({
        success: false,
        message: "User profile not found or additionalDetails missing",
      });
    }

    console.log("profile id  : - .", profileId);
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        gender,
        dateOfBirth,
        about,
        contactNumber,
      },
      { new: true }
    );
    const updatedUser = await User.findOne({ email }).populate(
      "additionalDetails"
    );

    // return success response
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log("error in updating a profile ", err);
    return res.status(500).json({
      success: false,
      message: "not able to update profile",
      error: err.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // fetch data
    const userId = req.user.id;
    console.log(`user id : - >${userId}`);
    const userDetail = await User.findById(userId);
    console.log(`userdetail : - > ${userDetail}`);
    // validate
    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // delete profile of of the user
    const profileId = userDetail.additionalDetails;
    console.log(`profile id : - > ${profileId}`);
    console.log(`type of profile id  : ->${typeof profileId}`);
    const deletedProfile = await Profile.findByIdAndDelete(profileId);
    // delete user
    const deletedUser = await User.findByIdAndDelete({
      _id: userId,
    });

    // return success response
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      deletedUser: deletedUser,
    });
  } catch (err) {
    console.log("error in deleting a profile ", err);
    return res.status(500).json({
      success: false,
      message: "not able to delete profile",
      error: err.message,
    });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    // const id = req.user.id;
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "fail to fetch user detail",
      error: error.message,
    });
  }
};

const upgradeUser = async (req, res) => {
  try {
    const email = req.body.email;
    const membership = req.body.membership;
    console.log("email : - > ", email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const lineitems = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: membership,
            description: email,
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"],
      line_items: lineitems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/dashboard/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/cancel`,
      payment_intent_data: {
        // Create a Payment Intent with the same line items for card details and subscription billing
        description: `Upgrade to ${membership} for ${email}`,
        metadata: {
          userId: user.id,
          email: email,
        },
      },
    });
    console.log("session : - > ", session);

    res.status(200).json({
      success: true,
      message: "redirecting to payment gateway",
      sessionId: session.id,
    });
  } catch (error) {
    console.log("error in upgrading user : - > ", error.message);
    return res.status(500).json({
      success: false,
      message: "fail to fetch user detail",
      error: error.message,
    });
  }
}

const paymentSuccess = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.body.session, {
      expand: ["line_items", "payment_intent", 'payment_intent.payment_method'],
    }
    );
    console.log("session : - > ", session);
    console.log("line items : - > ", session.line_items.data[0].description);
    console.log("payment billing_details : - > ", session.payment_intent.payment_method.billing_details);
    console.log("payment card details : - > ", session.payment_intent.payment_method.card);
    const email = req.body.email;
    const membership = session.line_items.data[0].description;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userDetails = await User.findOneAndUpdate(
      { email },
      { membership: membership },
      { new: true }
    ).populate("additionalDetails");
    // console.log("userDetails : - > ", userDetails);
    res.status(200).json({
      success: true,
      message: "User upgraded successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log("error in upgrading user : - > ", error.message);
    return res.status(500).json({
      success: false,
      message: "fail to fetch user detail",
      error: error.message,
    });
  }
}


module.exports = {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  upgradeUser,
  paymentSuccess,
};
