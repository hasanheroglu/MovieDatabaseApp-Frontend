import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import './movieadd.css';

export class GenreCard extends React.Component{
    render(){
        return( 
                    <Form.Group>
                        <Form.Label name="gName">Name</Form.Label><br/>
                        <Form.Control type="text" name="gName" value={this.props.gName} onChange={this.props.handleInputChange} /><br/>
                        <Button onClick={() => {this.props.handleGenreAddClick()}} block>Add Genre</Button><br/>
                    </Form.Group>
        )
    }
}

export class DirectorCard extends React.Component{
    render(){
        return (
                    <Form.Group>
                        <Form.Row>
                            <Col lg="6">
                                <Form.Label name="dName">Name</Form.Label><br/>
                                <Form.Control type="text" name="dName" value={this.props.dName} onChange={this.props.handleInputChange} /><br/>
                            </Col>
                            <Col lg="6">
                                <Form.Label name="dSurname">Surname</Form.Label><br/>
                                <Form.Control type="text" name="dSurname" value={this.props.dSurname} onChange={this.props.handleInputChange} /><br/>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label name="dBirthDate">Birth Date</Form.Label><br/>
                                <Form.Control type="date" name="dBirthDate" value={this.props.dBirthDate} onChange={this.props.handleInputChange} /><br/>
                            </Col>
                            <Col>
                                <Form.Label name="dBirthPlace">Birth Place</Form.Label><br/>
                                <Form.Control type="text" name="dBirthPlace" value={this.props.dBirthPlace} onChange={this.props.handleInputChange} /><br/>
                            </Col>
                        </Form.Row>
                        <Button variant="primary" onClick={() => {this.props.handleDirectorAddClick()}} block>Add Director</Button>
                    </Form.Group>
         )
    }
}

export class MovieCard extends React.Component{
    NameField(props){
        return(
            <Form.Group>
                <Form.Label name="name">Name</Form.Label><br/>
                <Form.Control type="text" name="name" value={props.name} onChange={props.handleInputChange} />
            </Form.Group>
        )
    }

    ReleaseDateField(props){
        return(
            <Form.Group>
                <Form.Label name="releaseDate">Release Date</Form.Label><br/>
                <Form.Control type="date" name="releaseDate" value={props.releaseDate} onChange={props.handleInputChange} />
            </Form.Group>
        )
    }

    DurationField(props){
        return(
            <Form.Group controlId="durationField">
                <Form.Label name="duration">Duration</Form.Label><br/>
                <Form.Control type="number" name="duration" value={props.duration} onChange={props.handleInputChange} placeholder="100 minutes"/>
            </Form.Group >
        )
    }

    ImdbIdField(props){
        return(
            <Form.Group controlId="imdbIdField">
                <Form.Label name="imdbId">IMDB ID</Form.Label><br/>
                <Form.Control type="text" name="imdbId" value={props.imdbId} onChange={props.handleInputChange}/>
            </Form.Group>
        )
    }

    ImdbRatingField(props){
        return(
            <Form.Group>
                <Form.Label name="imdbRating">IMDB Rating</Form.Label><br/>
                <Form.Control type="number" step="0.01" min="0" max="10" name="imdbRating" value={props.imdbRating} onChange={props.handleInputChange} />
            </Form.Group>
        )
    }

    render(){
        return(
            <Form.Group>
                        <this.NameField name={this.props.name} handleInputChange={this.props.handleInputChange} />
                        <Form.Row>
                            <Col lg="6">
                                <this.DurationField duration={this.props.duration} handleInputChange={this.props.handleInputChange} />
                            </Col>
                            <Col lg="6">
                                <this.ReleaseDateField releaseDate={this.props.releaseDate} handleInputChange={this.props.handleInputChange} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col lg="8">
                                <this.ImdbIdField imdbId={this.props.imdbId} handleInputChange={this.props.handleInputChange} />
                            </Col>
                            <Col lg="4">
                                <this.ImdbRatingField imdbRating={this.props.imdbRating} handleInputChange={this.props.handleInputChange} />
                            </Col>
                        </Form.Row>
            </Form.Group>
        )
    }
}

