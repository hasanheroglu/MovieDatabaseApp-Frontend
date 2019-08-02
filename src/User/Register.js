import React from 'react'

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import Welcome from '../Welcome';

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: '', email: '', name: '', surname: '', password: '', matchingPassword: '', login: false}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRegisterClick = this.handleRegisterClick.bind(this)
    }

    handleRegisterClick(){
        if(!this.state.username){
            alert("Username should not be empty!")
            return;
        }

        if(!this.state.email){
            alert("Email should not be empty!")
            return;
        }

        if(!this.state.password){
            alert("Password should not be empty!")
            return;
        }
        
        if(!this.state.matchingPassword){
            alert("Password confirmation should not be empty!")
            return;
        }

        if(this.state.password !== this.state.matchingPassword){
            alert("Passwords must match!")
            return;
        }

        fetch('http://localhost:8080/users/register', {
            method:'POST',
            headers:{ 
                'Authorization': localStorage.getItem("Authorization"),
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  true,
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            withCredentials: true,
            credentials: 'same-origin',
            body: JSON.stringify({
             username: this.state.username,
             email: this.state.email,
             name: this.state.name,
             surname: this.state.surname,
             password: this.state.password,
             matchingPassword: this.state.matchingPassword
            })
        })
        .then(response => response.json())
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                let loginCredentials = {username: this.state.username, password: this.state.password}

                fetch('http://localhost:8080/login', 
                {
                    method:'POST',
                    headers:{ 
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Credentials':  'true',
                        'Access-Control-Allow-Origin':'http://localhost:3000/'
                    },
                    withCredentials: true,
                    credentials: 'same-origin',
                    body: JSON.stringify(loginCredentials)
                })
                .then(response => response.json())
                .then(data =>{
                    this.setState({status: 'SUCCESS'})
                    console.log(data);
                    localStorage.setItem("Authorization", data.token);
                    localStorage.setItem("Role", data.role);
                    localStorage.setItem("Username", data.username);
                    this.setState({login: true})
                })
                .catch(error =>{
                    this.setState({status: 'FAILED'});
                    console.log(error);
                });
            }
            alert(operation.statusMessage)
        })
        .catch(error =>{
            this.setState({status: 'FAILED'});
            console.log(error);
        });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        if(this.state.login) {return <Redirect to={"/welcome"} component={Welcome} />}
        return(
            <Form>
                <Form.Group>
                    <Form.Label name="username">Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label name="email">Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label name="name">Name</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label name="surname">Surname</Form.Label>
                    <Form.Control type="text" name="surname" value={this.state.surname} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label name="password">Password</Form.Label>
                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label name="matchingPassword">Password Confirmation</Form.Label>
                    <Form.Control type="password" name="matchingPassword" value={this.state.matchingPassword} onChange={this.handleInputChange} ></Form.Control>
                </Form.Group>
                <Button onClick={() => {this.handleRegisterClick()}}>Register</Button>
            </Form>
        )
    }
}

export default Register;

