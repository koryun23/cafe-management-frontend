import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Menu.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Menu extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
              <Container fluid>
                <Navbar.Brand href="/home">Cafe Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                  <Nav>
                    {
                        this.props.items.map((item, index) => (
                            <NavDropdown id="nav-dropdown-dark-example"
                                         title={item.text}
                                         menuVariant="dark"
                                         key={item.text}>
                                {
                                    this.props.dropdownItems[index].map((dropdownItem) => (
                                        <NavDropdown.Item key={dropdownItem.text} 
                                                          href={dropdownItem.path}>
                                                              {dropdownItem.text}
                                                            
                                        </NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        ))
                    }
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          );
    }
}

export default Menu;