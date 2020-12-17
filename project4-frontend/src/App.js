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
      <nav class='navbar'>
        <button><h1><Link to="/">STONKS VS STINKS</Link></h1></button>
        <span class ='loginnav'> 
          <button><Link to="/login">Log In</Link></button>        
          <button><Link to="/signup">Signup</Link></button>
        </span>

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
      <div className = 'footer'>
        <div>
          <footer className="App-footer">
            <div className='container'></div>
              <h4> © 2020 SEI. All rights reserved.</h4>
          </footer>
        </div>
      </div>
    </div>
  )};
}
  

export default App;
