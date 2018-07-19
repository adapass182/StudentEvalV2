import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import StudentEntity from './Student_e'

@Unique(["batchNumber"])
@Entity()
export default class Batch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('integer', {nullable: false})
    batchNumber: number

    @Column('date', { nullable: false })
    startDate: Date

    @Column('date', { nullable: false})
    endDate: Date

    @OneToMany(_ => StudentEntity, student => student.batch, { eager: true })
    students: StudentEntity[]

}