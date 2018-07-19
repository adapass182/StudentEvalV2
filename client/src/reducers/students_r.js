import {CREATE_STUDENT_SUCCESS, UPDATE_STUDENT_SUCCESS, STUDENT_ACTION_NULL, DELETE_STUDENT_SUCCESS} from '../actions/students_a'
import { CREATE_BATCH_SUCCESS } from '../actions/batches_a';

const initialState = null

export default function (state = initialState, {type}) {
	switch (type) {
		case CREATE_STUDENT_SUCCESS:
			return true
		case UPDATE_STUDENT_SUCCESS:
			return true
		case CREATE_BATCH_SUCCESS:
			return true
		case DELETE_STUDENT_SUCCESS:
			return true
		case STUDENT_ACTION_NULL:
			return null
		default:
      		return state
	}
}
