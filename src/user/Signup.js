import React, { Component } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';
export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false
    };
  }
  handleChange = (name) => (event) => {
    this.setState({ error: '' }); // whenever there is some change in respect to error erro validation dissappears until further submit request
    this.setState({ [name]: event.target.value });
    console.log(name);
  };
  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    console.log(user);
    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: '',
          name: '',
          email: '',
          password: '',
          open: true
        });
    }); ///methods
  };

  signupForm = (
    name,
    email,
    password //using this method in render so that render will be maintainable and short
  ) => (
    <form>
      <div className="form-group">
        <label className="texted-muted">Name</label>
        <input
          onChange={this.handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="texted-muted">Email</label>
        <input
          onChange={this.handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="texted-muted">Password</label>
        <input
          onChange={this.handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );
  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 ">Signup</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? '' : 'none' }}
        >
          SignUp Successful! New account is created Please{''}
          <Link to="/signin">SignIn</Link>
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}
