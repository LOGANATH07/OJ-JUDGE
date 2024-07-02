import Problem from "../models/problems.js";

const allproblems = async (req, res) => {
    try{
        const problem = await Problem.find();
        res.status(201).send(problem)
        // if(problem){
        //     res.status(201).json(problem);
        // }
        // else{
        //     res.status(400).json('Problem ID doesnot already exists');
        // }

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

export { allproblems }