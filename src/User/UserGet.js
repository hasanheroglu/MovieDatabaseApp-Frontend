import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import {ListGroup} from 'react-bootstrap';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import MainPage from '../MainPage';


class UserGet extends React.Component{
    constructor(props){
        super(props)
        this.state = {users: [], status: 'LOADING',
                        redirect: false, redirectId: 0, 
                        update: false, updateId: 0,
                        remove: false, removeId: 0}
        
    }

    componentDidMount(){        
        fetch('http://localhost:8080/users', {
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
                    this.setState({users: data.operationObject, status: 'SUCCESS'});
                } else{
                    this.setState({users: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({users:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleUserRemoveClick(userId){
        fetch('http://localhost:8080/users/' + userId, {
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
                if(data.wasSuccessful){
                    console.log("Component updated!")
                    this.setState({users: data.operationObject, status: 'SUCCESS', remove: false});
                } else{
                    this.setState({users: [], status: 'FAILED', remove: false});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({users:[], status: 'FAILED'});
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
        return this.state.users.map(user => 
            <div>
                    <Card key={user.id}>
                        <Card.Header>USER#{user.id}</Card.Header>
                        <Card.Body>
                            <ListGroup.Item>Username: {user.username}</ListGroup.Item> <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Name: {user.name} {user.surname}</ListGroup.Item>
                            <br/>
                            <Row>
                                <Col>
                                    <Button href={"/users/" + user.username + "/lists"} block>Lists</Button>
                                </Col>
                                <Col>
                                    <Button href={"users/update/" + user.username} block >Update</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.handleUserRemoveClick(user.username)} block>Remove</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                        
                    </Card>
                        <br/><br/>
            </div>
            )
        
    }
}

export default UserGet;