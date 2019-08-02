import React from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';
import ListAdd from '../List/ListAdd';
import ChangePassword from './ChangePassword';
import RoleMenu from './RoleMenu';

class UserSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {user: [], status: 'LOADING', list: false, password: false, roleMenu: false}
    }

    componentDidMount(){
        const username = this.props.match.params.username;
        if(!username){
            this.setState({user: [], status: 'FAILED'})
            this.handleListClick = this.handleListClick.bind(this)
        }
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
                    this.setState({user: data.operationObject, status: 'SUCCESS'});
                } else{
                    this.setState({user: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({user: [], status: 'FAILED'});
                console.log(error);
            });

    }

    handleListClick(){
        this.setState({list: true})
    }

    handleChangePassword(){
        this.setState({password: true})
    }

    handleRoleMenu(){
        this.setState({roleMenu: true})
    }

    render(){
        if(this.state.roleMenu) {return <Redirect to={"/users/" + localStorage.getItem("Username") + "/roles"} component={RoleMenu} />}
        if(this.state.password) {return <Redirect to={"/users/" + localStorage.getItem("Username") + "/change_password"} component={ChangePassword} />}
        if(this.state.list) {return <Redirect to={"/users/" + localStorage.getItem("Username") + "/lists"} component={ListAdd} />}
        if(!localStorage.getItem("Role")){ return <Redirect to={"/login"} component={Login} />}
        var hidden = false;
        if(localStorage.getItem("Role") !== "ROLE_ADMIN" ){
            hidden = true;
        }

        return(
            <Card>
                <Card.Body>
                            <ListGroup.Item>Username: {this.state.user.username}</ListGroup.Item> 
                            <ListGroup.Item>Email: {this.state.user.email}</ListGroup.Item>
                            <ListGroup.Item>Name: {this.state.user.name} {this.state.user.surname}</ListGroup.Item>
                            <br/>
                            <Row>
                                <Col>
                                    <Button onClick={() => this.handleListClick()}  block>Lists</Button>
                                </Col>
                                <Col>
                                    <Button href={"/users/update/" + this.state.user.username} hidden={hidden} block>Update</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.handleChangePassword()} block>Change Password</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.handleRoleMenu()} hidden={hidden} block>Role Menu</Button>
                                </Col>
                                
                            </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default UserSearch;