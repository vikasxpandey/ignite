import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS} from './types';
import {SET_CURRENT_USER} from './types';

// Register User

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Login User - GET user token

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(
        res => {
        // Save to local storage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        })
    .catch(
        err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};

// Set logged in User

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// Log User Out

export const logoutUser = () => dispatch => {
    // Remove token
    localStorage.removeItem('jwtToken');
    // Remove auth header
    setAuthToken(false);
    // set current user to Empty
    dispatch(setCurrentUser({}));
}