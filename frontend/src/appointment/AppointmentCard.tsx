import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Appointment } from './AppointmentModel';
import parseISO from 'date-fns/parseISO';
import dateFormat from 'date-fns/format';
import AppointmentDownloadButton from './AppointmentDownloadButton';

interface AppointmentProps {
  onCancel: Function,
  onEdit: Function,
  appointment: Appointment
}

function AppointmentCard({ appointment, onCancel, onEdit }: AppointmentProps) {
  return ( 
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{dateFormat(parseISO(appointment.appointmentDate), 'yyyy-MM-dd HH:mm')}</Card.Title>
        <Card.Subtitle className='mb-3'>
            {appointment.title} {appointment.lastName} {appointment.firstName}
        </Card.Subtitle>
        <Card.Text>
          Email: {appointment.email}<br/>
          Phone: {appointment.phone}<br/>
        </Card.Text>
        <Button variant='primary' className='me-2' onClick={() => onEdit(appointment.id)}>Edit</Button>
        <AppointmentDownloadButton appointment={appointment}></AppointmentDownloadButton>
        <Button variant='danger' onClick={() => onCancel(appointment.id)}>Cancel</Button>
      </Card.Body>
    </Card>
   );
}

export default AppointmentCard;