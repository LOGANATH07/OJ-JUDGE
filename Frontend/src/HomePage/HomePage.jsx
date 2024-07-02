import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"
import { useEffect, useState } from "react";
import { getAllProblemsFromServer, getProblemFromServer } from "../service/api";
import { Table } from "react-bootstrap";
import ProblemPage from "../ProblemPage/ProblemPage";
function HomePage(){
    const [problem,setProblem] = useState(null);
    const [problems, setProblems] = useState([]);
    const [HomeorProblem, setHomeOrProblem] = useState(false);

    useEffect(()=>{
        if(problems.length==0){
            getallProblems()
        }
    })

    const getProblem = async (problemId) => {
        try{
            const response = await getProblemFromServer(problemId);
            if(response){
                // console.log(response);
                setProblem(response);
            }
        } catch (error) {
            console.log(error.message);
            setProblem(null);
        }
    }

    const getallProblems = async () => {
        try{
            const response = await getAllProblemsFromServer();
            setProblems(response);
            // console.log(response);
        } catch (error) {
            console.log(error.message);
            setProblem(null);
        }
    }

    const Problems = problems.map((problem,index) => (
        <tr key={index+1}>
            <td className="text-center"> {index+1} </td>
            <td className="text-center"> {problem.title} </td>
            <td className="text-center"> {problem.level} </td>
            <td className="text-center"> {problem.category.join(", ")} </td>
            <td className="text-center"> 
                <button className="btn btn-dark" onClick={()=>{ setHomeOrProblem(true);setProblem(problem)}}>Click Me</button>
            </td>
        </tr>
    ))

    const HomePage = (
        <div className="text-white" id="Mainpage">
            <button className="btn btn-outline-light" onClick={()=>{getProblem(1);getallProblems()}}>First Problem</button>
            {problem && <div>{problem.title}</div>}
            <Table hover>
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Level</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Solve</th>
                    </tr>
                </thead>
                <tbody>
                {Problems}
                </tbody>
            </Table>
        </div>
    )

    return (
        <>
        {!HomeorProblem && HomePage}
        {HomeorProblem && <ProblemPage Problem={problem} setHomeOrProblem={HomeorProblem} />}
        </>
    )
}

export { HomePage }