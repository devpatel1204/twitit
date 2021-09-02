import mongoose from 'mongoose';

const follow = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    following: [String],
    follower: [String]
});


const Follow = mongoose.model('Follow', follow);

export default Follow;  