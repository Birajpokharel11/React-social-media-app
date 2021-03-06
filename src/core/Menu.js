/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' };
  else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={
            history.location.pathname === '/users'
              ? 'active nav-link'
              : 'not-active nav-link'
          }
          style={isActive(history, '/user')}
          to="/users"
        >
          All Users
        </Link>
      </li>
      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signin')}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signup')}
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </>
      )}
      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <span
              className="nav-link"
              style={
                (isActive(history, '/signup'),
                { cursor: 'pointer', color: '#fff' })
              }
              onClick={() => signout(() => history.push('/'))}
            >
              Sign Out
            </span>
          </li>
          <li className="nav-item">
            <a>
              <Link
                to={`/user/${isAuthenticated().user._id}`}
                className="nav-link"
                style={
                  (isActive(history, '/signup'),
                  { cursor: 'pointer', color: 'orange' })
                }
              >{`${isAuthenticated().user.name}'s profile`}</Link>
            </a>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
