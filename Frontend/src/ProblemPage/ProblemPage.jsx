import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./ProblemPage.css"
import { getTestcasesFromServer, runCodeCpp } from "../service/api";
import { HomePage } from "../HomePage/HomePage";


function ProblemPage(problem) {
    const [language, setLanguage] = useState("cpp");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("");
    const [coderesults, setCoderesults] = useState("")
    const [goBack, setGoBack] = useState(false)
    // console.log(problem);
    const {title,description,problemId,level,category} = problem.Problem;

    const submitCode = async () => {
        try {
            const response = await getTestcasesFromServer(problemId);
            console.log(response);
            for(let testcase of response.testcases) {
                console.log(testcase.input);
                const response = await runCodeCpp(language, code, testcase.input);
                if(response.output.trim() !== testcase.output){
                    setCoderesults("Wrong Answer");
                    return;
                }
            }
            setCoderesults("Accepted");
        } catch (error) {
            console.log(error);
            setOutput("An error occurred while running the code");
        }
    }

    const runCode = async () => {
        try {
            console.log(input);
            const response = await runCodeCpp(language, code,input);
            console.log(problemId);
            const testcase = await getTestcasesFromServer(problemId);
            console.log(testcase.testcases);
            console.log(response);
            setOutput(response.output);
        } catch (error) {
            console.log(error);
            setOutput("An error occurred while running the code");
        }
    }

    const currentProblem = (
        <>
        <div className="d-md-flex min-vh-100 min-vw-100 flex-row">
            <div id="infoBox" className=" mh-100 border border-dark p-2">
                <div>
                    <button className="button btn-outline-dark" onClick={()=>{setGoBack(true)}}>
                        Previous
                    </button>
                </div>
                <div className="d-flex justify-content-around flex-column">
                    <div className="text-center"><b>{title}</b></div>
                    <div><b>Level:</b> {level} </div>
                    <div><b>Category:</b> {category.join(", ")} </div>
                </div>
                <div><b>Description:</b><br></br> {description} </div>
            </div>
            <div className="border border-dark d-flex flex-column flex-grow-1 p-1">
                <div className="text-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            {language}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{setLanguage("C++")}}>C++</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setLanguage("C")}}>C</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{setLanguage("Python")}}>Python</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <textarea id="CodeArea" onChange={(e)=>{setCode(e.target.value)}} className="h-100 w-100 flex-grow-1 bg-white text-black" placeholder="Enter your code here"></textarea>
                </div>
                <div className="d-flex m-2  justify-content-around">
                    <div className="m-1 d-flex flex-column w-50">
                        <label className="text-center fw-bold">Input</label>
                        <textarea id="InputArea" className="h-100 bg-white border border-black text-black" onChange={(e)=>{setInput(e.target.value)}} placeholder="Input"></textarea>
                    </div>
                    <div className=" m-1 w-50 d-flex flex-column">
                        <label className="text-center fw-bold">Output</label>
                        <div className="text-center border border-black h-100"> {output} </div>
                    </div>
                </div>
                <div className="text-center d-flex justify-content-evenly">
                    <button className="btn btn-dark" onClick={runCode}>Run</button>
                    <button className="btn btn-dark" onClick={submitCode}>Submit</button>
                </div>
                <div className="d-flex flex-column">
                    <label className="text-center fw-bold">Result:</label>
                    <div className="border border-light text-center">{coderesults}</div>
                </div>
            </div>
        </div>
        </>
    )


    return (
        <>
        {!goBack && currentProblem }
        {goBack && <HomePage />}
        </>
    )
}

export default ProblemPage;
