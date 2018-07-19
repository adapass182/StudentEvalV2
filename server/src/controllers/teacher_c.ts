import {JsonController, Get, NotFoundError, Param, Post, HttpCode, Body, BadRequestError} from 'routing-controllers'
import Teacher from '../entities/Teacher_e';

@JsonController()
export default class TeacherController {

    @Get('/teachers')
    async getAllTeachers()
    {
      const allTeachers = await Teacher.find()
      if (!allTeachers) throw new NotFoundError(`Uh-oh... I can't find a Teachers table! Find me in the teacher controller.`)
      return { allTeachers }
    }

    @Get('/teachers/:id')
    async getTeacher(
      @Param('id') id: number
    ) {
      const teacher = await Teacher.findOne(id)
      if (!teacher) throw new BadRequestError(`Sorry, I can't find a techer with that ID. Please make sure the ID is correct, or GET without an ID to retrieve a list of all teachers. You can find me in the teacher controller`)
      return { teacher }
    }

    @Post('/teachers')
    @HttpCode(201)
    async addTeacher(
      @Body() newTeacher: Teacher
    ) {
      const {password, ...x} = newTeacher
      const teacherEntity = Teacher.create(x)
      await teacherEntity.hashPassword(password)
      return teacherEntity.save()
      }

}