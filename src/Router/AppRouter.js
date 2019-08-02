import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import MovieGet from '../Movie/MovieGet';
import MovieSearch from '../Movie/MovieSearch';
import MovieAdd from '../Movie/MovieAdd';
import MovieUpdate from '../Movie/MovieUpdate';
import DirectorGet from '../Director/DirectorGet';
import Login from '../User/Login';
import MainPage from '../MainPage';
import Register from '../User/Register';
import UserGet from '../User/UserGet';
import UserSearch from '../User/UserSearch';
import UserUpdate from '../User/UserUpdate';
import ListAdd from '../List/ListAdd';
import DirectorAdd from '../Director/DirectorAdd';
import DirectorUpdate from '../Director/DirectorUpdate';
import DirectorSearch from '../Director/DirectorSearch';
import Logout from '../User/Logout';
import Welcome from '../Welcome';
import ChangePassword from '../User/ChangePassword';
import RoleMenu from '../User/RoleMenu';
import UserAdd from '../User/UserAdd';
const AppRouter = () =>(
    <BrowserRouter>
        <Route exact path="/*" component={MainPage} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/movies/add" component={MovieAdd} /> 
        <Route exact path="/movies" component={MovieGet} />
        <Route exact path="/movies/update/:id" component={MovieUpdate} /> 
        <Route exact path="/movies/search/:id" component={MovieSearch} />
        <Route exact path="/directors" component={DirectorGet} /> 
        <Route exact path="/directors/add" component={DirectorAdd} /> 
        <Route exact path="/directors/update/:id" component={DirectorUpdate} /> 
        <Route exact path="/directors/search/:id" component={DirectorSearch} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/register" component={Register} /> 
        <Route exact path="/users" component={UserGet} /> 
        <Route exact path="/users/:username" component={UserSearch} /> 
        <Route exact path="/users/update/:username" component={UserUpdate} /> 
        <Route exact path="/users/:username/lists" component={ListAdd} /> 
        <Route exact path="/users/:username/change_password" component={ChangePassword} /> 
        <Route exact path="/users/:username/roles" component={RoleMenu} />
        <Route exact path="/users/add" component={UserAdd} /> 
        <Route exact path="/logout" component={Logout} /> 
    </BrowserRouter>
);

export default AppRouter