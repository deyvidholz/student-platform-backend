import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column({ unique: true })
  studentId: string;

  @Column({ unique: true })
  document: string;
}
