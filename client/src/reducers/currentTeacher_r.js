import {TEACHER_LOGIN_SUCCESS, TEACHER_LOGOUT} from '../actions/teachers_a'
import {localStorageJwtKey} from '../constants'

let initialState = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    initialState = { jwt }
  }
}
catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case TEACHER_LOGIN_SUCCESS:
			return payload

    case TEACHER_LOGOUT:
      return null

		default:
      return state
	}
}
