import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class MyStocks extends Component{
    constructor(){
        super()
        this.state = {
            stockData:[],
            stocks: [],
            data:[],
            tickers:[],
            user:[]
        }
      }

    componentDidMount = async(event) =>{
        this.getInfo()
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
        let response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
        console.log(1)
        for( var key in response.data['Time Series (Daily)']){
            this.state.stockData.push(response.data['Time Series (Daily)'][key])
        }
        console.log(this.state.stockData[99]['4. close'])
        await axios.post(`http://localhost:3000/api/stock/`,{
            ticker:response.data['Meta Data']['2. Symbol'],
            currentValue:this.state.stockData[99]['4. close'],
        })
        console.log(2)
        await axios.post(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            ticker:response.data['Meta Data']['2. Symbol'],
            currentValue:this.state.stockData[99]['4. close'],
            amountInvested:event.target.amount.value
        })
        console.log(3)
        this.getStockPrice()
        this.getInfo()
    }

    getStockPrice = async() =>{
        const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
    }

    money = () => {

    }




    deleteUserStock = async (event) => {
        event.preventDefault()
        let id = parseFloat(event.target.id)
        console.log(this.state.user.id)
        console.log(event.target.id)
        await axios.delete(`http://localhost:3000/api/userstock/profile/${this.state.user.id}`,{
            stockId:7
        })
        console.log(id)
        this.setState({
            state:this.state
        })
    }

    render(){
        const userStocks = this.state.stocks.map(stock =>{
            return(
                <li key={stock.id}>Ticker:{stock.ticker} Amount Purchased: {stock.userStocks.amountInvested}
                    <button name={stock.id} id={`${stock.userStocks.stockId}`} onClick={this.deleteUserStock}>Delete</button>
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
                    Budget:
                </h5>
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