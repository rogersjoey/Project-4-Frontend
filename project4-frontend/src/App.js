import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Route, Link, Switch, Router} from 'react-router-dom';
import AllUsers from './AllUsers';
import Profile from './User';

const backendUrl = 'http://localhost:3000/api'

class App extends Component {
  constructor(){
    super()

    this.state = {
      users:[]
    }
  }

  componentDidMount = () => {
    this.getUsers()
  }

  getUsers = async() => {
    const response = await axios(`${backendUrl}/users`)

    this.setState({
      users: response.data.allUsers
    })
  } 
  render (){
    return(
      <div className="App">
      <nav>
        <Link to="/">Home Page</Link>
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
            path ="/profile/:id"
            component={(routerProps) => <Profile
            {...routerProps}
              users = {this.state.users}
              // addStock = {this.addStock}
            />}
          />
        </Switch>
      </main>
    </div>
  )};
}
  

export default App;
