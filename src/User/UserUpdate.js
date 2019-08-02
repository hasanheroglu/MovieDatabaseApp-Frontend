import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import MainPage from '../MainPage';

class UserUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {id: '', username: '', email: '', name: '', surname: '', password: '', matchingPassword: ''}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
    }

    componentDidMount(){
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username, {
            method:'GET',
            headers:{ 
                'Authorization': localStorage.getItem("Authorization"),
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  true,
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            withCredentials: true,
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data =>{
                if(data.wasSuccessful){
                    this.setState({ id: data.operationObject.id,
                                    username: data.operationObject.username,
                                    email: data.operationObject.email,
                                    name: data.operationObject.name,
                                    surname: data.operationObject.surname
                                });
                } else{
                    console.log(data);
                }
            })
            .catch(error =>{
                console.log(error);
            });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleUpdateClick(){
        fetch('http://localhost:8080/users/' + this.state.username, {
            method:'PUT',
            headers:{ 
                'Authorization': localStorage.getItem("Authorization"),
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  true,
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            body: JSON.stringify({ 
                id: this.state.id,
                username: this.state.username,
                email: this.state.email,
                name: this.state.name,
                surname: this.state.surname,
                password: this.state.password,
                matchingPassword: this.state.matchingPassword
            }),
            withCredentials: true,
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data =>{
                if(data.wasSuccessful){
                    localStorage.clear();
                }
                alert(data.statusMessage)
            })
            .catch(error =>{
                console.log(error);
            });    
    }
    render(){
        if(localStorage.getItem("Role") !== "ROLE_ADMIN"){ 
            if(localStorage.getItem("Role") == "ROLE_USER"){
                return <Redirect to={"/index"} component={MainPage} />
            } 
    
            return <Redirect to={"/login"} component={Login} />
        }
        return(
            <Form>
                <Form.Group>
                    <Form.Label name="username">Username</Form.Label>
                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} readOnly></Form.Control>
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
                <Button onClick={() => {this.handleUpdateClick()}}>Update</Button>
            </Form>
        )
    }
}

export default UserUpdate;