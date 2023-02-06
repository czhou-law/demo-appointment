import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  NotFoundException,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { getDay, differenceInCalendarDays, parseISO } from 'date-fns';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FindAppointmentDto } from './dto/find-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(@Query() query: FindAppointmentDto) {
    return this.appointmentService.findAll(query);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const data = await this.appointmentService.findById(id);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    this._validateAppointmentDate(createAppointmentDto.appointmentDate);
    return this.appointmentService.create(createAppointmentDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateAppointmentDto) {
    this._validateAppointmentDate(updateUserDto.appointmentDate);
    return this.appointmentService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentService.remove(+id);
  }

  private _validateAppointmentDate(isoDate) {
    const targetDate = parseISO(isoDate);
    const curDate = new Date();

    const day = getDay(curDate);
    const weekendGrace = (day === 5 && 2) || (day === 6 && 1) || 0;
    const dateRange =
      differenceInCalendarDays(targetDate, curDate) - weekendGrace;

    if (dateRange < 2 || dateRange > 21) {
      throw new BadRequestException([
        'Appointment have to be 2 business days in advance and cannot more than 3 weeks in advance',
      ]);
    }
  }
}
