const {Thought, User} = require('../models');

module.exports ={

    //getting all thoughts
    async getThoughts(req, res) {
     try {
        const thoughts = await Thought.find();
        res.json(thoughts);
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
        res.json(application);
      } catch (err) {
        res.status(500).json(err);
        }
    },

    //function to create new thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: { thoughts: thought._id }},
            {new: true}
          );
          if (!user) {
            return res.status(404).json({message:'Thought created, but no user found with that id'
            })
          }

          res.json('Thought created!');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);  
        } 
    },

    //using the findOneAndUpdate method to update thought. Using id param and validation
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that id'});
        }

        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // finds and deletes thoughts from database by id

    }
