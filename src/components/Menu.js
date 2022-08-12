import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Menu.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Menu extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(event) {
      localStorage.clear();
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
                <a href="/"
                       onClick={this.handleLogOut}
                       className="log-out">
                        {<FontAwesomeIcon icon={faSignOutAlt} size="2x"/>}
                    </a>
              </Container>
            </Navbar>
          );
    }
}

export default Menu;