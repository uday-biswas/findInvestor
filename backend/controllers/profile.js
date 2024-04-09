const Profile = require("../models/profile");
const User = require("../models/user");
const pitchdeck = require("../models/pitchdeck");
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

module.exports = {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
};
