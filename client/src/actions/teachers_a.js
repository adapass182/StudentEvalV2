import {baseUrl} from '../constants'
import * as request from 'superagent'

export const TEACHER_LOGIN_FAILED = 'TEACHER_LOGIN_FAILED'
export const TEACHER_LOGIN_SUCCESS = 'TEACHER_LOGIN_SUCCESS'
export const TEACHER_LOGOUT = 'TEACHER_LOGOUT'
export const TEACHER_SIGNUP_FAILED = 'TEACHER_SIGNUP_FAILED'
export const TEACHER_SIGNUP_SUCCESS = 'TEACHER_SIGNUP_SUCCESS'

export const logout = () => ({
  type: TEACHER_LOGOUT
})

export const login = (email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/login`)
    .send({email, password})
    .then(result => {
      dispatch({
        type: TEACHER_LOGIN_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
    	if (err.status === 400) {
    		dispatch({
    			type: TEACHER_LOGIN_FAILED,
    			payload: err.response.body.message || 'Unknown error'
    		})
    	}
    	else {
    		console.error(err)
    	}
    })

export const signup = (email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/teachers`)
		.send({ email, password })
		.then(result => {
			dispatch({
				type: TEACHER_SIGNUP_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: TEACHER_SIGNUP_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
		})