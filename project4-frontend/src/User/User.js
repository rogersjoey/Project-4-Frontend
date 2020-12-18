import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import'./User.css';

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
          startMoney: 100000,
          vestedMoney: 0,
          name:'',
          datasets: [
            {
                label: 'Stock Price',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'green',
                borderColor: 'green',
                borderWidth: 4,
                data: []
            }]
        }
      }

    componentDidMount = async(event) =>{
        const response = await axios (`http://localhost:3000/api/users/profile/${this.props.match.params.id}`)
        this.growth()
        console.log(this.state.vestedMoney)
        this.setState({
            user: response.data.user,
            userstocks: response.data.user.stocks,
          })
    }

    updateStocks = async(event) => {
        this.state.name = event.target.value
        let numb = document.getElementsByClassName('custom-select')[0].value
        let date = document.getElementsByClassName('custom-select')[0][numb].id
        let series = document.getElementsByClassName('custom-select')[0][numb].className
        const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_${date}&symbol=${this.state.name}&apikey=G9K3MRYMN03JODZJ`)
        console.log(response)
        this.state.stockInfo = response.data['Meta Data']
        this.state.stockData = []
        this.state.labels = []
        this.state.datasets[0].data = []
        for( var key in response.data[series]){
            this.state.stockData.push(response.data[series][key])
            this.state.labels.push([key])
        }
        this.state.stockData.map((day) => {
            this.state.datasets[0].data.push(parseFloat(day['4. close']))
        })
        this.state.labels = this.state.labels.reverse()
        this.state.datasets[0].data = this.state.datasets[0].data.reverse()
        await axios.put(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            stockId: event.target.id,
            finalValue:this.state.stockData[0]['4. close'],
        })
        this.state.stockData.map((day) => {
            this.state.datasets[0].data.push(parseFloat(day['4. close']))
        })
        this.growth()
        this.setState({state:this.state})
    }

    growth = async() =>{
        let totalGrowth = 0
        let totalSpent = 0
        let i = 0
        while(i<this.state.userstocks.length){
            let stock = this.state.userstocks[i].userStocks
            let growth = ((stock.finalValue)/(stock.initialValue))*(stock.amountInvested)
            let spent = (stock.amountInvested)
            if(isNaN(growth) == true || growth == 'Infinity'){
                growth = 0
            }
            totalSpent = parseInt(totalSpent) + parseInt(spent)
            totalGrowth = parseInt(totalGrowth) + parseInt(growth)
            await axios.put(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
                stockId: stock.stockId,
                growth: growth,
            })
        i++}
        console.log(totalSpent)
        this.state.vestedMoney = ''
        this.state.vestedMoney = totalSpent
        let totalValue = totalGrowth+(this.state.startMoney-totalSpent)
        await axios.put(`${backendUrl}/users/${this.props.match.params.id}`,{growth: totalGrowth, monthlyGrowth:totalValue})
        // this.setState({
        //     vestedMoney:this.totalSpent
        // })
    }


    render(){
        this.state.vestedMoney = 0
        const userStocks = this.state.userstocks.map(stock =>{
            this.state.vestedMoney = parseInt(this.state.vestedMoney)+parseInt(stock.userStocks.amountInvested)
            return(
                <div className='box'>
                    <ul className='stock'>
                        <li className ='Ticker'>Ticker:{stock.ticker}</li>
                        <li className ='Price'>Current Price:{stock.userStocks.finalValue}</li>
                        <li className ='Bought'>Bought At:{stock.userStocks.initialValue}</li>
                        <li className ='Amount'>Amount Purchased: {stock.userStocks.amountInvested}</li>
                        <li className ='Value'>Current Value: {stock.userStocks.growth}</li>
                    </ul>
                    <button id={stock.userStocks.stockId} class='mystock' value={stock.ticker} onClick={this.updateStocks}>View Stock</button>
                </div>
            )
        })
        return(
            <div>
                <div id='top1'>
                    <div id='tipytop'>
                        <Link key={this.state.user.id} to={`/myStocks/${this.state.user.id}`} id='selectLink'>
                            <button id='soDone'>Select Stocks</button>
                        </Link>
                        <h1 id="username">
                            {this.state.user.name}
                        </h1>
                    </div>
                </div>
                    <div className='stockbox'>
                        <h1>Cash Balance: {this.state.startMoney-this.state.vestedMoney}</h1>
                        <ul>
                            {userStocks}
                        </ul>
                    </div>
                <div id='bottom'>
                    <div id='tipyboty'>
                    <h1>Stock Data<br/></h1> 
                        <select class="custom-select">
                            <option value='0' id="DAILY" className ='Time Series (Daily)'>Short Term</option>
                            <option value='1' id="MONTHLY_ADJUSTED" className ='Monthly Adjusted Time Series'>Long Term</option>
                        </select>                        
                    </div>
                    <div className='chart'>
                        <Line
                            data={this.state}
                            options={{
                                title:{
                                    display:true,
                                    text:this.state.name,
                                    fontSize:100
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MyProfile)