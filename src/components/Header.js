import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () =>{
  
    
    return(
      
        <>
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png"
              width="150px"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to = "/instamart" className="nav-link">Mart</Link>
           
            {/* <Link to="/profile" className="nav-link">{user.slice(0, -16).toUpperCase()}</Link> */}
              {/* <Button onClick={LogOut} variant="outline-danger" className="ms-lg-3 mt-3 mt-lg-0">LogOut</Button> */}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    );
};

export default Header;