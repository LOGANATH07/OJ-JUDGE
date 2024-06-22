import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Register.css"
import { registerUser } from "../service/api";
import { useState } from "react";

function Register(){
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setLoginOrRegister] = useState(false);

    const newUser = async () => {
        try {
            console.log(firstName,lastName,email,password);
            const response = await registerUser(firstName,lastName,email, password);
            console.log(response.message);
            return response;
        } catch (error) {
            console.log('Error while trying to login');
        }
    }

    return(
        <div className="d-flex flex-column bg-white Login-background">
            <div className="text-center text-dark fs-3">Register</div>
            <div className="bg-dark Login-box d-md-flex flex-column p-2">
            <Form>
                <Form.Group className="mb-2" controlId="formFirstName">
                    <Form.Label className="text-white">FirstName</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstName(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formLastName">
                    <Form.Label className="text-white">LastName</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formEmail">
                    <Form.Label className="text-white">Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPassword">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}  />
                </Form.Group>
                <Button variant="primary" className="text-center" onClick={(newUser)}>
                    Register
                </Button>
            </Form>
            <a className="text-center" onClick={()=>setLoginOrRegister(true)}>Go Back</a>
            </div>
        </div>
    )
}

export { Register }