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
          tickers:[]
        }
      }

    render(){
        return(
            <div>
                <h1>
                    User Stock Selection
                </h1>
            </div>
        )
    }
}

export default MyStocks