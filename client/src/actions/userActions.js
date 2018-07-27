// REF. Examples
import {
  ADD_USER,
  GET_USERS,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ERRORS
} from './typesActions';

import axios from 'axios';
import {setAuthToken} from './../helpers'
import jwtDecode from 'jwt-decode';



// Add Course
export const addUser = userData => dispatch => {
  axios.post('/api/user/create', userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: err.response.data
      })
    );
};


// Get Users
export const getUsers = () => dispatch => {
  axios.get('/api/user/')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: null
      })
    );
};


export const setUser = userData => {
  return {
    type: LOGIN_USER,
    payload: userData
  }
}



// Delete User
export const deleteUser = userId => dispatch => {
  axios.delete(`/api/user/delete/${userId}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: null
      })
    );
};


// Login User
export const loginUser = userData => dispatch => {
  axios.post('/api/user/login', userData)
    .then(res =>{
      let token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      let decodedUser = jwtDecode(token)
      dispatch(setUser(decodedUser))
    })
    .catch(err =>
      dispatch({
        type: ERRORS,
        payload: err.response.data
      })
    );
};


// Logout User
export const logoutUser = () => dispatch => {

  console.log("cejlwnvlwenvlnw");
  setAuthToken(false)
  localStorage.removeItem('jwtToken');
  dispatch({
    type: LOGOUT_USER
  })


};