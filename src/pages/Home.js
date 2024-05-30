import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function Home() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>Selamat Datang!</h1>
                        <p class="lead">Webapp FullStack Express.js dan React.js</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;