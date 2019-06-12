import React from 'react';
import './AddFriend.scss';

const AddFriend = props => {
    return (  
        <form className="AddFriend" onSubmit={props.addFriend}>
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

            <div className="AddFriend__buttons">
                <input type="submit" value="Add" />
                <input type="reset" onClick={props.resetForm}/>
            </div>
        </form>
    );
}
export default AddFriend;