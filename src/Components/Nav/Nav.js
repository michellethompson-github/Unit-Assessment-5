import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, logout } from '../../redux/reducer';
import { useDispatch } from "react-redux";
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => {
      console.log(res.data.data);
      this.props.updateUser(res.data.data);
    })
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => {
        this.props.logout();
        window.location.href = "/"
      })
  }
  
  render() {
    console.log(this.props);
      return this.props.location.pathname === '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic' style={{backgroundImage: `url(${this.props.profile_pic})`}}></div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
              <img onClick={() => {window.location.href = "/dash"}} className='nav-img' src={homeLogo} alt='home' style={{cursor: "pointer"}} />
              <img onClick={() => {window.location.href = "/form"}} className='nav-img' src={newLogo} alt='new post' style={{cursor: "pointer"}} />
          </div>
          <Link to="/" onClick={this.logout}>
            <img className='nav-img logout' src={logoutLogo} alt='logout' />
          </Link>          
        </div>
  }
}

const mapStateToProps = (state) => {
    const { username, profile_pic } = state;
    return {
      username: username,
      profile_pic: profile_pic
    }
};

export default withRouter(connect(mapStateToProps, {
  updateUser, logout
})(Nav));
