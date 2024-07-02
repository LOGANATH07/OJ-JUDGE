import Problem from "../models/problems.js";

const getproblem = async (req, res) => {
    try{
        const {problemId} = req.query;
        console.log(problemId);
        const problem = await Problem.findOne({ problemId:problemId });
        if(problem){
            res.status(201).json(problem);
        }
        else{
            res.status(400).json('Problem ID doesnot already exists');
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

export { getproblem }