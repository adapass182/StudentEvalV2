import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import EvaluationEntity from './Evaluation_e'
import * as bcrypt from 'bcrypt'

@Entity()
export default class Teacher extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:true})
  name: string

  @Column('text', {nullable:false})
  email: string

  @Column('text', {nullable:false})
  @Exclude({toPlainOnly:true})
  password: string

  async hashPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  validatePassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  @OneToMany(_ => EvaluationEntity, evaluation => evaluation.teacher)
    evaluations: EvaluationEntity[]

}