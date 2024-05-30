import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Form, Nav } from 'react-bootstrap'
import axios from 'axios';
import { Switch, Route, Link, useHistory } from "react-router-dom";

function Login({ setAuth, setUsername }) {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
            const token = response.data.token;
            const user = response.data.username;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            setAuth(true);
            setUsername(user);
            alert('Logged in successfully');
            history.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <Container className="mt-3">
        <Row>
            <Col md="{12}">
                <Card className="border-0 rounded shadow-sm flex mx-auto" style={{ width: '36rem' }}>
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsernameInput(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Text >
                                <Nav style={{ left: '-2rem' }}>
                                    <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                                </Nav>
                            </Form.Text>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    );
};

export default Login;
