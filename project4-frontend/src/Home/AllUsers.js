import React,{Component} from 'react';
import {Link, useLocation} from 'react-router-dom';
import'./AllUsers.css';

class AllUsers extends Component{
    render(){ 
        
        const allUsers = this.props.users.map((users,i) => {
            return(
                <div className='User'>
                    <ul>
                        <Link to={`/profile/${users.id}`}>
                            <li className='rank'>{i+1}</li>
                            <li className='user'>{users.name}</li>
                            <li className='gowth' key={users.id}>{users.growth}</li>
                        </Link>
                    </ul>

                </div>
            )
        })

        return(
            <div className='home'>
                <div className='STONKS'>
                    <h1>Stonks</h1>
                    <ol className='stocklist'>
                        <li className='stonk'>1. FVRR</li>
                        <li className='stonk'>2. TSLA</li>
                        <li className='stonk'>3. MRNA</li>
                        <li className='stonk'>4. ETSY</li>
                        <li className='stonk'>5. AMZN</li>
                        <li className='stonk'>6. NFLX</li>
                    </ol>
                </div>
                <div className='All'>
                    <h1>LEADERBOARD</h1>
                    <ul className='Allusers'>
                        <li id='Head'>Rank</li>
                        <li id='Head'>User</li>
                        <li id='Head'>Growth</li>
                        {allUsers}
                    </ul>
                </div>
                <div className='STINKS'>
                    <h1>Stinks</h1>
                    <ol className='stocklist'>
                        <li className='stonk'>1. RIG</li>
                        <li className='stonk'>2. IVR</li>
                        <li className='stonk'>3. AMRN</li>
                        <li className='stonk'>4. VET</li>
                        <li className='stonk'>5. TALO</li>
                        <li className='stonk'>6. DVN</li>
                    </ol>
                </div>
            </div>

        )
    };
}

export default AllUsers;