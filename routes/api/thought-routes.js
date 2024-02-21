const router = require('express').Router();

// build routes for CRUD operations for thoughts and reactions
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

//path to getAll and create thoughts = /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//path to get, update or delete a single thought = api/thoughts/:thoughtid
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// path to create a reation to a users thought = /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//path to delete a reaction = api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
