import React from 'react';
import {Redirect} from 'react-router-dom';
import MainPage from '../MainPage';
import { Form,FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import Register from './Register';
import Welcome from '../Welcome';
import ListAdd from '../List/ListAdd';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: '', password: '', status: 'WAITING', register: false}
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleRegisterClick = this.handleRegisterClick.bind(this)
    }

    handleLoginClick(){
        if(!this.state.username){
            alert("Username should not be empty!")
            return;
        }

        if(!this.state.password){
            alert("Password should not be empty!")
        }

        let loginCredentials = {username: this.state.username, password: this.state.password}

        fetch('http://localhost:8080/login', 
        {
            method:'POST',
            headers:{ 
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Credentials':  'true',
                'Access-Control-Allow-Origin':'http://localhost:3000/'
            },
            withCredentials: true,
            credentials: 'same-origin',
            body: JSON.stringify(loginCredentials)
        })
        .then(response => response.json())
        .then(data =>{            
            localStorage.setItem("Username", data.username);
            localStorage.setItem("Authorization", data.token);
            localStorage.setItem("Role", data.role);
            this.setState({status: 'SUCCESS'})
            console.log(data);
            
        })
        .catch(error =>{
            this.setState({status: 'FAILED'});
            console.log(error);
        });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleRegisterClick(){
        this.setState({register: true})
    }

    render(){
        if(this.state.register) {return <Redirect to={"/register"} component={Register} /> }
        if(this.state.status === "SUCCESS") { return <Redirect to={"/welcome"} component={Welcome} />}

        return(

            <div style={{width:"30%", textAlign: "center", alignContent: "center"}}>
            <Form >
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    <div inline>
                        <Button onClick={() => this.handleLoginClick()}>Login</Button>
                        <Button onClick={() => this.handleRegisterClick()}>Register</Button>
                    </div>
                </FormGroup>
                
            </Form>
            </div>
        )
        
    }
}

export default Login;