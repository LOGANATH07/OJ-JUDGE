import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Login.css"
import { loginUser } from "../service/api";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const print = async () => {
        try {
            console.log(email,password);
            const response = await loginUser(email, password);
            console.log(response.message);
            return response;
        } catch (error) {
            console.log('Error while trying to login');
        }
    }

    return(
        <div className="d-flex flex-column bg-dark Login-background">
            <div className="text-center text-white fs-3">Login Page</div>
            <div className="bg-white Login-box d-md-flex flex-column p-2">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{
                        setEmail(event.target.value);
                        console.log(email);
                    }} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                        setPassword(event.target.value);
                        console.log(password);
                    }} />
                </Form.Group>
                <Button variant="primary" onClick={(print)}>
                    Login
                </Button>
            </Form>
            <a className="text-center text-dark" onClick={()=>{}}>Or Register</a>
            </div>
        </div>
    )
}

export { Login }