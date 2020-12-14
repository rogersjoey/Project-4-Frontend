import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class MyProfile extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          data:[],
          tickers:[],
          user: []
        }
      }

    componentDidMount = async(event) =>{
        const response = await axios (`http://localhost:3000/api/users/profile/${this.props.match.params.id}`)
        this.setState({
            user: response.data.user,
          })
        console.log(this.state.user)
    }

    getStocks = async(event) =>{
        event.preventDefault()
        this.props.history.push(`/myStocks/${this.state.user.id}`)
    }



    render(){
        const userStocks = this.state.stocks.map(stock =>{
            return(
                <li key={stock.id}>Ticker:{stock.ticker} Current Price:{stock.currentValue} Bought At:{stock.initialValue} Amount Purchased: {stock.amountInvested} Growth: {stock.growth}
                    <button key={stock.id} id={stock.id} onClick={this.deleteUserStock}>Delete</button>
                </li>
            )
        })

        return(
            <div>
                <h1>
                    {this.state.user.name}
                </h1>
                <h5>MY USER PAGE</h5>
                <h5>
                    Your Stocks
                </h5>
                <button onClick={this.getStocks}>Select Stocks</button>
                <ul>
                    {userStocks}
                </ul>
            </div>
        )
    }
}

export default MyProfile