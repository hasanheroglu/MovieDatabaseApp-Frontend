import React from 'react';
import {Movie, Director, Genre} from '../Util/MovieAppUtil.js';
import Login from '../User/Login.js';
import {Redirect} from 'react-router-dom';

class MovieSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {movie: [], status: 'LOADING'};
    }

    componentDidMount(){
        const movieId = this.props.match.params.id;
        if(!movieId){
            this.setState({object: [], status: 'FAILED'});
        }
        console.log(this.state.id)
        fetch('http://localhost:8080/movies/' + movieId, {
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
                    this.setState({movie: data.operationObject, status: 'SUCCESS'});
                } else{
                    this.setState({object: [], status: 'FAILED'});
                }
                console.log(data);
            })
            .catch(error =>{
                this.setState({object: [], status: 'FAILED'});
                console.log(error);
            });

    }

    render(){
        if(!localStorage.getItem("Role")){ return <Redirect to={"/login"} component={Login} />}

        if(this.state.status !== 'SUCCESS'){
            return <div>{this.state.status}</div>;
        } else{ 
            var moviesView = (
                <div>
                    <h1>Movie</h1>
                    <Movie movie={this.state.movie} />
                        <div>
                            <h2>Directed By</h2>
                            {
                                this.state.movie.directors.map(director => (
                                    <Director director={director} />
                                ))
                            }
                            <h2>Genres</h2>
                            {
                                this.state.movie.genres.map(genre => (
                                <Genre genre={genre} />
                                ))
                            }
                        </div>
                    </div>
            );
            return moviesView;
        }
    }
}

export default MovieSearch;