import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class ViewProfile extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          data:[],
          tickers:[]
        }
      }

    componentDidMount = async() =>{
        this.getStocks()
    }

    getStocks = async(event) => {
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
            const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`)
            // const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stocks[i].ticker}&apikey=G9K3MRYMN03JODZJ`)
            this.state.data.push(response.data)
        this.updateStocks()
    }

    // updateStocks = async(event) =>{
    //     event.preventDefault()
    //     let stocks = this.state.stocks
    //     for(let i = 0; i< stocks.length; i++){
    //         if(this.state.data[0]['Meta Data']['2. Symbol'] === stocks[i].ticker){
    //             await axios.put(`http://localhost:3000/api/stock/${stocks[i].id}`,{
    //                 currentValue: this.state.data[i]['Time Series (Daily)']['2020-12-10']['4. close']
    //             })
    //         }
    //     }
    //     console.log(this.state.data[0]['Time Series (Daily)']['2020-12-10']['4. close'])
    // }

    updateStocks = async() =>{
        // event.preventDefault()
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
                <li key={stock.id}>Ticker:{stock.ticker} Current Price:{stock.currentValue} Bought At:{stock.initialValue} Amount Purchased: {stock.amountInvested} Growth: {stock.growth}
                    <button key={stock.id} id={stock.id} onClick={this.deleteUserStock}>Delete</button>
                </li>
            )
        })

        return(
            <div>
                <h1>
                    {/* {user.name} */}
                </h1>
                <h5>Edit User</h5>
                {/* <form onSubmit={this.props.updateUser}>
                    <input type="hidden" name ="userId" value = {userDetail.id}/>
                    <input type="text" name="name" placeholder={userDetail.name}/>
                    <input type="submit" value='Edit User'/>
                </form> */}
                <h5>
                    Add a New Stock
                </h5>
                <button onClick={this.getStockData}>Alpha Vantage Stock Data</button>
                <button onClick={this.updateStocks}>Update Stocks on Stocks</button>
                {/* <button onClick={this.updateUserStock}>Update Stocks on UserStocks</button> */}
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

export default ViewProfile