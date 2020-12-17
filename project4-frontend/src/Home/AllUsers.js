import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import'./AllUsers.css';

class AllUsers extends Component{
    render(){ 
        
        const allUsers = this.props.users.map(users => {
            return(
                <div className='User'>
                    <Link to={`/profile/${users.id}`}>
                        <li className = 'Link' key = {users.id}>
                            {users.name}
                            Growth:{users.growth}
                        </li>
                    </Link>
                </div>
            )
        })

        return(
            <div className='All'>
                <h1>All Users</h1>
                <ul className='Allusers'>
                    {allUsers}
                </ul>
            </div>
        )
    };
}

export default AllUsers;