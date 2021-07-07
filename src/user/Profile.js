/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DeafaultProfile from '../images/Avatar.jpg';
import DeleteUser from './DeleteUser';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      redirectToSignin: false
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      //no this requirect because now read method is directly available from apiUser and is not in class methods
      //no return required because its run after read returns something
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  render() {
    const { redirectToSignin, user } = this.state;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 ">Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
              src={DeafaultProfile}
              alt={user.name}
              className="card-img-top"
            />
          </div>
          <div className="col-md-8">
            <div className="lead mt-2">
              <p>Hello {user.name}</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id && (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
