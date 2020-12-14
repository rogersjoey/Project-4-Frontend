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
            <div>
                <h1>
                    LOG IN
                </h1>
                <form onSubmit={this.login}>
                    Username<input type="text" name="username"/>
                    Password<input type="text" name="password"/>
                    <input type="submit" value='Log In'/>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)