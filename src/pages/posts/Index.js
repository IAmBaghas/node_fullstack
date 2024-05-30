import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from '../../axiosInstance';

function CreatePost() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        fetchData();
        const username = localStorage.getItem('username');
        setCurrentUser(username);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                window.location.href = '/login';
            }
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`/posts/delete/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="12">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/posts/create" variant="success" className="mb-3">TAMBAH POST</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                    <tr>
                                        <th>NO.</th>
                                        <th>TITLE</th>
                                        <th>CONTENT</th>
                                        <th>EXTRA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) => (
                                        <tr key={post.id}>
                                            <td>{index + 1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.content}</td>
                                            <td className="text-center">
                                                {currentUser === post.poster ? (
                                                    <>
                                                        <Button as={Link} to={`/posts/edit/${post.id}`} variant="primary" size="sm" className="me-2">EDIT</Button>
                                                        <Button onClick={() => deletePost(post.id)} variant="danger" size="sm">DELETE</Button>
                                                    </>
                                                ) : (
                                                    <span>{post.poster}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;
