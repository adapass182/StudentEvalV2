import {JsonController, Post, Body, BadRequestError} from 'routing-controllers'
import { IsString } from 'class-validator';
import { sign } from '../jwt'
import Teacher from '../entities/Teacher_e';


class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

    @Post('/login')
    async authenticate(
      @Body() { email, password }: AuthenticatePayload
    ) {
      const teacher = await Teacher.findOne({ where: { email } })
      if (!teacher || !teacher.id) throw new BadRequestError(`Sorry, I can't find any teacher accounts that use this email address: ${email}`)
      if (!(await teacher.validatePassword(password))) throw new BadRequestError('Incorrect password')

      const jwt = sign({
        id: teacher.id,
        email: teacher.email
      })
      return { jwt }
    }

}