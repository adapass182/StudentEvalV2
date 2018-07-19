import { RANDOM_QUESTION_CHOSEN, RANDOM_QUESTION_RESET } from '../actions/batches_a'

const initialState = false

export default function (state = initialState, {type}) {
	switch (type) {
		case RANDOM_QUESTION_CHOSEN:
            return true
        case RANDOM_QUESTION_RESET:
            return false
		default:
      		return false
	}
}
