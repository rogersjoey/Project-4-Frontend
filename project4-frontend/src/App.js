import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Route, Link, Switch, Router} from 'react-router-dom';
import AllUsers from './Home/AllUsers';
import ViewProfile from './ViewUser/ViewUser';
import Login from './Login/Login';
import Signup from './Login/NewUser';
import MyProfile from './User/User';
import MyStocks from './User/StockSelection';

const backendUrl = 'http://localhost:3000/api'


class App extends Component {
  constructor(){
    super()

    this.state = {
      users:[],
    }
  }

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = async() => {
    const response = await axios(`${backendUrl}/users/`)

    this.setState({
      users: response.data.allUsers
    })
  }


  render (){
    return(
      <div className="App">
      <nav>
        <Link to="/">Home Page</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <AllUsers 
              users = {this.state.users}
              />}
          />
          <Route
            exact
            path="/login"
            component={(routerProps) => <Login
              {...routerProps}
              users = {this.state.users}
              />}
          />
          <Route
            exact
            path="/signup"
            component={() => <Signup
              users = {this.state.users}
              />}
          />
          <Route
            path ="/profile/:id"
            component={(routerProps) => <ViewProfile
            {...routerProps}
              users = {this.state.users}
              />}
          />
          <Route
            exact
            path="/myprofile/:id"
            component={(routerProps) => <MyProfile 
              {...routerProps}
              users = {this.state.users}
              />}
          />
          <Route
            exact
            path="/myStocks/:id"
            component={(routerProps) => <MyStocks
              {...routerProps} 
              users = {this.state.users}
              />}
          />
        </Switch>
      </main>
    </div>
  )};
}
  

export default App;
