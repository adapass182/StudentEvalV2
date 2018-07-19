import {TEACHER_LOGIN_FAILED} from '../actions/teachers_a'

export default function (state = {}, {type, payload}) {
	switch (type) {
		case TEACHER_LOGIN_FAILED:
			return {
				error: payload
			}
		default:
      		return state
	}
}
