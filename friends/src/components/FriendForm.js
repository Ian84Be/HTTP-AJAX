import React, {Component} from 'react';
import './FriendForm.scss';
import axios from 'axios';

class FriendForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            age:'',
            email:'',
         }
    }

    handleChange = e => {
        e.preventDefault();
        // if (e.target.type === 'checkbox') {
        //     return (
        //         this.setState({ [e.target.name]: e.target.checked })
        //     )
        // } else 
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        // e.preventDefault();
        console.log(this.state);
        axios
            .post('http://localhost:5000/friends', this.state)
            .then(res => {
                console.log(res);
                console.log(res.data);
              });
    }
    
    resetForm = e => {
        e.preventDefault();
        this.setState({
            name:'',
            age:'',
            email:'',
        });
    }

    render() { 
        return ( 
            <form className="FriendForm" onSubmit={this.onSubmit}>
                <input onChange={this.handleChange}
                    name="name"
                    type="text"
                    placeholder="name"
                    value={this.state.name}
                required />
                    
                <input onChange={this.handleChange}
                    name="age"
                    type="text"
                    placeholder="age"
                    value={this.state.age}
                required />

                <input onChange={this.handleChange}
                    name="email"
                    type="text"
                    placeholder="email"
                    value={this.state.email}
                required />

                <div className="FriendForm__buttons">
                <input type="submit" value="Submit" />
                <input type="reset" onClick={this.resetForm}/>
                </div>

            </form>
         );
    }
}
 
export default FriendForm;