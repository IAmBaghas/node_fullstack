import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import PostIndex from './pages/posts/Index';
import PostCreate from './pages/posts/Create';
import PostEdit from './pages/posts/Edit';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const getUsername = () => {
  return localStorage.getItem('username');
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function App() {
  const [auth, setAuth] = useState(isAuthenticated());
  const [username, setUsername] = useState(getUsername());
  const history = useHistory();

  useEffect(() => {
    setAuth(isAuthenticated());
    setUsername(getUsername());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth(false);
    setUsername(null);
    history.push('/login');
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Input Data</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">HOME</Nav.Link>
              <Nav.Link as={Link} to="/posts" className="nav-link">POSTS</Nav.Link>
            </Nav>
            <Nav>
              {auth ? (
                <NavDropdown title={username} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/posts" component={PostIndex} />
        <PrivateRoute exact path="/posts/create" component={PostCreate} />
        <PrivateRoute exact path="/posts/edit/:id" component={PostEdit} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login}>
          <Login setAuth={setAuth} setUsername={setUsername} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
