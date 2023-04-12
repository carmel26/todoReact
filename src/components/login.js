import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const Login = props => {

    // const location = useLocation();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    }

    const login = () => { 
        props.login({username: username, password: password}); 
        props.history.push('/');
    }

    return(
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Enter usename" value={username} onChange={onChangeUsername} ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={onChangePassword} ></Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={login} >
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
