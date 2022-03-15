import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  /* ============================================================= LOGIN ============================================================= */
  login = (email, password) => {
    return axios
      .post(API_URL + 'login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  };

  /* ============================================================= LOGOUT ============================================================= */
  logout = () => {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    if (localStorage.getItem('admin')) {
      localStorage.removeItem('admin');
    }
  };

  /* ============================================================= SIGN UP ============================================================= */
  signup = (username, email, password) => {
    console.log('sign up is being called');
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    });
  };

  /* ============================================================= GET CURRENT USER ============================================================= */
  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  /* ============================================================= ADMIN SIGN UP ============================================================= */
  adminSignup = (username, password) => {
    var roles = ['admin'];
    console.log('sign up is being called');
    return axios.post(API_URL + 'signup', {
      username,
      password,
      roles,
    });
  };

  /* ============================================================= ADMIN LOGIN ============================================================= */
  adminLogin = (username, password) => {
    return axios
      .post(API_URL + 'login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('admin', JSON.stringify(response.data));
          console.log('admin data ', localStorage.getItem('admin'));
        }

        return response.data;
      });
  };

  /* ============================================================= GET CURRENT ADMIN ============================================================= */
  getCurrentAdmin = () => {
    return JSON.parse(localStorage.getItem('admin'));
  };
}

export default new AuthService();
