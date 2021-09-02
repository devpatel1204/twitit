import mongoose from 'mongoose';

const answers = new mongoose.Schema( {
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


const Answer = mongoose.model('Answer', answers);

export default Answer;