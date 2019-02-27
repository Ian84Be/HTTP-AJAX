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

  render() {
    
    return (
      <div className="App">
        <h1>myFriends</h1>
        <FriendForm />
        {this.state.friends.map(friend => {
          return (
            <FriendCard {...friend}/>
          )
        })}
      </div>
    );
  }
}