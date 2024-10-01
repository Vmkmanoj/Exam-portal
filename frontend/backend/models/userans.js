const mongoose = require("mongoose");

const userAnsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    questions: [{
        question: { type: String, required: true }, // Store the question text
        answers: [{ type: String }] // Store an array of answers
    }]
});

const userans = mongoose.model('userAns', userAnsSchema);

module.exports = userans;
