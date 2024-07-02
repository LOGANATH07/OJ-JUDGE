import Problem from "../models/problems.js";

const postproblem = async (req, res) => {
    try{
        const {title,description,problemId,level,category} = req.body;

        if(!title ||!description ||!problemId) {
            res.status(400).json({
                status:400,
                message: 'All fields are required'
            })
        }
        const existingProblem = await Problem.findOne({ problemId });
        if(existingProblem) {
            return res.status(400).send('ProblemId already exists');
        }
        const newProblem = new Problem({title, description, problemId, level, category});
        await newProblem.save();
        res.status(201).json({
            status:201,
            message: 'Problem created successfully',
            data: newProblem
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

export { postproblem }