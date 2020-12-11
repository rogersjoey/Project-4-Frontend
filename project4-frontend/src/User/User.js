import React,{Component} from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:3000/api'
// const stockDataUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=G9K3MRYMN03JODZJ'

class Profile extends Component{
    constructor(){
        super()
        this.state = {
          stocks: [],
          data:[]
        }
      }

    componentDidMount = async() =>{
        this.getStocks()
    }

    getStocks = async() => {
        const response = await axios(`${backendUrl}/userstock/profile/${this.props.match.params.id}`)
        let i
        let stocksdata = []
        let tickers=[]
        for(i=0; i<response.data.stocks.length; i++){
            if(tickers.includes(response.data.stocks[i].ticker) === true){
                } else {
                    stocksdata.push(response.data.stocks[i])
                    tickers.push(response.data.stocks[i].ticker)
                }
        }
        this.setState({
          stocks: stocksdata,
        })
        
        for(let i=0; i<this.state.stocks.length; i++){
            setTimeout(this.getStockData(stocksdata[i]),15000)
        }
        
      }
    
    addStock = async (event) => {
        event.preventDefault()
        
        await axios.post(`${backendUrl}/userstock/profile/${this.props.match.params.id}`,{
            ticker:event.target.ticker.value,
        })
        
        this.getStocks()
    }

    getStockData = async(stock) => {
        // const response = await axios(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.ticker}&apikey=G9K3MRYMN03JODZJ`)
        // this.state.data.push(response.data)
        console.log(this.state.data)
    }





    render(){
        const user = this.props.users.find(
            users => {
                return users.id == this.props.match.params.id
        })

        const userStocks = this.state.stocks.map(stock =>
        {
            return <li key={stock.id}>{stock.ticker}</li>
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
                <form onSubmit={this.addStock}>
                    {/* <input type="hidden" name ="userId" value = {user.id}/> */}
                    <input type="text" name="ticker"/>
                    <input type="submit" value='Add Stock'/>
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

export default Profile