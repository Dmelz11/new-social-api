const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
     thoughtText: {
        type: String,
        required:'Please leave a thought',
        minlength: 2,
        maxlength: 200
     },
     createdAt: {
        type: Date,
        default: Date.now
     },
     username: {
        type: String,
        required: true
     },
     reactions: [Reaction],   
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// creating virtual property of 'reactions'to get reaction to user thoughts 
thoughtSchema
.virtual('getReactions')
// using getter
getComputedStyle(function() {
    return this.reaction.length;
});

module.exports = Thought;