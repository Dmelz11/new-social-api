const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
     thoughtText: {
        type: String,
        required:'Please leave a thought',
        minlength: 1,
        maxlength: 280
     },
     createdAt: {
        type: Date,
        default: Date.now,
       
     },
     username: {
        type: String,
        required: true
     },
     reactions: [reactionSchema],   
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
// creating virtual property of 'reactions'to get reaction to user thoughts 
thoughtSchema.virtual('reactionCount')
// using getter
.get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;