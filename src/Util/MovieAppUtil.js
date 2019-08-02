import React from 'react';
import {ListGroup} from 'react-bootstrap';

export class Director extends React.Component{
    constructor(props){
        super(props)
    }

    Director(props){
        return(
                <ListGroup.Item>{props.director.name} {props.director.surname} </ListGroup.Item>
        )
    }
    
    render(){
        return <this.Director director={this.props.director} />
    }
}

export class Genre extends React.Component{
    constructor(props){
        super(props)
    }
    
    Genre(props){
        return(
                <ListGroup.Item>{props.genre.name} </ListGroup.Item>
        )
    }

    render(){
        return <this.Genre genre={this.props.genre} />
    }
}

export class Movie extends React.Component{
    constructor(props){
        super(props)
    }
    
    Movie(props){
        return(
            <ListGroup>
                <ListGroup.Item><b>{props.movie.name}</b></ListGroup.Item>
                <ListGroup.Item>ReleaseDate: {props.movie.releaseDate}</ListGroup.Item>
                <ListGroup.Item>Duration: {props.movie.duration} min </ListGroup.Item>
                <ListGroup.Item>IMDB ID: {props.movie.imdbId} </ListGroup.Item>
                <ListGroup.Item>IMDB Rating: {props.movie.imdbRating}/10 </ListGroup.Item>
            </ListGroup>
        )
    }

    render(){
        return <this.Movie movie={this.props.movie} />
    }
}
    

    
