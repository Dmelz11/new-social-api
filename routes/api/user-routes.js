const router = require('express').Router();
//  settin up routes for CRUD operations
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// path to getAll or create user = /api/users
router.route('/').get(getUsers).post(createUser);

// path to get, update or delete a single user = /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// path to create or delete a friend using both ids = /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;