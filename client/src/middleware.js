import { TEACHER_LOGIN_SUCCESS, TEACHER_LOGOUT } from './actions/teachers_a'
import { localStorageJwtKey } from './constants'

export const storeJwt = store => next => action => {
  try {
    if (action.type === TEACHER_LOGIN_SUCCESS) {
      localStorage.setItem(localStorageJwtKey, action.payload.jwt)
    }
    if (action.type === TEACHER_LOGOUT) {
      localStorage.removeItem(localStorageJwtKey)
    }
  }
  catch (e) {
    console.log(`Interaction with LocalStorage went wrong`, e)
  }
  next(action)
}