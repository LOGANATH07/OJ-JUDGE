import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    problemId:{
        type:Number,
        required: true,
        unique: true
    },
    level:{
        type:String
    },
    category:[{
        type: String
    }]
})

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;