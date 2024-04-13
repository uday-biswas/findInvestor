const Profile = require("../models/profile");
const User = require("../models/user");
const Invoice = require("../models/invoice");
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
    ).populate("invoice");
    updatedUser.password = undefined;

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

const upgradeUser = async (req, res) => {
  try {
    const email = req.body.email;
    const membership = req.body.membership;
    let price;
    if (membership === "gold") {
      price = process.env.GOLD_PRICE;
    }
    else if (membership === "silver") {
      price = process.env.SILVER_PRICE;
    }
    else price = 0;
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
          currency: "usd",
          product_data: {
            name: `Subscribe to GetFunded ${membership} Subscription`,
            description: `for lifetime`,
          },
          unit_amount: Math.round(price * 100), // converting to cents
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
      customer_email: email,
      billing_address_collection: 'required',
      payment_intent_data: {
        // Create a Payment Intent with the same line items for card details and subscription billing
        description: `${membership}`,
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
    if (session.payment_status !== 'paid') {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }
    console.log("session : - > ", session);
    // console.log("line items : - > ", session.line_items.data[0].description);
    console.log("payment billing_details : - > ", session.payment_intent.payment_method.billing_details);
    console.log("payment card details : - > ", session.payment_intent.payment_method.card);
    console.log("membership : ", session.payment_intent.description);
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(user.invoice, {
      email: session.customer_email,
      name: session.payment_intent.payment_method.billing_details.name,
      address_country: session.payment_intent.payment_method.billing_details.address.country,
      address_line1: session.payment_intent.payment_method.billing_details.address.line1,
      address_line2: session.payment_intent.payment_method.billing_details.address.line2,
      address_postal_code: session.payment_intent.payment_method.billing_details.address.postal_code,
      address_city: session.payment_intent.payment_method.billing_details.address.city,
      address_state: session.payment_intent.payment_method.billing_details.address.state,
      card_brand: session.payment_intent.payment_method.card.brand,
      card_last4: session.payment_intent.payment_method.card.last4,
      card_exp_month: session.payment_intent.payment_method.card.exp_month,
      card_exp_year: session.payment_intent.payment_method.card.exp_year,
      amount: parseFloat(session.amount_total / 100).toFixed(2),
      currency: session.currency,
      membership: session.payment_intent.description,
    },
      { new: true }
    );

    const membership = session.payment_intent.description;

    const userDetails = await User.findOneAndUpdate(
      { email },
      { membership: membership },
      { new: true }
    ).populate("additionalDetails").populate("invoice");
    userDetails.password = undefined;
    console.log("userDetails : - > ", userDetails);
    res.status(200).json({
      success: true,
      message: "User upgraded successfully",
      data: userDetails,
      invoice: updatedInvoice,
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
  upgradeUser,
  paymentSuccess,
};
