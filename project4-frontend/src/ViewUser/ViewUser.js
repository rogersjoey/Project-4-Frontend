import React,{Component} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class ViewProfile extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          user:[],
          stockInfo:[],
          stockData:[],
          stockData2:[],
          labels:[],
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

    componentDidMount = async() =>{
        let i = this.props.match.params.id
        const response = await axios (`http://localhost:3000/api/users/profile/${i}`)
        this.setState({
            user: response.data.user,
            stocks: response.data.user.stocks
          })
    }

    
    addStock = async (event) => {
        event.preventDefault()
        // if(this.state.stocks.includes(response.data.stocks[i].ticker) !== true){
        //     //add stock to list
        //     this.getStockData()
        //     this.updateStocks()
        // } else {
        //     //update current value of stock
        // }
        await axios.post(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            ticker:event.target.ticker.value,
            amountInvested:event.target.amount.value
        })
        this.getSingleStockData(event.target.ticker.value)
        this.getStocks()
    }

    getStockData = async(event) => {
        event.preventDefault()
            for(let i=0; i<this.state.stocks.length; i++){
                const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
                // const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stocks[i].ticker}&apikey=G9K3MRYMN03JODZJ`)
                this.state.data.push(response.data)
            }
        this.updateStocks()
    }

    getSingleStockData = async(event) => {
        event.preventDefault()
        let numb = document.getElementsByClassName('custom-select')[0].value
        let date = document.getElementsByClassName('custom-select')[0][numb].id
        let series = document.getElementsByClassName('custom-select')[0][numb].className
        // console.log(document.getElementsByClassName('custom-select'))
        // console.log(`https://www.alphavantage.co/query?function=TIME_SERIES_${date}&symbol=${event.target.parentElement.id}&apikey=G9K3MRYMN03JODZJ`)
        const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_${date}&symbol=${event.target.parentElement.id}&apikey=G9K3MRYMN03JODZJ`)
        this.state.stockInfo = response.data['Meta Data']
        this.state.stockData = []
        this.state.labels = []
        this.state.datasets[0].data = []
        for( var key in response.data[series]){
            this.state.stockData.push(response.data[series][key])
            this.state.labels.push([key])
        }
        this.state.stockData.map((day,i) => {
            this.state.datasets[0].data.push(parseFloat(day['4. close']))
        })
        this.state.labels = this.state.labels.reverse()
        this.state.datasets[0].data = this.state.datasets[0].data.reverse()
        this.setState({state:this.state})
    }


    updateStocks = async(event) =>{
        event.preventDefault()
        for(let i = 0; i< this.state.data.length; i++){
            for(let j = 0; j< this.state.stocks.length; j++){
                if(this.state.data[i]['Meta Data']['2. Symbol'] === this.state.stocks[j].ticker){
                    await axios.put(`http://localhost:3000/api/userstock/profile/${this.props.match.params.id}`,{
                        stockId: this.state.stocks[j].id,
                        finalValue: this.state.data[i]['Time Series (Daily)']['2020-12-10']['4. close'],
                        growth: 36
                    })
                    await axios.put(`http://localhost:3000/api/stock/${this.state.stocks[j].id}`,{
                        currentValue: this.state.data[i]['Time Series (Daily)']['2020-12-10']['4. close']
                    })
                }
            }
        }
    }

    deleteUserStock = async(event) => {
        event.preventDefault()

        let id = event.target.id
        await axios.delete(`http://localhost:3000/api/userstock/profile/${this.props.match.params.id}`,{
            stockId: id
        })
        console.log(id)
        this.getStocks()
    }



    render(){
        const user = this.props.users.find(
            users => {
                return users.id == this.props.match.params.id
        })

        const userStocks = this.state.stocks.map(stock =>{
            return(
                <button id={stock.ticker} className='stock' onClick = {this.getSingleStockData}>
                    <li className="stockinfo" key={stock.id}>Ticker:
                        {stock.ticker} 
                        Current Price:{stock.currentValue}
                    </li>
                </button>
            )
        })

        return(
            <div>
                <h1 className='header'>
                    {this.state.user.name}s Top Stock Picks
                </h1>
                <ul className = 'stocklist'>
                    {userStocks}
                </ul>
                <div >
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
                                // text:this.state.stockInfo['2. Symbol'],
                                fontSize:25
                            },
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default ViewProfile