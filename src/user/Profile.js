/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { read } from './apiUser';
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
    console.log(this.props);
  }
  render() {
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 ">Profilev</h2>
        <p>Hello {isAuthenticated().user.name}</p>
        <p>Hello {isAuthenticated().user.email}</p>
        <p>
          {`joined on ${new Date(this.state.user.created).toDateString()}`}{' '}
        </p>
      </div>
    );
  }
}
export default Profile;
