import { Repository } from 'typeorm';
import { BaseService } from '../../global/base-service';
import { Student } from './student.entity';
import { studentRepository } from './student.repository';


export class StudentService extends BaseService {
  protected repository: Repository<Student> = studentRepository;
}
