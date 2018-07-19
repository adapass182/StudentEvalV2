import { baseUrl } from '../constants'
import { isExpired } from '../jwt'
import { logout } from './teachers_a'
import * as request from 'superagent'

export const CREATE_STUDENT_FAILED = 'CREATE_STUDENT_FAILED'
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS'
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS'
export const GET_STUDENT_SUCCESS = 'GET_STUDENT_SUCCESS'
export const STUDENT_ACTION_NULL = 'STUDENT_ACTION_NULL'
export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS'

export const createStudent = (firstName, lastName, avatar, batchId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({firstName, lastName, avatar, batchId})
    .then(result => dispatch({
      type: CREATE_STUDENT_SUCCESS
    }))
    .catch(err => console.error(err))
}

export const getStudent = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(getThisStudent(result.body)))
    .catch(err => console.error(err))
}

const getThisStudent = student => ({
  type: GET_STUDENT_SUCCESS,
  payload: student
})

export const studentActionNull = () => ({
  type: STUDENT_ACTION_NULL
})

export const editStudent = (firstName, lastName, avatar, batchId, studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({studentId, firstName, lastName, avatar, batchId})
    .then(result => dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: result.body
    }))
    .catch(err => console.error(err))
}

export const deleteStudent = (studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({studentId})
    .then(result => dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: result.body
    }))
    .catch(err => console.error(err))
}

export const submitEvaluation = (color, comment, date, studentId, teacherId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({color, comment, date, studentId, teacherId})
    .then(result => dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: result.body
    }))
    .catch(err => console.error(err))
}