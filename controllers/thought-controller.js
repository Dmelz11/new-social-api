const { Thought, User } = require('../models');

module.exports = {

    //getting all thoughts
    async getThoughts(req, res) {
     try {
        const thought = await Thought.find()
        .sort({ createdAt: -1});

        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
  }
 },

    //getting a single thought by the id 
    async getSingleThought(req, res) {
     try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});

        if (!thought) {
            return res.status(404).json({message: 'No thought with that id.'});
        }
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },

    //function to create new thought by associating 
    //the thought body to the user's ID with a newly generated thoughtID
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: { thoughts: thought._id }},
            {new: true}
          );
          if (!user) {
            return res.status(404).json({message:'Thought created, but no user found with that id'});
          }

          res.json({message:'Thought created!'});
        } catch (err) {
          console.log(err);
          res.status(500).json(err);  
        } 
    },

    //using the findOneAndUpdate method to update thought. Using id param and validation
    async updateThought(req, res) {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that id'});
        }

        res.json(thought);

        console.log(err);
        res.status(500).json(err);
      },  
  

    // finds and deletes thoughts from database by id
    // Then the user's thought db is updated to reflect the removed thought id.
async deleteThought(req, res) {
    try {
    const thought = await Thought.findOneAndDelete(
      {_id: req.params.thoughtId});

    if (!thought) {
      return res.status(404).json({message: 'No thought with that id'});
    }

    
    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: {thoughts: req.params.thoughtId} },
      { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Unable to find user by ID'});
    }
    

    res.json({message: 'Thought was successfully deleted!'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// adding a reaction to a user thought by adding reaction body to thought with the $addToSet operator
async addReaction(req,res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true}
    );

    if(!thought) {
      return res.status(404).json({message: 'No thought with that id'});
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
  },
  // deleting a reaction from a thought by finding the thought by its ID. then removes the reactionId from the thought. 
async removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $pull: { reactions: {reactionId: req.params.reactionId}}},
      { runValidators: true, new: true}
    );

    if(!thought) {
      return res.status(404).json({message: 'No thought with that id!'});
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
 },
};


 
