import { baseUrl } from '../constants'
import { isExpired } from '../jwt'
import { logout } from './teachers_a'
import * as request from 'superagent'

export const CREATE_BATCH_FAILED = 'CREATE_BATCH_FAILED'
export const CREATE_BATCH_SUCCESS = 'CREATE_BATCH_SUCCESS'
export const RANDOM_QUESTION_CHOSEN = 'RANDOM_QUESTION_CHOSEN'
export const RANDOM_QUESTION_RESET = 'RANDOM_QUESTION_RESET'
export const UPDATE_BATCHES = 'UPDATE_BATCHES'
export const UPDATE_BATCH_SUCCESS = 'UPDATE_BATCH_SUCCESS'
export const UPDATE_BATCHES_FAILED = 'UPDATE_BATCHES_FAILED'

const updateBatches = batches => ({
  type: UPDATE_BATCHES,
  payload: batches
})

const updateBatchSuccess = () => ({
  type: UPDATE_BATCH_SUCCESS
})

export const updateState = () => (dispatch) => {
  dispatch({type: RANDOM_QUESTION_CHOSEN})
}

export const resetState = () => (dispatch) => {
  setTimeout(dispatch({type: RANDOM_QUESTION_RESET}), 5000)
}

export const getBatches = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentTeacher) return null
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateBatches(result.body)))
    .catch(err => console.error(err))
}

export const updateBatch = (batchId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/batches/${batchId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(updateBatchSuccess()))
    .catch(err => console.error(err))
}

export const createBatch = (batchNumber, startDate, endDate) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentTeacher.jwt
  batchNumber = parseInt(Object.values(batchNumber), 0)
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/batches`)
    .set(`Authorization`, `Bearer ${jwt}`)
    .send({batchNumber, startDate, endDate})
    .then(result => {
      dispatch({
        type: UPDATE_BATCH_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_BATCHES_FAILED,
        payload: err.response.body.message || `Unkown error`,
      })
    })
}