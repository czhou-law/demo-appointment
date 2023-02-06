import { IsEmail, IsOptional } from 'class-validator';

export class FindAppointmentDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
