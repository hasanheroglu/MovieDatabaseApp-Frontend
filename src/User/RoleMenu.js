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

class RoleMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {userRoles: [], roles: [], roleId: 0}
        this.handleRoleAdd = this.handleRoleAdd.bind(this)
        this.handleRoleRemove = this.handleRoleRemove.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount(){
        const username = this.props.match.params.username;
        console.log(username)
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
                    this.setState({userRoles: data.operationObject.roles, status: 'SUCCESS'});
                    alert(data.statusMessage)
                } else{
                    this.setState({userRoles: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({userRoles:[], status: 'FAILED'});
                console.log(error);
            });

            fetch('http://localhost:8080/roles/', {
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
                    this.setState({roles: data.operationObject, status: 'SUCCESS'});
                    alert(data.statusMessage)
                } else{
                    this.setState({roles: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({roles:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleRoleRemove(roleId){
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/roles?roleId=' + roleId, {
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
                    this.setState({userRoles: data.operationObject.roles, status: 'SUCCESS'});
                    alert(data.statusMessage)
                    localStorage.clear();
                } else{
                    this.setState({userRoles: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({userRoles:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleRoleAdd(){
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/roles?roleId=' + this.state.roleId, {
            method:'POST',
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
                    this.setState({userRoles: data.operationObject.roles, status: 'SUCCESS'});
                    alert(data.statusMessage)
                    localStorage.clear();
                } else{
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
                    <FormLabel>Role</FormLabel>
                    <Form.Control as="select" name="roleId"  onChange={this.handleInputChange}>
                    <option>Select Role</option>

                        {
                            this.state.roles.map(role=> <option key={role.id} name="roleId" value={role.id}>{role.name}</option>)
                        }
                    </Form.Control>
                    <Button onClick={() => this.handleRoleAdd()}>Add role</Button>
                </FormGroup>
                Available Roles:
                <FormGroup>
                        {
                            this.state.userRoles.map(role => <Button key={role.id} onClick={() => this.handleRoleRemove(role.id)}>{role.name}</Button>)
                        }   
                </FormGroup>
            </Form>
            
        )
    }
}

export default RoleMenu;