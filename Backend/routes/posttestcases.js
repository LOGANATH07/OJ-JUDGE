import TestCases from "../models/testcases.js";

const posttestcases = async (req, res) => {
    try{
        const {problemId,testcases} = req.body;

        if(!problemId || testcases.length === 0) {
            res.status(400).json({
                status:400,
                message: 'All fields are required'
            })
        }
        const existingProblem = await TestCases.findOne({ problemId });
        if(existingProblem) {
            return res.status(400).send('ProblemId already exists');
        }
        const newProblemtestcase = new TestCases({problemId,testcases});
        await newProblemtestcase.save();
        res.status(201).json({
            status:201,
            message: 'Problem Testcase created successfully',
            data: newProblemtestcase,
            success: true
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

export { posttestcases }