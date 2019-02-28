import React from 'react';
import './FriendForm.scss';

const FriendForm = props => {
    return (  
        <form className="FriendForm" onSubmit={props.addFriend}>
            <input onChange={props.handleChange}
                name="name"
                placeholder="name"
                type="text"
                value={props.name}
                required />
                
            <input onChange={props.handleChange}
                name="age"
                placeholder="age"
                type="text"
                value={props.age}
                />

            <input onChange={props.handleChange}
                name="email"
                placeholder="email"
                type="text"
                value={props.email}
                />

            <div className="FriendForm__buttons">
                <input type="submit" value="Add" />
                <input type="reset" onClick={props.resetForm}/>
            </div>
        </form>
    );
}
export default FriendForm;