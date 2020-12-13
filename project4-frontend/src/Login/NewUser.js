import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class Login extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          data:[],
          tickers:[]
        }
      }

    // componentDidMount = async() =>{
    // }

    
    render(){
        // const user = this.props.users.find(
        //     users => {
        //         return users.id == this.props.match.params.id
        // })

        return(
            <div>
                <h1>
                    NEW USER
                </h1>
                <form onSubmit={this.login}>
                    {/* <input type="hidden" name ="userId" value = {user.id}/> */}
                    Username<input type="text" name="ticker"/>
                    Password<input type="int" name="amount"/>
                    <input type="submit" value='Log In'/>
                </form>
            </div>
        )
    }
}

export default Login