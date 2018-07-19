import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import StudentEntity from './Student_e'
import TeacherEntity from './Teacher_e'

@Index("my_index_with_studentid_and_evaldate", ["student", "date"], { unique: true })
@Entity()
export default class Evaluation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable: true })
    comment: string

    @Column('date', { nullable: false })
    date: Date

    @Column('text', { nullable: false})
    color: string

    @ManyToOne(_ => StudentEntity, student => student.evaluations, {onDelete: "CASCADE"})
    student: StudentEntity

    @ManyToOne(_ => TeacherEntity, teacher => teacher.evaluations, {eager: true})
    teacher: TeacherEntity

}