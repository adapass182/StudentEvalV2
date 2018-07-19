import {GET_STUDENT_SUCCESS} from '../actions/students_a'

export default function (state = null, {type, payload}) {
	switch (type) {
		case GET_STUDENT_SUCCESS:
			let { student } = payload
			state = { ...student }
			console.log(`reducer: ` + state.id)
			return state
		default:
      		return state
	}
}
