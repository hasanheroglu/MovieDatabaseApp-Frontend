import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from '../User/Login';
import {Redirect} from 'react-router-dom';
import MainPage from '../MainPage';
 
class DirectorUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {id: 0, name: '', surname: '', birthDate: '', birthPlace: ''}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDirectorUpdateClick = this.handleDirectorUpdateClick.bind(this)
    }

    componentDidMount(){
        const directorId = this.props.match.params.id;
        console.log(directorId)
        fetch('http://localhost:8080/directors/' + directorId, {
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
                    this.setState({ 
                                    id: data.operationObject.id,
                                    name: data.operationObject.name, 
                                    surname: data.operationObject.surname,
                                    birthDate: data.operationObject.birthDate, 
                                    birthPlace: data.operationObject.birthPlace});
                }
                console.log(data);
            })
            .catch(error =>{
                console.log(error);
            });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleDirectorUpdateClick(){
        if(!this.state.name){
            alert("Name should not be empty!");
            return;
        }

        if(!this.state.surname){
            alert("Surname should not be empty!");
            return;
        }
        
        const directorId = this.props.match.params.id;
        fetch('http://localhost:8080/directors/' + directorId, {
            method:'PUT',
            headers:{ 
                'Authorization': localStorage.getItem("Authorization"),
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  true,
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            body: JSON.stringify({ 
                name: this.state.name,
                surname: this.state.surname,
                birthDate: this.state.birthDate,
                birthPlace: this.state.birthPlace}),
            withCredentials: true,
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data =>{
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
                    <Button onClick={() => this.handleDirectorUpdateClick()} >Update</Button>
                </Form.Group>
            </Form>
        )
    }
}

export default DirectorUpdate;