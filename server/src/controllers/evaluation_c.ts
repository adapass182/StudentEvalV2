import {JsonController, Get, NotFoundError, Param, BadRequestError, Post, BodyParam, Body, Put} from 'routing-controllers'
import Evaluation from '../entities/Evaluation_e';
import Student from '../entities/Student_e';
import Teacher from '../entities/Teacher_e';

@JsonController()
export default class EvaluationController {

  @Get('/evaluations')
  async getAllEvaluations()
  {
    const allEvaluations = await Evaluation.find()
    if (!allEvaluations) {
      throw new NotFoundError("Uh-oh... I can't find an evaluation table! Find me in server/src/controllers/evaluation_c.ts")
    } else {
    return { allEvaluations }
    }
  }

  @Get('/evaluations/:id')
  async getEvaluationById(
    @Param('id') id: number
    ) {
    const evaluation = await Evaluation.findOne(id)
    if (!evaluation) {
      throw new BadRequestError(`Sorry, I can't find an evaluation with that ID. Please make sure the ID is correct, or GET without an ID to retrieve a list of all evaluations. You can find me in the evaluation controller`)
    } else {
      return { evaluation }
    }
  }

  @Post('/evaluations')
  async createEvaluation(
    @Body() newEvaluation: Evaluation,
    @BodyParam('studentId', { required: true }) studentId: Partial<Student>,
    @BodyParam('teacherId', { required: true }) teacherId: Partial<Teacher>
  ) {
    const thisEvaluationStudent = await Student.findOne(studentId)
    const thisEvaluationTeacher = await Teacher.findOne(teacherId)
    if (thisEvaluationStudent instanceof Student && thisEvaluationTeacher instanceof Teacher) {
      newEvaluation.student = thisEvaluationStudent
      newEvaluation.teacher = thisEvaluationTeacher
      const evaluationEntity = await newEvaluation.save()
      return { evaluationEntity }
    }
  }

  @Put('/evaluations/:id')
  async editEvaluation(
    @Param('id') id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluationToUpdate = await Evaluation.findOne(id)
    if (!evaluationToUpdate) throw new NotFoundError(`Sorry, I can't find an evaluation with id ${id}!`)
    const updatedEvaluation = Evaluation.merge(evaluationToUpdate, update)
    return updatedEvaluation.save()
  }
}