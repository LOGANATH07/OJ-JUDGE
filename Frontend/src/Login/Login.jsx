import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Login.css"
import { loginUser } from "../service/api";
import { useState } from "react";
import { HomePage } from "../HomePage/HomePage";
import { PostProblem } from "../PostProblem/PostProblem";

// eslint-disable-next-line react/prop-types
function Login({isLoginOrRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const print = async () => {
        try {
            console.log(email,password);
            const response = await loginUser(email, password);
            console.log(response.user.email);
            if(response.success) {
                setIsUserLoggedIn(true);
                console.log('User logged in successfully');
                if(response.user.email=='loganvegeta7@gmail.com') {
                    console.log("Welcome Admin")
                    setIsAdmin(true);
                }
            }
            return response;
        } catch (error) {
            console.log('Error while trying to login',error);
        }
    }
    
    const loginPage = (
        <div className="d-flex flex-column bg-black Login-background">
                <div className="text-center text-white fs-3">Login Page</div>
                <div className="rounded bg-white Login-box d-md-flex flex-column p-2">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{
                            setEmail(event.target.value);
                            console.log(email);
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                            setPassword(event.target.value);
                            console.log(password);
                        }} />
                    </Form.Group>
                    <Button variant="primary" className="w-100" onClick={(print)}>
                        Login
                    </Button>
                </Form>
                <span>Or Register? </span>
                <a className="text-center text-dark link-primary" onClick={()=>{isLoginOrRegister(false)}}>Click Here</a>
                </div>
            </div>
    )
//invert the negations dont forget
// { !isUserLoggedIn && loginPage}
// {isUserLoggedIn && <HomePage />}
    return (
        <> 
            { !isUserLoggedIn && loginPage}
            {isUserLoggedIn && isAdmin && <PostProblem />}
            {isUserLoggedIn && !isAdmin && <HomePage />}
        </>
        )
}

export { Login }