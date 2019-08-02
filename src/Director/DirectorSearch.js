import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row, ListGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Redirect} from 'react-router-dom';
import Login from '../User/Login';

class DirectorSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {director: [], status: 'LOADING'}
    }

    componentDidMount(){
        const directorId = this.props.match.params.id;
        fetch('http://localhost:8080/director/' + directorId, {
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
                    this.setState({director: data.operationObject, status: 'SUCCESS'});
                } else{
                    alert(data.operationObject.statusMessage)
                }
                console.log(data);
            })
            .catch(error =>{
                console.log(error);
            });
    }

    render(){
        if(!localStorage.getItem("Role")){ return <Redirect to={"/login"} component={Login} />}

        return(
                    <Card key={this.state.director.id}>
                        <Card.Header>Director#{this.state.director.id}</Card.Header>
                        <Card.Body>
                            <ListGroup.Item>Name: {this.state.director.name} {this.state.director.surname} </ListGroup.Item>
                            <ListGroup.Item>Birthdate: {this.state.director.birthDate} </ListGroup.Item>
                            <ListGroup.Item>Birth place: {this.state.director.birthPlace}</ListGroup.Item>
                        </Card.Body>
                    </Card>
        )
    }
}

export default DirectorSearch;