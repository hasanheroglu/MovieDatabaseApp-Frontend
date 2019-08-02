import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Redirect} from 'react-router-dom';
import Login from '../User/Login';
import MainPage from '../MainPage';


class DirectorAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: '', surname: '', birthDate: '', birthPlace: ''}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDirectorAddClick = this.handleDirectorAddClick.bind(this)
    }

    componentDidMount(){
        
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleDirectorAddClick(){
        if(!this.state.name){
            alert("Name should not be empty!");
            return;
        }

        if(!this.state.surname){
            alert("Surname should not be empty!");
            return;
        }

        fetch('http://localhost:8080/directors/', {
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
                name: this.state.name,
                surname: this.state.surname,
                birthDate: this.state.birthDate, 
                birthPlace: this.state.birthPlace
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
                    <Form.Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </Col>
                        <Col>
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                        </Col>
                    </Form.Row>
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleInputChange} />
                    <Form.Label>Birth Place</Form.Label>
                    <Form.Control type="text" name="birthPlace" value={this.state.birthPlace} onChange={this.handleInputChange} />
                    <Button onClick={() => this.handleDirectorAddClick()} >Add Director</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default DirectorAdd;