import React from 'react';
import './EditFriend.scss';
import { Route, NavLink } from 'react-router-dom';

import EditFriendForm from './EditFriendForm';

const EditFriend = props => {
    let thisFriend = {
        age: '',
        email: '',
        name: '',
    }
    
    const { name } = props.match.params;
    let friends = props.friends;
    friends.forEach(friend => {
        if (friend.name === name) {
            thisFriend = {
                age: friend.age,
                email: friend.email,
                id: friend.id,
                name: friend.name,
            }
        }
    });

    return (
        <div className="EditFriend">

            <div className="EditFriend__nav">
                <h3>EditFriend</h3>
                {props.friends.map(friend => {
                    return <NavLink key={friend.id} to={`/edit/${friend.name}`}>{friend.name}</NavLink>
                })}
            </div>


            <Route path="/edit/:name"
                render={ownProps => {
                    return (
                        <EditFriendForm
                            {...ownProps}
                            thisFriend={thisFriend}
                            editFriend={props.editFriend}
                            handleChange={props.handleChange}
                            age={props.age}
                            email={props.email}
                            friends={props.friends}
                            name={props.name} />
                    )
                }} />
        </div>
    );
}

export default EditFriend;