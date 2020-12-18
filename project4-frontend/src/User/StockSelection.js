import './StockSelection.css'
import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
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
            user:[],
            startMoney: 100000,
            vestedMoney: 0,
            id: ''
        }
      }

    componentDidMount = async(event) =>{
        this.getInfo()
        this.growth()
    }

    getInfo = async(event) =>{
        let response = await axios(`${backendUrl}/users/profile/${this.props.match.params.id}`)
        this.setState({
            user: response.data.user,
            stocks: response.data.user.stocks,
        })
    }

    addStock = async (event) => {
        event.preventDefault()
        this.state.stockData = []
        const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${event.target.ticker.value}&apikey=G9K3MRYMN03JODZJ`)
        // console.log(1)
        for( var key in response.data['Time Series (Daily)']){
            this.state.stockData.push(response.data['Time Series (Daily)'][key])
        }
        console.log(this.state.stockData[0]['4. close'])
        //UPDATING STOCK CURRENT VALUE
        await axios.post(`http://localhost:3000/api/stock/`,{
            ticker:event.target.ticker.value,
            currentValue:this.state.stockData[0]['4. close'],
        })
        //PUTTING IN USER STOCK VALUE
        // console.log(2)
        await axios.post(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            ticker:response.data['Meta Data']['2. Symbol'],
            currentValue:this.state.stockData[0]['4. close'],
            amountInvested:event.target.amount.value
        })
        // console.log(3)
        this.getInfo()
    }

    growth = async() =>{
        let totalGrowth = 0
        let totalSpent = 0
        let i = 0
        while(i<this.state.stocks.length){
            let stock = this.state.stocks[i].userStocks
            console.log(stock)
            let growth = ((stock.finalValue)/(stock.initialValue))*(stock.amountInvested)
            let spent = (stock.amountInvested)
            if(isNaN(growth) == true || growth == 'Infinity'){
                growth = 0
            }
            totalSpent = parseInt(totalSpent) + parseInt(spent)
            totalGrowth = parseInt(totalGrowth) + parseInt(growth)
            await axios.put(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
                stockId: stock.stockId,
                growth: growth
            })
        i++}
        console.log(totalSpent)
        let totalValue = totalGrowth+(this.state.startMoney-totalSpent)
        await axios.put(`${backendUrl}/users/${this.props.match.params.id}`,{growth: totalGrowth, monthlyGrowth:totalValue})
        this.setState({state:this.state})
    }




    deleteUserStock = async (event) => {
        event.preventDefault()
        let id = parseFloat(event.target.id)
        console.log(this.state.user.id)
        console.log(event.target.id)
        await axios.delete(`${backendUrl}/userstock/profile/${this.state.user.id}`,{
            stockId: event.target.id
        })
        // console.log(id)
        this.setState({
            state:this.state
        })
    }

    render(){
        this.state.vestedMoney = 0
        const userStocks = this.state.stocks.map(stock =>{
            this.state.vestedMoney += parseInt(stock.userStocks.amountInvested)
            return(
                <li key={stock.id}><div className='ticker'>{stock.ticker}</div> Amount Purchased: {stock.userStocks.amountInvested}
                    <button class='delete' name={stock.id} id={stock.userStocks.stockId} onClick={this.deleteUserStock}>Delete</button>
                </li>
            )
        })
        this.state.startMoney = 100000
        return(
            <div className = 'All'>
                <div id='top'>
                    <Link key={this.state.user.id} to={`/myProfile/${this.state.user.id}`}>
                        <button id="userProf">Return To Profile</button>
                    </Link>
                    <h1 id='topTitle'>
                        User Stock Selection
                    </h1>
                </div>
                <div className='Stockform'>
                    <form onSubmit={this.addStock}>
                        {/* <input type="hidden" name ="userId" value = {user.id}/> */}
                        Stock Ticker:<input type="text" name="ticker"/>
                        Dollar Amount:<input type="int" name="amount"/>
                        <input id='stockEnter' type="submit" value='Add Stock to Stocks'/>
                    </form>
                    <h2>Balance: {this.state.startMoney-this.state.vestedMoney}</h2>
                </div>
                <div className='stockSelection'>
                    <h1>
                        Your Stocks
                    </h1>
                    <ul>
                        {userStocks}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(MyStocks)