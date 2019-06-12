import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
} from 'react-router-dom';

import './App.scss';
import AddFriend from './components/AddFriend';
import EditFriend from './components/EditFriend';
import FriendCard from './components/FriendCard';

export default class App extends Component {
  state = {
    friends: [],
    formFriend: {
      age:'',
      email:'',
      name:'',
    },
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
        })
      })
      .catch(err => console.log(err));
  }

  editFriend = e => {
    e.preventDefault();
    console.log(e.target.value);
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

  resetForm = e => {
    e.preventDefault();
    this.setState({
      formFriend: {
        age:'',
        email:'',
        name:'',
      },
      editFriend: {
        age:'',
        email:'',
        name:'',
      }
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
          <AddFriend
          {...props} 
          addFriend={this.addFriend}
          age={this.state.formFriend.age}
          email={this.state.formFriend.email}
          handleChange={this.handleChange}
          name={this.state.formFriend.name} 
          resetForm={this.resetForm}
          />
        )}/>

        <Route path="/edit/:name" render={props => (
          <EditFriend
            {...props}
            age={this.state.formFriend.age}
            editFriend={this.editFriend}
            email={this.state.formFriend.email}
            friends={this.state.friends}
            handleChange={this.handleChange}
            name={this.state.formFriend.name}
            />
        )} />
        
          <Route path="/" render={props => (
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
          )} />
        

      </div>
          </Router>
    );
  }
}