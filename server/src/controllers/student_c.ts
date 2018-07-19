import {JsonController, Get, NotFoundError, Param, BadRequestError, Post, Delete, Put, HttpCode, Body, BodyParam} from 'routing-controllers'
import Student from '../entities/Student_e';
import Batch from '../entities/Batch_e';

@JsonController()
export default class StudentController {

  @Get('/students')
  async getAllStudents()
  {
    const allStudents = await Student.find()
    if (!allStudents) throw new NotFoundError(`Uh-oh... I can't find a Students table! Find me in the student controller.`)
    return { allStudents }
  }

  @Get('/students/:id')
  async getStudentById(
    @Param('id') id: number
  ) {
    const student = await Student.findOne(id)
    if (!student) throw new BadRequestError(`Sorry, I can't find a student with that ID. Please make sure the ID is correct, or GET without an ID to retrieve a list of all students. You can find me in the student controller`)
    return { student }
  }

  @Post('/students')
  @HttpCode(201)
  async addStudent(
    @Body() newStudent: Student,
    @BodyParam('batchId', { required: true }) batchId: Partial<Batch>
  ) {
    const thisStudentBatch = await Batch.findOne(batchId)
    if(!thisStudentBatch) throw new BadRequestError(`Cannot find batch number ${batchId} - you can find a list of existing batches with a GET request to /batches, or create a new batch.`)
    if(thisStudentBatch instanceof Batch) {
      newStudent.batch = thisStudentBatch
      const studentEntity = Student.create(newStudent)
      return studentEntity.save()
    }
  }

  @Put('/students/:id')
  async editStudent(
    @Param('id') id: number,
    @Body() update: Partial<Student>
  ) {
    const studentToUpdate = await Student.findOne(id)
    if (!studentToUpdate) throw new NotFoundError(`Sorry, I can't find a student with id ${id}!`)
    const updatedStudent = Student.merge(studentToUpdate, update)
    return updatedStudent.save()
  }

  @Delete('/students/:id')
  async deleteStudent(
    @Param('id') id: number
  ) {
    const studentToDelete = await Student.findOne(id)
    if (!studentToDelete) throw new NotFoundError(`Sorry, I can't find a student with id ${id}!`)
    await studentToDelete.remove()
    return 'Success!'
  }

}