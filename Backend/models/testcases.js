import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema({
    problemId: {
        type: Number,
        required: true
    },
    testcases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }] 
})

const TestCases = mongoose.model("TestCases", testcaseSchema);

export default TestCases;