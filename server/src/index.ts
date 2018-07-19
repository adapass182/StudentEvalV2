import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'

import BatchController from './controllers/batch_c'
import EvaluationController from './controllers/evaluation_c'
import StudentController from './controllers/student_c'
import TeacherController from './controllers/teacher_c'
import LoginController from './controllers/xlogin_c'

const port = process.env.PORT || 4000

const app = createKoaServer({
  cors: true,
  controllers: [
    BatchController,
    EvaluationController,
    StudentController,
    TeacherController,
    LoginController
  ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Hi Adam, I'm listening on port ${port} and you can find me in server/src/index.ts`))
  )
  .catch(err => console.error(err))