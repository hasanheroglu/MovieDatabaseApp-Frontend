import React from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from '../User/Login';
import MainPage from '../MainPage';

class ChangePassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: '', oldPassword: '', password: '', matchingPassword: ''}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    componentDidMount(){
        const username = this.props.match.params.username;
        this.setState({username: username})
    }

    handleInputChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangePassword(){
        const username = this.props.match.params.username;
        console.log(this.state.password);
        fetch('http://localhost:8080/users/' + username + "/change_password", 
        {
            method:'PUT',
            headers:{ 
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  'true',
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            withCredentials: true,
            credentials: 'same-origin',
            body: JSON.stringify({
                username: this.state.username,
                oldPassword: this.state.oldPassword,
                password: this.state.password,
                matchingPassword: this.state.matchingPassword
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
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
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl type="text" name="username" value={this.state.username} readOnly onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl type="password" name="oldPassword" value={this.state.oldPassword} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>New Password</FormLabel>
                    <FormControl type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>New Password Confirmation</FormLabel>
                    <FormControl type="password" name="matchingPassword" value={this.state.matchingPassword} onChange={this.handleInputChange} />
                </FormGroup>
                <Button onClick={() => this.handleChangePassword()} block>Change Password</Button>
            </Form>
        )
    }

    
}

export default ChangePassword;