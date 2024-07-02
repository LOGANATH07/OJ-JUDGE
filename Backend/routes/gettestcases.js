import TestCases from "../models/testcases.js";

const gettestcases = async (req, res) => {
    try{
        const {problemId} = req.query;
        const testcases = await TestCases.findOne({ problemId:problemId });
        if(testcases){
            res.status(201).json(testcases);
        }
        else{
            res.status(404).json('Problem ID doesnot already exists');
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

export { gettestcases }