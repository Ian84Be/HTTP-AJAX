import React from 'react';
import './FriendCard.scss';

const FriendCard = props => {
    return ( 
        <div className="FriendCard" key={props.id}>
            <h3>{props.name}</h3>
            <p>{props.age} years old</p>
            <a href={`${props.email}`}>{props.email}</a>
        </div>
     );
}
export default FriendCard;