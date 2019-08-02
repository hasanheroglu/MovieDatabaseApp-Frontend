import React from 'react';

import './listadd.css';

import { Movie, Director, Genre } from '../Util/MovieAppUtil';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row, ListGroup, ListGroupItem as p, Container} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import MainPage from '../MainPage';
import PerfectScrollbar from 'react-perfect-scrollbar'


class ListAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {movies: [], lists: [], type: '', movieId: 0}
        this.handleListAddClick = this.handleListAddClick.bind(this)
        this.handleCreateListClick = this.handleCreateListClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleListRemoveClick = this.handleListRemoveClick.bind(this)
        this.handleListTypeRemoveClick = this.handleListTypeRemoveClick.bind(this)
    }

    componentDidMount(){
        const username = this.props.match.params.username;
        console.log(username)
        fetch('http://localhost:8080/users/' + username +'/lists', {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({lists: operation.operationObject})
            } else{
                alert(operation.statusMessage)
            }
        })
        .catch(error =>{
            console.log(error);
        });

        fetch('http://localhost:8080/movies?name=', {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({movies: operation.operationObject})
            } else{
                alert(operation.statusMessage)
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleCreateListClick(){
        if(!this.state.type){
            alert("List type should not be empty!");
            return;
        }

        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/lists?type=' + this.state.type, {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({lists: operation.operationObject})
            }
            alert(operation.statusMessage)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    handleListAddClick(type){
        if(this.state.movieId <= 0){
            alert("Please pick a valid movie!")
            return;
        }
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/lists/' + type + '?movieId=' + this.state.movieId, {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({lists: operation.operationObject})
            }
            alert(operation.statusMessage)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    handleListRemoveClick(type, movieId){
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/lists/' + type + '?movieId=' + movieId, {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({lists: operation.operationObject})
            }
            alert(operation.statusMessage)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    handleListTypeRemoveClick(type){
        const username = this.props.match.params.username;
        fetch('http://localhost:8080/users/' + username + '/lists?type=' + type, {
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({lists: operation.operationObject})
            }
            alert(operation.statusMessage)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    render(){
        if(localStorage.getItem("Role") !== "ROLE_ADMIN" && localStorage.getItem("Username") !== this.props.match.params.username) { return <Redirect to={"/index"} component={MainPage} />}

        return(
            <div>
                    <Form>
                        <Form.Group>
                            <Form.Label>List Name</Form.Label>
                            <Form.Control type="text" name="type" onChange={this.handleInputChange} />
                        </Form.Group>
                    </Form>
                    <Button onClick={() => this.handleCreateListClick()}>Add list</Button>
                {this.state.lists.map(list => 
                    <Form.Row>
                        <Card >
                            <Card.Header>{list.type}<Button style={{float: "right"}} onClick={() => this.handleListTypeRemoveClick(list.type)}>X</Button></Card.Header>
                                <Card.Body className="mainCard">
                                        {list.movies.map(movie => 
                                        <Col key={movie.id}>
                                            <Card className="listGroup">
                                                <Card.Header><b>{movie.name}</b></Card.Header>
                                                    <Card.Body>
                                                        <p>Release Date: {movie.releaseDate}</p>
                                                        <p>Duration {movie.duration} mins</p>
                                                        <p><b>Director(s):</b></p>
                                                        {movie.directors.map(director =>
                                                            <p key={director.id}>{director.name} {director.surname}</p>
                                                        )}
                                                        <p><b>Genre(s):</b></p>
                                                        {movie.genres.map(genre =>
                                                            <p key={genre.id}>{genre.name}</p>
                                                        )}
                                                        <Button onClick={() => this.handleListRemoveClick(list.type, movie.id)}>Remove</Button>
                                                    </Card.Body>
                                            </Card> 
                                        </Col>
                                        )}
                                    </Card.Body>
                                <Card.Footer>
                                <Form.Control as="select"  name="movieId" onChange={this.handleInputChange}>
                            
                                    <option>Select Movie</option>
                                    {
                                        this.state.movies.map(movie =>
                                            <option key={movie.id} value={movie.id}  name="movieId" >{movie.name}</option>
                                        )
                                    }
                                
                                </Form.Control>
                                <br/>
                                
                                <Button className="removeB" onClick={() => this.handleListAddClick(list.type)} block>Add Movie</Button>
                                </Card.Footer>
                        </Card>
                    </Form.Row>
                )}
           </div>
        )
    }
}

export default ListAdd;