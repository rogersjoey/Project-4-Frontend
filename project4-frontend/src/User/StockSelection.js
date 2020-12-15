import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class MyStocks extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          data:[],
          tickers:[],
          user:[]
        }
      }

    componentDidMount = async(event) =>{
        this.getInfo()
    console.log(this.state.user)
    }

    getInfo = async(event) =>{
        let response = await axios(`${backendUrl}/users/profile/${this.props.match.params.id}`)
        this.setState({
            user: response.data.user,
            stocks: response.data.user.stocks
        })
    }

    addStock = async (event) => {
        event.preventDefault()
        await axios.post(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            ticker:event.target.ticker.value,
            amountInvested:event.target.amount.value
        })
        this.getInfo()
    }
    
    render(){
        const userStocks = this.state.stocks.map(stock =>{
            return(
                <li key={stock.id}>Ticker:{stock.ticker} Amount Purchased: {stock.amountInvested}
                    <button key={stock.id} id={stock.id} onClick={this.deleteUserStock}>Delete</button>
                </li>
            )
        })

        return(
            <div>
                <h1>
                    User Stock Selection
                </h1>
                <form onSubmit={this.addStock}>
                    {/* <input type="hidden" name ="userId" value = {user.id}/> */}
                    Stock Ticker:<input type="text" name="ticker"/>
                    Dollar Amount:<input type="int" name="amount"/>
                    <input type="submit" value='Add Stock to Stocks'/>
                </form>
                <h5>
                    Your Stocks
                </h5>
                <ul>
                    {userStocks}
                </ul>
            </div>
        )
    }
}

export default MyStocks