import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Form, Nav, FormControl, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Login from './User/Login';

class MainPage extends React.Component{
    render(){
        var userNav;
        var logout = true;
        if(localStorage.getItem("Role")){
            logout=false;
        }
        if(localStorage.getItem("Role") === "ROLE_ADMIN"){ 
            userNav = <Nav.Link href="/users">Users</Nav.Link>
        }


        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/welcome">Movie Database Application</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/movies" hidden={logout}>Movies</Nav.Link>
                <Nav.Link href="/directors" hidden={logout}>Directors</Nav.Link>
                {userNav}
                <Nav.Link href={"/users/" + localStorage.getItem("Username")}>{localStorage.getItem("Username")}</Nav.Link>
                <Nav.Link href="/logout" hidden={logout}>Logout</Nav.Link>
                <Nav.Link href="/login" hidden={!logout}>Login</Nav.Link>
                </Nav>
            </Navbar>
            
        )
    }
}

export default MainPage;