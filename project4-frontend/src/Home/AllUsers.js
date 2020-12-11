import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class AllUsers extends Component{
    render(){ 
        
        const allUsers = this.props.users.map(users => {
            return(
                <li key = {users.id}>
                    <Link to={`/profile/${users.id}`}>
                        {users.name}
                    </Link>
                    {/* <button key={users.id} id={users.id} onClick={this.props.deleteUser}>
                        Delete
                    </button> */}
                </li>
            )
        })

        return(
            <div>
                <h1>All Users</h1>
                {/* <form onSubmit={this.props.addUser}>
                    <input type='text' name='name'/>
                    <input type='submit' value='Search User'/>
                </form> */}
                {allUsers}
            </div>
        )
    };
}

export default AllUsers;