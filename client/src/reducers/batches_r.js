import { UPDATE_BATCHES, UPDATE_BATCHES_FAILED } from '../actions/batches_a'

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_BATCHES:
      payload = payload.allBatches.sort((a, b) => a.id - b.id)

    return payload.reduce((batches, batch) => {
      batch.students.sort((a, b) => a.id - b.id)
      batch.students.reduce((students, student) => {
        const evaluations = student.evaluations.sort((a, b) => a.id - b.id)
        student.lastColor = evaluations.slice(-1)[0] ? evaluations.slice(-1)[0].color : null
        return student;
      }, {})

      batches[batch.id] = batch

      return batches
    }, {})
    case UPDATE_BATCHES_FAILED:
      return {
        error: payload
      }      

    default:
      return state
  }
}