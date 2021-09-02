import mongoose from 'mongoose';

const questions = new mongoose.Schema( {
    content: {
        type: String,
        required: true
    },
    usernameQ: {
        type: String,
        required: true,
        timestamp: { type: Date, default: Date.now}
    }
});


const Question = mongoose.model('Question', questions);

export default Question;