import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class MyProfile extends Component{
    constructor(){
        super()
        this.state = {
          userstocks:[],
          user: [],
          stockData:[],
          labels:[],
          startMoney: 1000000,
          vestedMoney: 0,
          datasets: [
            {
                label: 'Stock Price',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 4,
                data: []
            }]
        }
      }

    componentDidMount = async(event) =>{
        const response = await axios (`http://localhost:3000/api/users/profile/${this.props.match.params.id}`)
        this.setState({
            user: response.data.user,
            userstocks: response.data.user.stocks
          })
    }

    updateStocks = async(event) => {
        const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
        // const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stocks[i].ticker}&apikey=G9K3MRYMN03JODZJ`)
        this.state.stockInfo = response.data['Meta Data']
        this.state.stockData = []
        this.state.labels = []
        for( var key in response.data['Time Series (Daily)']){
            this.state.stockData.push(response.data['Time Series (Daily)'][key])
            this.state.labels.push([key])
        }
        await axios.put(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            stockId: event.target.id,
            finalValue:this.state.stockData[99]['4. close'],
        })
        this.state.stockData.map((day) => {
            this.state.datasets[0].data.push(parseFloat(day['4. close']))
        })
        this.state.labels = this.state.labels.reverse()
        this.state.datasets[0].data = this.state.datasets[0].data.reverse()
        this.growth()
        this.setState({state:this.state})
    }

    growth = async() =>{
        let total = 0
        let i = 0
        while(i<this.state.userstocks.length){
            let stock = this.state.userstocks[i].userStocks
            let growth = ((stock.finalValue)/(stock.initialValue))*(stock.amountInvested)
            if(isNaN(growth) == true || growth == 'Infinity'){
                growth = 0
            }
            total = total + growth
            await axios.put(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
                stockId: stock.stockId,
                growth: growth,
            })
        i++}
        console.log(total)
        await axios.put(`${backendUrl}/users/${this.props.match.params.id}`,{growth: total})
    }


    render(){
        const userStocks = this.state.userstocks.map(stock =>{
            return(
                <div>
                    <li key={stock.id}>Ticker:{stock.ticker} Current Price:{stock.userStocks.finalValue} Bought At:{stock.userStocks.initialValue} Amount Purchased: {stock.userStocks.amountInvested} Current Value: {stock.userStocks.growth}</li>
                    <button id={stock.userStocks.stockId} onClick={this.updateStocks}>View Stock</button>
                </div>
            )
        })
        return(
            <div>
                <h1>
                    {this.state.user.name}
                </h1>
                <h5>MY USER PAGE</h5>
                <Link key={this.state.user.id} to={`/myStocks/${this.state.user.id}`}>
                    <button>Select Stocks</button>
                </Link>
                <h5>Balance: {this.state.startMoney-this.state.vestedMoney}</h5>
                <h5>
                    Your Stocks
                </h5>
                <ul>
                    {userStocks}
                </ul>
                <div className='chart'>
                    <Line
                        data={this.state}
                        options={{
                            title:{
                                display:true,
                                text:'stonks',
                                fontSize:25
                            },
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(MyProfile)