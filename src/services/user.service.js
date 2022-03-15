import React from 'react';
import axios from 'axios';
import authHeader from './auth.header';

const API_URL = 'http://localhost:8080/api/test/';
export default function userService() {
  const getPublicContent = () => {
    return axios.get(API_URL + 'all');
  };

  const getUserBoard = () => {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  };

  const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  };
}
