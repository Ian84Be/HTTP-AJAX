import React, { Component } from 'react';
import './App.scss';

import axios from 'axios';
import FriendCard from './components/FriendCard';
import FriendForm from './components/FriendForm';

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

  deleteFriend = e => {
    // e.preventDefault();
    console.log(e.target.value);
    axios
      .delete(`http://localhost:5000/friends/${e.target.value}`)
      .then(res => console.log(res.data));
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <h1>myFriends</h1>
        <FriendForm />
        <div className="friend-container">
        {this.state.friends.map(friend => {
          return (
            <FriendCard {...friend} key={friend.id} deleteFriend={this.deleteFriend}/>
            )
          })}
          </div>
      </div>
    );
  }
}