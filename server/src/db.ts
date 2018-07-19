import { createConnection } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import BatchEntity from './entities/Batch_e'
import EvaluationEntity from './entities/Evaluation_e'
import StudentEntity from './entities/Student_e'
import TeacherEntity from './entities/Teacher_e'

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's';
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

export default () =>
  createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
      entities: [
        BatchEntity,
        EvaluationEntity,
        StudentEntity,
        TeacherEntity
      ],
      synchronize: true,
      logging: true,
      namingStrategy: new CustomNamingStrategy()
  })
  .then(_ => console.log("Hi Adam, I'm connected to Postgres with TypeORM and you can find me in server/src/db.ts"))