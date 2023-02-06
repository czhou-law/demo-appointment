import { IsISO8601 } from 'class-validator';
import { IsBusinessDateTime } from 'src/validator/is-business-datetime';

export class UpdateAppointmentDto {
  @IsISO8601()
  @IsBusinessDateTime()
  appointmentDate: Date;
}
