import { useState } from 'react';
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';
import axios from '../../axiosInstance';
import { useHistory } from "react-router-dom";

function CreatePost() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [validation, setValidation] = useState({});
    const history = useHistory();

    const storePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/api/posts/store', {
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
        })
        
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                        
                            {
                                validation.errors &&
                                    <Alert variant="danger">
                                        <ul class="mt-0 mb-0">
                                            { validation.errors.map((error, index) => (
                                                <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                            )) }
                                        </ul>
                                    </Alert>
                            }
                            
                            <Form onSubmit={ storePost }>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>TITLE</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>CONTENT</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Content" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    SIMPAN
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;