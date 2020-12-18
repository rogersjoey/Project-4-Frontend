import './Login.css';
import * as ReactBootStrap from "react-bootstrap";
import React,{Component} from 'react';
import {withRouter,Route} from 'react-router-dom';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            users:[],
            stocks: [],
            data:[],
            tickers:[]
        }
      }

    login = async (event) =>{
        event.preventDefault()
        this.setState({
            users: this.props.users
        })
        const response = await axios.post('http://localhost:3000/api/auth/login',{
            username: event.target.username.value,
            password: event.target.password.value
        })
        console.log(response)
        if(response.statusText === 'OK'){
            this.props.history.push(`/myprofile/${response.data.foundUser.id}`)
        }
    }

    
    render(){
        return(
            <div className='login'>
                <h1>
                    LOG IN
                </h1>
                <ReactBootStrap.Form className='form' onSubmit={this.login}>
                    <ReactBootStrap.Form.Group controlId="formBasicEmail">
                        <ReactBootStrap.Form.Label>Username</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="username" name="username" placeholder="Enter username" />
                        <ReactBootStrap.Form.Text className="text-muted">
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Form.Group controlId="formBasicPassword">
                        <ReactBootStrap.Form.Label>Password</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="text" name="password" placeholder="Password" />
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Button className = 'btn btn-success' variant="primary" type="submit">Submit</ReactBootStrap.Button>
                </ReactBootStrap.Form>
                {/* <form onSubmit={this.login}>
                    Username<input type="text" name="username"/>
                    Password<input type="text" name="password"/>
                    <input type="submit" value='Log In'/>
                </form> */}
            </div>
        )
    }
}

export default withRouter(Login)