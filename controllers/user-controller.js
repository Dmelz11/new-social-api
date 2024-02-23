const { User, Thought } = require("../models");

// creating the userController variable
const userController = {
  // getting users
  async getUsers(req, res) {
    try {
      const user = await User.find().select("-__v")

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //creates a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
  // updates a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //delete user
  async deleteUser (req, res) {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId})

        if (!user) {
            return res.status(404).json({message: 'No user with that id'});
        }

        res.json(user);
     }  catch (err) {
        console.log(err);
        res.status(500).json(err);
     }
   },

  // add a friend to user's friends
  async addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId});

        if(!user) {
            return res.status(404)({message: 'No user with that id'})
        }

        res.json(user);
      } catch (err) {
        console.log(err);
      }
  },
  // remove a user's friend
  async removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId});

        if (!user) {
            return res.status(404).json({message: 'No user with that id'});
        }
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      } 
  },
};
module.exports = userController;
