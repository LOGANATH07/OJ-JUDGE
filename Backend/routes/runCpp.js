import executeCpp from "./runCode/executeCpp.js";
import generateFile from "./runCode/generatefile.js";

const runCpp = async (req,res) => {
    const {language='cpp', code,input} = req.body;
    if(code==undefined){
        return res.status(400).json({success:false,error: 'No code provided'});
    }
    try{
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath,input)
        console.log(output);
        res.json({filePath,output})
    } catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
}

export {runCpp}