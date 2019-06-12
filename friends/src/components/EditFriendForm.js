import React from 'react';

const EditFriendForm = props => {
    // console.log(props);
    return ( 
        <form className="EditFriend__form"
            onSubmit={props.editFriend}
            value={props.thisFriend.id}>
            
            <input onChange={props.handleChange}
                name="name"
                placeholder={props.thisFriend.name}
                type="text"
                value={props.name}
                required />

            <input onChange={props.handleChange}
                name="age"
                placeholder={props.thisFriend.age}
                type="text"
                value={props.age}
            />

            <input onChange={props.handleChange}
                name="email"
                placeholder={props.thisFriend.email}
                type="text"
                value={props.email}
            />

            <div className="EditFriend__buttons">
                <input type="submit" value="Edit"/>
            </div>
        </form>
     );
}
export default EditFriendForm;