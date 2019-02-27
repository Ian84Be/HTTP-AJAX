import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

export default class App extends Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => {
        console.log(response.data);
        this.setState({
          friends: response.data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    
    return (
      <div className="App">
        <h1>myFriends</h1>
        {this.state.friends.map(friend => {
          return (
            <div className="friend" key={friend.id}>
            <h3>{friend.name}</h3>
            <p>{friend.age} years old</p>
            <a href={`${friend.email}`}>{friend.email}</a>
            </div>
          )
        })}
      </div>
    );
  }
}