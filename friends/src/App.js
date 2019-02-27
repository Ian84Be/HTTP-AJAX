import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';
import FriendCard from './components/FriendCard';
import FriendForm from './components/FriendForm';

export default class App extends Component {
  state = {
    friends: [],
    name:'',
    age:'',
    email:'',
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => {
        this.setState({
          friends: response.data
        })
      })
      .catch(err => console.log(err));
  }

  addFriend = e => {
    e.preventDefault();
    const newFriend = {
      age: this.state.age,
      email: this.state.email,
      name: this.state.name,
    }
    axios
      .post('http://localhost:5000/friends', newFriend)
      .then(response => {
        this.setState({
          friends: response.data
        })
      })
      .catch(err => console.log(err));
  }

  deleteFriend = e => {
    axios
      .delete(`http://localhost:5000/friends/${e.target.value}`)
      .then(res => this.setState({
        friends: res.data
      }))
      .catch(err => console.log(err));
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
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
      <div className="App">
        <h1>myFriends</h1>
        <FriendForm 
          addFriend={this.addFriend}
          age={this.state.age}
          email={this.state.email}
          handleChange={this.handleChange}
          name={this.state.name} 
          onChange={this.handleChange}
          resetForm={this.resetForm}
          />
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