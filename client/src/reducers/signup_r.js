import { TEACHER_SIGNUP_SUCCESS, TEACHER_SIGNUP_FAILED } from '../actions/teachers_a'

export default function (state = {}, {type, payload}) {
	switch(type) {
    case TEACHER_SIGNUP_SUCCESS:
      return {
        success: true
      }

    case TEACHER_SIGNUP_FAILED:
      return {
        error: payload
      }

		default:
      return state
	}
}
