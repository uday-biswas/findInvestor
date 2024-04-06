const User = require('../models/user');
const List = require('../models/list');

const getListDetails = async (req, res) => {
  try {
    const email = req.params.email; 
    const user = await User.findById(email).populate({
      path: 'investorLists',
      populate: {
        path: 'investors',
        model: 'Investor', 
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.investorLists);
  } catch (error) {
    console.error('Error fetching investor lists:', error);
    res.status(500).json({ message: error.message });
  }
};

const createList = async (req, res) => {
    try { 
      const { name, email,  } = req.body; 
  
      const user = await User.findById(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user already has a list with the same name
      const existingList = user.investorLists.find(list => list.name === name);
      if (existingList) {
        return res.status(400).json({ message: 'List with the same name already exists for the user' });
      }

      const newList = new List({
        name,
        desc,
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
      const listId = req.body.listId; 
  
      const user = await User.findById(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has the list to be deleted
      const listIndex = user.investorLists.findIndex(list => list.equals(listId));
      if (listIndex === -1) {
        return res.status(404).json({ message: 'List not found for the user' });
      }
  
      // Remove the list from the user's investorLists array
      user.investorLists.splice(listIndex, 1);
      await user.save(); // Save the updated user document
  
      // Delete the list document from the database
      await List.findByIdAndDelete(listId);
  
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
      console.error('Error deleting list:', error);
      res.status(500).json({ message: error.message });
    }
  };

  const addInvestorToList = async (req, res) => {
    try {
      const email = req.body.email; 
      const listId = req.body.listId; 
      const investorId = req.body.investorId; 
  
      const user = await User.findById(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has the list to add the investor to
      const listIndex = user.investorLists.findIndex(list => list.equals(listId));
      if (listIndex === -1) {
        return res.status(404).json({ message: 'List not found for the user' });
      }
  
      const list = await List.findById(listId);
  
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }
  
      // Check if the investor is already in the list
      if (list.investors.includes(investorId)) {
        return res.status(400).json({ message: 'Investor already exists in the list' });
      }
  
      // Add the investor to the list
      list.investors.push(investorId);
      list.dateModified = new Date();
      await list.save(); // Save the updated list document
  
      res.status(200).json({ message: 'Investor added to list successfully' });
    } catch (error) {
      console.error('Error adding investor to list:', error);
      res.status(500).json({ message: error.message });
    }
  };

  const removeInvestorFromList = async (req, res) => {
    try {
      const email = req.body.email; 
      const listId = req.body.listId; 
      const investorId = req.body.investorId; 
  
      const user = await User.findById(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has the list to remove the investor from
      const listIndex = user.investorLists.findIndex(list => list.equals(listId));
      if (listIndex === -1) {
        return res.status(404).json({ message: 'List not found for the user' });
      }
  
      const list = await List.findById(listId);
  
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }
  
      // Check if the investor is in the list
      const investorIndex = list.investors.findIndex(inv => inv.equals(investorId));
      if (investorIndex === -1) {
        return res.status(400).json({ message: 'Investor not found in the list' });
      }
  
      // Remove the investor from the list
      list.investors.splice(investorIndex, 1);
      list.dateModified = new Date();
      await list.save(); // Save the updated list document
  
      res.status(200).json({ message: 'Investor removed from list successfully' });
    } catch (error) {
      console.error('Error removing investor from list:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const addPageToList = async (req, res) => {
    try {
      const email = req.body.email;
      const listId = req.body.listId; 
      const investors = req.body.investors;
  
      const user = await User.findById(email);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has the list to add the investors to
      const listIndex = user.investorLists.findIndex(list => list.equals(listId));
      if (listIndex === -1) {
        return res.status(404).json({ message: 'List not found for the user' });
      }
  
      const list = await List.findById(listId);
  
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }
  
      // Add the investors to the list
      list.investors.push(...investors);
      list.dateModified = new Date();
      await list.save(); // Save the updated list document
  
      res.status(200).json({ message: 'Page of investors added to list successfully' });
    } catch (error) {
      console.error('Error adding page of investors to list:', error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { getListDetails, createList, deleteList, 
    addInvestorToList, removeInvestorFromList, addPageToList };