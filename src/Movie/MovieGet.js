import React from 'react';
import MovieSearch from './MovieSearch';
import MovieAdd from './MovieAdd';
import MovieUpdate from './MovieUpdate';
import {Movie, Director, Genre} from '../Util/MovieAppUtil.js';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from '../User/Login';
import {ListGroup} from 'react-bootstrap';

let remove = false

class MovieGet extends React.Component{
    constructor(props){
        super(props)
        this.state = {movies: [], status: 'LOADING',
                        redirect: false, redirectId: 0, 
                        update: false, updateId: 0,
                        remove: false, removeId: 0,
                        search: '', searchOnce: true,
                        add: false}
        this.handleMovieClick = this.handleMovieClick.bind(this)
        this.handleMovieUpdateClick = this.handleMovieUpdateClick.bind(this)
        this.handleMovieRemoveClick = this.handleMovieRemoveClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleMovieAddClick = this.handleMovieAddClick.bind(this)
    }

    componentDidMount(){
        fetch('http://localhost:8080/movies', {
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
                    this.setState({movies: data.operationObject, status: 'SUCCESS'});
                } else{
                    this.setState({movies: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({movies:[], status: 'FAILED'});
                console.log(error);
            });
    }

    componentDidUpdate(){
        if(!this.state.searchOnce){ return; }

        this.setState({searchOnce: false})
        fetch('http://localhost:8080/movies?name=' + this.state.search, {
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
                    this.setState({movies: data.operationObject, status: 'SUCCESS'});
                } else{
                    this.setState({movies: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({movies:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleMovieClick(movieId){
        this.setState({redirect: true, redirectId: movieId})
    }

    handleMovieUpdateClick(movieId){
        this.setState({update: true, updateId: movieId})
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value, searchOnce: true})
    }

    handleMovieRemoveClick(movieId){
        this.setState({remove: true, removeId: movieId}, () => {
            console.log(this.state.removeId);
          })
        console.log(this.state.remove)
        fetch('http://localhost:8080/movies/' + movieId, {
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
                    this.setState({movies: data.operationObject, status: 'SUCCESS', remove: false});
                } else{
                    this.setState({movies: [], status: 'FAILED', remove: false});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({movies:[], status: 'FAILED'});
                console.log(error);
            });
    }

    handleMovieAddClick(){
        this.setState({add: true})
    }


    render(){
        if(!localStorage.getItem("Role")){ return <Redirect to={"/login"} component={Login} />}
        var hidden = true;
        if(localStorage.getItem("Role") === "ROLE_ADMIN"){ 
            hidden =  false;
        }
        
        if(this.state.add) return <Redirect to={"/movies/add/"} component={MovieAdd} />
        if(this.state.redirect) return <Redirect to={"/movies/search/" + this.state.redirectId} component={MovieSearch} />
        if(this.state.update) return <Redirect to={"/movies/update/" + this.state.updateId} component={MovieUpdate} />

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
                        <Button  onClick={() => this.handleMovieAddClick()} hidden={hidden}>Add Movie</Button>                    
                    </Col>
                </Row>
                <br/>
            {
            this.state.movies.map(movie => <Card key={movie.id}>
                <Card.Header></Card.Header>
                <Card.Body>
                        <ListGroup> 
                            <Movie movie={movie} />  
                            <ListGroup>
                    
                                <ListGroup.Item><b>Directed by</b></ListGroup.Item>
                                {
                                    movie.directors.map(director => (
                                    <Director director={director} />
                                    ))
                                }
                            </ListGroup>
                                <ListGroup>
                                <ListGroup.Item><b>Genres</b></ListGroup.Item>
                                {
                                    movie.genres.map(genre => (
                                    <Genre genre={genre} />
                                    ))
                                }
                                </ListGroup>
                        </ListGroup>
                        <br/>
                    <Row>
                        <Col>
                            <Button  onClick={() => {this.handleMovieUpdateClick(movie.id)}} hidden={hidden}  block>Update</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {this.handleMovieRemoveClick(movie.id)}} hidden={hidden}  block>Remove</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>)
            }
            </div>
        ) 

    }

}

export default MovieGet;