import { IsISO8601, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { IsBusinessDateTime } from 'src/validator/is-business-datetime';

export class CreateAppointmentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  firstName: string;

  @IsISO8601()
  @IsBusinessDateTime()
  appointmentDate: Date;

  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;
}
