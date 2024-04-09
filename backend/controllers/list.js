const User = require('../models/user');
const List = require('../models/list');
const mongoose = require('mongoose');

const getListDetails = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("email: ", email);
    const user = await User.findOne({ email }).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor',
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User lists fetched successfully',
      lists: user.investorLists,
    });
  } catch (error) {
    console.error('Error fetching investor lists:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createList = async (req, res) => {
  try {
    const { name, description, email, } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    console.log("user: ", user);

    // Check if the user already has a list with the same name
    const existingList = user.investorLists.find(list => list.name === name);
    if (existingList) {
      return res.status(400).json({
        success: false,
        message: 'List with the same name already exists for the user'
      });
    }

    const newList = new List({
      name,
      desc: description,
      investors: [],
    });

    await newList.save(); // Save the new list to the database

    user.investorLists.push(newList._id); // Add the new list's ID to the user's investorLists array
    await user.save(); // Save the updated user document

    res.status(201).json({
      success: true,
      message: 'List created successfully',
      list: newList,
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const email = req.body.email;
    const idList = req.body.listId;
    const listId = new mongoose.Types.ObjectId(idList);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the list to be deleted
    const listIndex = user.investorLists.findIndex(list => list.equals(listId));
    if (listIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'List not found for the user'
      });
    }

    // Remove the list from the user's investorLists array
    user.investorLists.splice(listIndex, 1);
    await user.save(); // Save the updated user document

    // Delete the list document from the database
    await List.findByIdAndDelete(listId);

    const updatedUser = await User.findOne({ email }).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor',
      },
    });

    res.status(200).json({
      success: true,
      message: 'List deleted successfully',
      lists: updatedUser.investorLists,
    });
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ message: error.message });
  }
};

const addInvestorToList = async (req, res) => {
  try {
    const email = req.body.email;
    const listIds = req.body.listIds;
    const investorIds = req.body.investorIds;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    for (const listId of listIds) {
      // console.log(`+${listId}+`);
      const listObjectId = new mongoose.Types.ObjectId(listId);

      const listIndex = user.investorLists.findIndex(list => list.equals(listObjectId));
      if (listIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'List not found for the user'
        });
      }

      const list = await List.findById(listId);

      if (!list) {
        return res.status(404).json({
          success: false,
          message: 'List not found'
        });
      }

      for (const investorId of investorIds) {
        // Check if the investor is already in the list
        updatedId = new mongoose.Types.ObjectId(investorId);
        if (list.investors.includes(updatedId)) {
          return res.status(400).json({
            success: false,
            message: 'Investor already exists in the list'
          });
        }

        // Add the investor to the list
        list.investors.push(investorId);
      }
      list.dateModified = new Date();
      await list.save(); // Save the updated list document
    }

    const updatedUser = await User.findOne({ email }).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor',
      },
    });


    res.status(200).json({
      success: true,
      message: 'Investor added to list successfully',
      lists: updatedUser.investorLists,
    });
  } catch (error) {
    console.error('Error adding investor to list:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeInvestorFromList = async (req, res) => {
  try {
    const email = req.body.email;
    const idList = req.body.listId;
    const listId = new mongoose.Types.ObjectId(idList);
    const idInvestor = req.body.investorId;
    const investorId = new mongoose.Types.ObjectId(idInvestor);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if the user has the list to remove the investor from
    const listIndex = user.investorLists.findIndex(list => list.equals(idList));
    if (listIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'List not found for the user'
      });
    }

    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'List not found'
      });
    }

    // Check if the investor is in the list
    const investorIndex = list.investors.findIndex(inv => inv.equals(investorId));
    if (investorIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Investor not found in the list'
      });
    }

    // Remove the investor from the list
    list.investors.splice(investorIndex, 1);
    list.dateModified = new Date();
    await list.save(); // Save the updated list document

    const updatedUser = await User.findOne({ email }).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Investor removed from list successfully',
      lists: updatedUser.investorLists,
    });
  } catch (error) {
    console.error('Error removing investor from list:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateList = async (req, res) => {
  try {
    const email = req.body.email;
    const idList = req.body.id;
    const listId = new mongoose.Types.ObjectId(idList);
    const name = req.body.name;
    const desc = req.body.description;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if the user has the list to update
    const listIndex = user.investorLists.findIndex(list => list.equals(listId));
    if (listIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'List not found for the user'
      });
    }

    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'List not found'
      });
    }

    list.name = name;
    list.desc = desc;
    list.dateModified = new Date();
    await list.save(); // Save the updated list document

    const updatedUser = await User.findOne({ email }).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor',
      },
    });

    res.status(200).json({
      success: true,
      message: 'List updated successfully',
      lists: updatedUser.investorLists,
    });
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getListDetails, createList, deleteList,
  addInvestorToList, removeInvestorFromList, updateList
};