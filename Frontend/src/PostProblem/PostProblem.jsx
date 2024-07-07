import "bootstrap/dist/css/bootstrap.min.css";
import "./PostProblem.css"
import { useState } from "react";
import { postProblem, postTestCases } from "../service/api";

function PostProblem(){

    const [problemDescription, setProblemDescription] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [problemId, setProblemId] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [title, setTitle] = useState("")

    const sendProblemstoServer = async ()=>{
        try{
            const response = await postProblem(title,problemDescription,Number(problemId),level,category.split(","));
            if(response.success) console.log('Problem sent successfully');
            const response1 = await postTestCases(problemId,[{input,output}]);
            if(response1.success) console.log('Test cases sent successfully');
        } catch(error){
            console.error('Error:', error);
        }
    }

    return (
        <div id="PostProblem">
            <div className="d-flex flex-column w-100">
                <div className="border border-white text-center">Welcome Admin</div>
                <div className="border border-white text-center">Post a problem</div>
                <div className="border border-white text-center">
                    <div className="d-flex justify-content-evenly">
                        <div className="border border-white flex-grow-1 m-2">
                            <div>ProblemID</div>
                            <textarea onChange={(e)=>{setProblemId(e.target.value)}} className="w-100" placeholder="Enter problem ID" />
                        </div>
                        <div className="border border-white flex-grow-1 m-2">
                            <div>Title</div>
                            <textarea onChange={(e)=>{setTitle(e.target.value)}} className="w-100"  placeholder="Enter Problem title" />
                        </div>
                        <div className="border border-white flex-grow-1 m-2">
                            <div>Category</div>
                            <textarea onChange={(e)=>{setCategory(e.target.value)}} className="w-100"  placeholder="Enter Problem categories" />
                        </div>
                        <div className="border border-white flex-grow-1 m-2">
                            <div>Level</div>
                            <textarea onChange={(e)=>{setLevel(e.target.value)}} className="w-100"  placeholder="Enter Problem Level" />
                        </div>
                    </div>
                </div>
                <div className="d-flex border border-white text-center h-100 border">
                    <div className="flex-grow-1 m-2">
                        <div>Problem Description</div>
                        <textarea onChange={(e)=>{setProblemDescription(e.target.value)}} className="w-100" placeholder="Enter problem description" />
                    </div>
                    <div className="flex-grow-1 m-2">
                        <div>Input</div>
                        <textarea onChange={(e)=>{setInput(e.target.value)}} className="w-100" placeholder="Enter problem input" />
                        <div>Output</div>
                        <textarea onChange={(e)=>{setOutput(e.target.value)}} className="w-100" placeholder="Enter problem output" />
                    </div>
                </div>
                <div className="text-center">
                    <button className="bg-white text-black" onClick={sendProblemstoServer}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export {PostProblem}