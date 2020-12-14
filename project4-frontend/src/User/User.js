import React,{Component} from 'react';
import {withRouter,Route, Switch, Link} from 'react-router-dom';
import MyStocks from '../User/StockSelection';
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
        this.getStocks()
    }

    getStocks = async(event) =>{
        const response = await axios(`${backendUrl}/userstock/profile/${this.props.match.params.id}`)
        for(let i=0; i<response.data.stocks.length; i++){
            if(this.state.tickers.includes(response.data.stocks[i].ticker) !== true){
                    this.state.stocks.push(response.data.stocks[i])
                    this.state.tickers.push(response.data.stocks[i].ticker)
                }
        }
        this.setState({
          stocks: this.state.stocks,
        })
    }

    // stocksPage = async() => {
    //     this.props.history.push(`/myStocks/${this.state.user.id}`)
    // }



    render(){
        const userStocks = this.state.stocks.map(stock =>{
            return(
                <li key={stock.id}>Ticker:{stock.ticker} Current Price:{stock.currentValue} Bought At:{stock.initialValue} Amount Purchased: {stock.amountInvested} Growth: {stock.growth}</li>
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
                <Link key={this.state.user.id} to={`/myStocks/${this.state.user.id}`}>
                    <button>Select Stocks</button>
                </Link>
                <ul>
                    {userStocks}
                </ul>
            </div>
        )
    }
}

export default withRouter(MyProfile)