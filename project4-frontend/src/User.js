import React,{Component} from 'react';

class Profile extends Component{
    render(){
        const userDetail = this.props.users.find(
            users => {
                return users.id == this.props.match.params.id
            } 
        )

        const userStocks = userDetail.stocks.map(stock =>
        {
            return <li key={stock.id}>{stock.ticker}</li>
        })
        return(
            <div>
                <h1>
                    {userDetail.name}
                </h1>
                <h5>Edit User</h5>
                <form onSubmit={this.props.updateUser}>
                    <input type="hidden" name ="userId" value = {userDetail.id}/>
                    <input type="text" name="name" placeholder={userDetail.name}/>
                    <input type="submit" value='Edit User'/>
                </form>
                <h5>
                    Add a New Stock
                </h5>
                {/* <form onSubmit={this.props.addStock}>
                    <input type="hidden" name ="userId" value = {users.id}/>
                    <input type="text" name="title"/>
                    <input type="submit" value='addstock'/>
                </form> */}
                <ul>
                    {userStocks}
                </ul>
            </div>
        )
    }
}

export default Profile