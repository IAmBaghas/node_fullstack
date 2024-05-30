import { useState, useEffect } from 'react';
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [validation, setValidation] = useState({});
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getPostById();
    }, []);

    const getPostById = async() => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.data.data;
        setTitle(data.title);
        setContent(data.content);
    };

    const updatePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        await axios.patch(`http://localhost:3000/api/posts/update/${id}`, {
            title: title,
            content: content
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            history.push('/posts');
        })
        .catch((error) => {
            setValidation(error.response.data);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="12">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            {
                                validation.errors &&
                                    <Alert variant="danger">
                                        <ul className="mt-0 mb-0">
                                            { validation.errors.map((error, index) => (
                                                <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                            )) }
                                        </ul>
                                    </Alert>
                            }
                            <Form onSubmit={ updatePost }>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>TITLE</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>CONTENT</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Content" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditPost;
