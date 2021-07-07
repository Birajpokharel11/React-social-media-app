import React, { Component } from 'react';
import { list } from './apiUser';
import { Link } from 'react-router-dom';
import DeafaultProfile from '../images/Avatar.jpg';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }
  renderUsers = (users) => {
    return (
      <div className="row">
        {users.map((user, i) => (
          <div className="card col-md" key={i}>
            <img
              style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
              src={DeafaultProfile}
              alt={user.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-raised btn-primary btn-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>

        {this.renderUsers(users)}
      </div>
    );
  }
}
