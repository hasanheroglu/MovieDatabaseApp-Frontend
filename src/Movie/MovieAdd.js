import React from 'react';
import {MovieCard, DirectorCard, GenreCard} from './MovieAddForm';
import './movieadd.css';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Login from '../User/Login';
import {Redirect} from 'react-router-dom';
import MainPage from '../MainPage';

class MovieAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {status:'', name: '', duration: 0, imdbRating: 0.0, imdbId: '', releaseDate: '',
                        directors: [], 
                        allDirectors: [], directorId: 0,
                        dId: 0, dName: '', dSurname: '', dBirthDate: '', dBirthPlace: '', 
                        genres: [],
                        gId: 0, gName: ''}
        this.handleMovieAddClick = this.handleMovieAddClick.bind(this)
        this.handleDirectorAddClick = this.handleDirectorAddClick.bind(this)
        this.handleGenreAddClick = this.handleGenreAddClick.bind(this)
        this.handleDirectorUpdateClick = this.handleDirectorUpdateClick.bind(this)
        this.handleDirectorRemoveClick = this.handleDirectorRemoveClick.bind(this)
        this.handleGenreRemoveClick = this.handleGenreRemoveClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.ShowDirectors = this.ShowDirectors.bind(this)
        this.ShowGenres = this.ShowGenres.bind(this)
        this.handleImportFromImdbClick = this.handleImportFromImdbClick.bind(this)
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
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                this.setState({allDirectors: operation.operationObject})
            } else{
                alert(operation.statusMessage)
            }
        })
        .catch(error =>{
            this.setState({status: 'FAILED'});
            console.log(error);
        });
    }

    handleMovieAddClick(){
        if(!this.state.name){
            alert("Name or title should not be empty!");
            return;
        }
        fetch('http://localhost:8080/movies', {
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
             duration: this.state.duration,
             imdbRating: this.state.imdbRating,
             imbdId: this.state.imdbId,
             releaseDate: this.state.releaseDate,
             directors: this.state.directors,
             genres: this.state.genres
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

    handleDirectorAddClick(){
        fetch('http://localhost:8080/directors/' + this.state.directorId, {
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
                this.state.directors.push(operation.operationObject);
                this.setState({status: 'SUCCESS'})
                
            } else{
                alert(operation.statusMessage)
            }
        })
        .catch(error =>{
            this.setState({status: 'FAILED'});
            console.log(error);
        });
    }

    handleGenreAddClick(){
        var genre = {id:'', name:''};
        if(this.state.gName){
            genre.id = this.state.gId;
            genre.name = this.state.gName;
            this.state.genres.push(genre);
            this.setState({gId:this.state.gId + 1});
        }
    }

    handleDirectorRemoveClick(index){
        for(var i=0; i< this.state.directors.length; i++){
            if(index === this.state.directors[i].id){
                this.state.directors.splice(i, 1);
            }
        }
        this.setState({dId:this.state.dId - 1});
    }

    handleGenreRemoveClick(index){
        for(var i=0; i< this.state.genres.length; i++){
            if(index === this.state.genres[i].id){
                this.state.genres.splice(i, 1);
            }
        }
        this.setState({gId:this.state.gId - 1});
    }

    handleInputChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    handleImportFromImdbClick(event){
        if(!this.state.imdbId){
            alert("Imdb Id should not be empty for import operation!")
        }

        fetch('http://localhost:8080/movies/' + this.state.imdbId, {
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
        })
        .then(response => response.json())
        .then(operation =>{
            console.log(operation);
            if(operation.wasSuccessful){
                alert("Movie Imported!")
                this.setState({
                    name: operation.operationObject.name, 
                    duration: operation.operationObject.duration,
                    releaseDate: operation.operationObject.releaseDate,
                    imdbId: this.state.imdbId,
                    imdbRating: operation.operationObject.imdbRating,
                    directors: operation.operationObject.directors,
                    genres: operation.operationObject.genres
                })
            } else{
                alert(operation.statusMessage)
            }
            
        })
        .catch(error =>{
            this.setState({status: 'FAILED'});
            console.log(error);
        });
    }

    handleDirectorUpdateClick(director){
        this.setState({dName: director.name, 
                    dSurname: director.surname, 
                    dBirthDate: director.birthDate, 
                    dBirthPlace: director.birthPlace
        })
        this.handleDirectorRemoveClick(director.id)
    }

    ShowDirectors(){
        return(
            this.state.directors.map(director =>  
                <div>           
                <Button size="sm" key={director.id} onClick={() => {this.handleDirectorRemoveClick(director.id)}}>Name: {director.name} {director.surname}<br/>
                Birth Date: {director.birthDate}<br/>
                Birth Place: {director.birthPlace}<br/></Button>
                </div>
            )
        )
    }

    ShowGenres(){
        return(
            this.state.genres.map(genre =>
                    <Button key={genre.id} size="sm" key={genre.id} onClick={() => {this.handleGenreRemoveClick(genre.id)}} >{genre.name}</Button>
            )
        )
    }


    render(){
        if(localStorage.getItem("Role") !== "ROLE_ADMIN"){ 
            if(localStorage.getItem("Role") == "ROLE_USER"){
                return <Redirect to={"/index"} component={MainPage} />
            } 
    
            return <Redirect to={"/login"} component={Login} />
        }
        return(
            <Card className="card"><Card.Header>UPDATE MOVIE</Card.Header><Card.Body className="cBody">
            <Form.Row><Col><Card className="movieCard">
                <Card.Header>Movie Info</Card.Header>
                <Card.Body className="movieCBody">
                <Form>
                    <Form.Group>
                                <Form.Group>
                                    <Form.Label name="name">Name</Form.Label><br/>
                                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Row>
                                    <Col lg="6">
                                        <Form.Group controlId="durationField">
                                            <Form.Label name="duration">Duration</Form.Label><br/>
                                            <Form.Control type="number" name="duration" value={this.state.duration} onChange={this.handleInputChange} placeholder="100 minutes"/>
                                        </Form.Group >
                                    </Col>
                                    <Col lg="6">
                                    <Form.Group>
                                        <Form.Label name="releaseDate">Release Date</Form.Label><br/>
                                        <Form.Control type="date" name="releaseDate" value={this.state.releaseDate} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col lg="8">
                                    <Form.Group controlId="imdbIdField">
                                        <Form.Label name="imdbId">IMDB ID</Form.Label><br/>
                                        <Form.Control type="text" name="imdbId" value={this.state.imdbId} onChange={this.handleInputChange}/>
                                    </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                    <Form.Group>
                                        <Form.Label name="imdbRating">IMDB Rating</Form.Label><br/>
                                        <Form.Control type="number" step="0.01" min="0" max="10" name="imdbRating" value={this.state.imdbRating} onChange={this.handleInputChange} />
                                    </Form.Group>
                                    </Col>
                                </Form.Row>
                    </Form.Group>    
                    </Form>
                </Card.Body>
            </Card></Col>
            <Col>
            <Card className="directorCard" >
                <Card.Header>Director Info</Card.Header>
                    <Card.Body className="directorCBody">
                        <Form.Group>
                        <Form.Row>
                        <Form.Control as="select"  name="directorId" onChange={this.handleInputChange}>
                            
                                            <option>Select Director</option>
                                            {
                                                this.state.allDirectors.map(director =>
                                                    <option key={director.id} value={director.id}  name="directorId" >{director.name} {director.surname}</option>
                                                )
                                            }
                                        
                        </Form.Control>
                        </Form.Row>
                        <Button variant="primary" onClick={() => {this.handleDirectorAddClick()}} block>Add Director</Button>
                    </Form.Group>
                    <p>Added Directors:</p>
                        <this.ShowDirectors />  
                        </Card.Body></Card>
                        
                        </Col>
                        <Col>
                            <Card className="genreCard"><Card.Header>Genre Info</Card.Header>
                                <Card.Body className="genreCBody">
                                <Form.Group>
                                        <Form.Label name="gName">Name</Form.Label><br/>
                                        <Form.Control type="text" name="gName" value={this.state.gName} onChange={this.handleInputChange} /><br/>
                                        <Button onClick={() => {this.handleGenreAddClick()}} block>Add Genre</Button><br/>
                                    </Form.Group>
                                    <p>Added Genres:</p>
                                        <this.ShowGenres />
                                </Card.Body>
                            </Card>
                        </Col>
                        </Form.Row>
                        <br/>
                        <Button onClick={() => this.handleMovieAddClick()} block>Add</Button>
                        <br/>
                        <Button onClick={()=>this.handleImportFromImdbClick()} block>Import</Button>
            </Card.Body>
            </Card>
        )
    }
}

export default MovieAdd;

