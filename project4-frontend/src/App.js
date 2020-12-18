import './App.css';
import * as ReactBootStrap from "react-bootstrap";
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
      <div className='App'>
        <div className='logback'>
                <header>
                <ReactBootStrap.Navbar bg="dark" variant="dark" class="p-3 mb-2 bg-light text-dark">
                  <ReactBootStrap.Nav className="navbar fixed-top navbar-light">
                    <ReactBootStrap.Nav.Link><Link class="p-3 mb-2 bg-light text-dark" to="/">STONKS VS STINKS</Link></ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link><Link class="p-3 mb-2 bg-light text-dark" to="/login">Log In</Link></ReactBootStrap.Nav.Link>
                    <ReactBootStrap.Nav.Link><Link class="p-3 mb-2 bg-light text-dark" to="/signup">Signup</Link></ReactBootStrap.Nav.Link>
                  </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar>
                  {/* <img class='Logo' src='src/BULL.png' alt='BULL'></img> */}
                  {/* <nav class='navbar'>
                    <ul>
                      <li><button><h1><Link to="/">STONKS VS STINKS</Link></h1></button></li>
                      <li><button><Link to="/login">Log In</Link></button></li>
                      <li><button><Link to="/signup">Signup</Link></button></li>
                    </ul>
                  </nav> */}
                </header>

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
                      <h10>Stocks do not allways go TOOOOO THE MOOOOOOOOON. We are not responsible for any Stinks that occur.</h10>
                  </footer>
                </div>
              </div>
            </div>
      </div>
      
  )};
}
  

export default App;
