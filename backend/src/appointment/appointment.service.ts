import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindAppointmentDto } from './dto/find-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  findAll(findOptions: FindAppointmentDto): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: findOptions });
  }

  findById(id: number) {
    return this.appointmentRepository.findOneBy({ id });
  }

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentRepository.save(createAppointmentDto);
  }

  update(id: number, updateAppointDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointDto);
  }

  remove(id: number) {
    return this.appointmentRepository.softDelete(id);
  }
}
