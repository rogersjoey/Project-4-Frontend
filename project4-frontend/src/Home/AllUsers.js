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
                    Growth:{users.growth}
                </li>
            )
        })

        return(
            <div>
                <h1>All Users</h1>
                {allUsers}
            </div>
        )
    };
}

export default AllUsers;