import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Link } from 'react-router-dom';

import AddReview from './components/add-review';
import ProductsList from './components/products-list';
import Product from './components/product';
import Login from './components/login';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [user, setUser] = React.useState(null);

  async function login (user = null) {
    setUser(user);
  }

  async function logout () {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Product</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/products">Products</Link>
              </Nav.Link>
              <Nav.Link>
                { user ? (
                  <a onClick={logout}>Logout User</a>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path = {["/", "/products"]} component = {ProductsList}></Route>
        <Route path = "/products/:id/review" render = {(props) => <AddReview {...props} user={user} />}></Route>
        <Route path = "/products/:id" render = {(props) => <Product {...props} user={user} />}></Route>
        <Route path = "/login" render = {(props) => <Login {...props} login={login} />}></Route>
      </Switch>
    </div>
  );
}

export default App;
