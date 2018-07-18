import React, {Component} from "react";
import {Link} from "react-router-dom";

import "./App.css";
import Routes from "./Routes";
import Header from "./Components/Header";

import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const e = React.createElement;

class App extends Component {
    render() {
        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Header></Header>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Scratch</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/signup">
                                <NavItem>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes />
            </div>
        );
    }
}





export default App;






