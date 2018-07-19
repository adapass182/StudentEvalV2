import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import BatchEntity from './Batch_e'
import EvaluationEntity from './Evaluation_e'

@Entity()
export default class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  firstName: string

  @Column('text', { nullable: false })
  lastName: string

  @Column('text', { nullable: true })
  avatar: string

  @ManyToOne(_ => BatchEntity, batch => batch.students)
  batch: BatchEntity

  @OneToMany(_ => EvaluationEntity, evaluation => evaluation.student, { eager: true })
  evaluations: EvaluationEntity[]

}