import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row, ListGroup} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Redirect} from 'react-router-dom';

import DirectorAdd from './DirectorAdd';
import DirectorUpdate from './DirectorUpdate';
import Login from '../User/Login';

class DirectorGet extends React.Component{
    constructor(props){
        super(props)
        this.state = {objects: [], status: 'LOADING', update: false, updateId: 0, search: '', searchOnce: true, add: false}
        this.handleDirectorUpdateClick = this.handleDirectorUpdateClick.bind(this)
        this.handleDirectorRemoveClick = this.handleDirectorRemoveClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDirectorAddClick = this.handleDirectorAddClick.bind(this)
    }

    componentDidMount(){

        fetch('http://localhost:8080/directors?name=', {
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
                    this.setState({objects: data.operationObject, status: 'SUCCESS'});
                } else{
                    alert(data.operationObject.statusMessage)
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({objects:[], status: 'FAILED'});
                console.log(error);
            });
    }

    componentDidUpdate(){
        if(!this.state.searchOnce){ return; }

        this.setState({searchOnce: false})
        fetch('http://localhost:8080/directors?name=' + this.state.search, {
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
                    this.setState({objects: data.operationObject, status: 'SUCCESS'});
                } else{
                    alert(data.operationObject.statusMessage)
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({objects:[], status: 'FAILED', searchOnce: false});
                console.log(error);
            });
    }

    handleDirectorUpdateClick(directorId){
        this.setState({update: true, updateId: directorId})
    }

    handleDirectorRemoveClick(directorId){
        fetch('http://localhost:8080/directors/' + directorId, {
            method:'DELETE',
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
                this.setState({objects: data, status: 'SUCCESS'});
                console.log(data);
            })
            .catch(error =>{
                this.setState({objects:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value, searchOnce: true})
    }

    handleDirectorAddClick(){
        this.setState({add: true})
    }

    render(){
        if(!localStorage.getItem("Role")){ return <Redirect to={"/login"} component={Login} />}
        var hidden = true;
        if(localStorage.getItem("Role") === "ROLE_ADMIN"){ 
            hidden=false;
        }

        if(this.state.add) {return <Redirect to={"/directors/add"} component={DirectorAdd} />}
        if(this.state.update) {return <Redirect to={"/directors/update/" + this.state.updateId} component={DirectorUpdate} />}
        
        return(
            <div>
                <br/>
                <Row>
                    <Col>
                        <Form>
                            <Form.Control type="text" placeholder="Search" name="search" value={this.state.search} onChange={this.handleInputChange}/>
                        </Form>
                    </Col>
                        <Col>
                        <Button  onClick={() => this.handleDirectorAddClick()} hidden={hidden}>Add Director</Button>                        
                        </Col>
                </Row>
                
                <br/>
                <Row>
                {
                    this.state.objects.map(object =>
                        (
                            <Card key={object.id} >
                                <Card.Header>Director#{object.id}</Card.Header>
                                <Card.Body>
                                    <ListGroup.Item>Name: {object.name} {object.surname} </ListGroup.Item>
                                    <ListGroup.Item>Birthdate: {object.birthDate} </ListGroup.Item>
                                    <ListGroup.Item>Birth place: {object.birthPlace}</ListGroup.Item>
                                    <br/>
                                <Row>
                                    <Col>
                                        <Button onClick={()=> this.handleDirectorUpdateClick(object.id)} block hidden={hidden}>Update</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={()=> this.handleDirectorRemoveClick(object.id)} block hidden={hidden}>Remove</Button>
                                    </Col>
                                </Row>
                                </Card.Body>
                                
                            </Card>
                    ))   
                }
                </Row>
            </div>
        )
    }

}

export default DirectorGet;