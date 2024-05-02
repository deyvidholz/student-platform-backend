import dataSource from '../../connection';
import { Student } from './student.entity';

export const studentRepository = dataSource.getRepository(Student);
