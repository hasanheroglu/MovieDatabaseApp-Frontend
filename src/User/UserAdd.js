import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';

class UserAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {id: 0, username: '', email: '', name: '', surname: '', password: '', matchingPassword: '', 
                        roles: [], allRoles: []}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUserAddClick = this.handleUserAddClick.bind(this)
    }

    componentDidMount(){

    }

    handleAddClick(){
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

        fetch('http://localhost:8080/users', {
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
             matchingPassword: this.state.matchingPassword,
             roles: this.state.roles
            })
        })
        .then(response => response.json())
        .then(operation =>{
            console.log(operation);
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
        return(
            <Form>
                <br/>
                <Row>
                    <Col>
                        <Form>
                            <Form.Control type="text" placeholder="Search" name="search" value={this.state.search} onChange={this.handleInputChange}/>
                        </Form>
                    </Col>
                    <Col>
                        <Button  onClick={() => this.handleUserAddClick()} >Add User</Button>                    
                    </Col>
                </Row>
                <br/>
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
                <Button onClick={() => {this.handleAddClick()}}>Register</Button>
            </Form>
        )
    }  
}


export default UserAdd;