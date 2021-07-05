import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth';
class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loading: false
    };
  }
  handleChange = (name) => (event) => {
    this.setState({ error: '' }); // whenever there is some change in respect to error erro validation dissappears until further submit request
    this.setState({ [name]: event.target.value });
    console.log(name);
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      //data of inut fields
      email,
      password
    };
    console.log(user);
    signin(user).then((data) => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        //authenticate if username and password matches or not
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
        //redirect the user if true
      }
    }); ///methods
  };

  signinForm = (
    email,
    password //using this method in render so that render will be maintainable and short
  ) => (
    <form>
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
    const { email, password, error, redirectToReferer, loading } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 ">Signin</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ''
        )}
        {this.signinForm(email, password)}
      </div>
    );
  }
}
export default Signin;
