import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Register.css"
import { registerUser } from "../service/api";
import {  useState } from "react";

// eslint-disable-next-line react/prop-types
function Register({isLoginOrRegister}){
    const [firstname,setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const newUser = async () => {
        try {
            console.log(firstname,lastname,email,password);
            const response = await registerUser(firstname,lastname,email, password);
            console.log(response.message);
            if(response.success) {
                isLoginOrRegister(true);
                console.log('User registered successfully');
            }
            return response;
        } catch (error) {
            console.log('Error while trying to login');
        }
    }

    return(
        <div className="d-flex flex-column bg-white Register-background">
            <div>
                <div className="text-center text-black fs-3">Register</div>
                <div className="rounded bg-black Register-box d-md-flex flex-column p-2">
                <Form>
                    <Form.Group className="mb-2" controlId="formfirstname">
                        <Form.Label className="text-white">FirstName</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstname(e.target.value)}}  />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formlastname">
                        <Form.Label className="text-white">lastname</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastname(e.target.value)}}  />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formEmail">
                        <Form.Label className="text-white">Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}  />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formPassword">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}  />
                    </Form.Group>
                    <Button className="w-100" onClick={(newUser)}>
                        Register
                    </Button>
                </Form>
                <a className="text-center text-white link-primary" onClick={()=>isLoginOrRegister(true)}>Go Back</a>
                </div>
            </div>
        </div>
    )
}

export { Register }