import './NewUser.css'
import * as ReactBootStrap from "react-bootstrap";
import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class Signup extends Component{
    constructor(){
        super()
        this.state = {
          users: []
        }
      }

    // componentDidMount = async() =>{
    // }

    login = async (event,res) =>{
        event.preventDefault()
        const response = await axios.post('http://localhost:3000/api/auth/signup',{
            name: event.target.name.value,
            username: event.target.username.value,
            password: event.target.password.value
        })
        if(response.statusText === 'OK'){
            this.props.history.push(`/myprofile/${response.data.newUser.id}`)
        }
        // if(response.statusText === 'OK'){
        //     window.location.href=`/myprofile/${response.data.foundUser.id}`;
        // }
    }

    
    render(){
        // const user = this.props.users.find(
        //     users => {
        //         return users.id == this.props.match.params.id
        // })

        return(
            <div>
                <h1>
                    SIGN UP
                </h1>
                <ReactBootStrap.Form className ='form'>
                    <ReactBootStrap.Form.Group controlId="formBasicName">
                        <ReactBootStrap.Form.Label>Name</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="name" placeholder="Enter Name" />
                        <ReactBootStrap.Form.Text className="text-muted">
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Form.Group controlId="formBasicUsername">
                        <ReactBootStrap.Form.Label>Username</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="username" placeholder="Enter username" />
                        <ReactBootStrap.Form.Text className="text-muted">
                        </ReactBootStrap.Form.Text>
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Form.Group controlId="formBasicPassword">
                        <ReactBootStrap.Form.Label>Password</ReactBootStrap.Form.Label>
                        <ReactBootStrap.Form.Control type="password" placeholder="Password" />
                    </ReactBootStrap.Form.Group>
                    <ReactBootStrap.Button className = 'btn btn-success' variant="primary" type="submit">Submit</ReactBootStrap.Button>
                </ReactBootStrap.Form>
                {/* <form onSubmit={this.login}>
                    Name<input type="text" name="name"/>
                    Username<input type="text" name="username"/>
                    Password<input type="text" name="password"/>
                    <input type="submit" value='Sign Up'/>
                </form> */}
            </div>
        )
    }
}

export default withRouter(Signup)