import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

import './App.scss';
import FriendCard from './components/FriendCard';
import FriendForm from './components/FriendForm';

export default class App extends Component {
  state = {
    friends: [],
    formFriend: {
      age:'',
      email:'',
      name:'',
    },
    toHome:false,
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
    const newFriend = this.state.formFriend;
    axios
      .post('http://localhost:5000/friends', newFriend)
      .then(response => {
        this.setState({
          friends: response.data,
          formFriend: {
            age:'',
            email:'',
            name:'',
          },
          toHome:true,
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
    e.persist();
    this.setState(prevState => {
      return {
        formFriend: {
          ...prevState.formFriend,
          [e.target.name]: e.target.value,
        }
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    e.persist();
  }

  resetForm = e => {
    e.preventDefault();
    this.setState({
      age:'',
      email:'',
      name:'',
    });
  }

  render() {
    
    return (
      <Router>

      <div className="App">
      <div className="nav">
        <h1>myFriends</h1>
        <div className="nav__links">
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/edit">Edit</NavLink>
        <NavLink to="/delete">Delete</NavLink>
        </div>
      </div>

        <Route path="/add" render={props => (
          <FriendForm 
          addFriend={this.addFriend}
          age={this.state.formFriend.age}
          email={this.state.formFriend.email}
          handleChange={this.handleChange}
          name={this.state.formFriend.name} 
          onChange={this.handleChange}
          onSubmit={this.onSubmit}
          resetForm={this.resetForm}
          />
        )}/>
        

        <div className="friend-container">
        {this.state.friends.map(friend => {
          return (
            <FriendCard
            {...friend} 
            deleteFriend={this.deleteFriend}
            key={friend.id}
            />
            )
          })}
          </div>

      </div>
          </Router>
    );
  }
}