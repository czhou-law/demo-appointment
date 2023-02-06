import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dateFormat from 'date-fns/format';
import dateParse from 'date-fns/parse';
import dateParseISO from 'date-fns/parseISO';
import { Appointment } from './AppointmentModel';
import AppointmentAPI from './AppointmentAPI';
import AppointmentInfoAlert, { IAppointmentInfo } from './AppointmentInfoAlert';

type AppointmentFormProps = {
  appointment?: Appointment
}

interface IAppointmentForm extends Appointment {
  date: string,
  time: string
}



function getDefaultAppointment() {
  return {
    appointmentDate: '',
    date: dateFormat(new Date(), 'yyyy-MM-dd'),
    time: dateFormat(new Date(), 'HH:mm'),
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }
}

function AppointmentForm({ appointment: appmnt }: AppointmentFormProps) {
  const [info, setInfo] = useState<IAppointmentInfo>();
  const [appointment, setAppointment] = useState<IAppointmentForm>(getDefaultAppointment());
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (appmnt) {
      const dt = dateParseISO(appmnt.appointmentDate);
      const editAppointment = {
        ...appmnt,
        date: dateFormat(dt, 'yyyy-MM-dd'),
        time: dateFormat(dt, 'HH:mm')
      }

      setAppointment(editAppointment)
      setEditMode(true)
    }
  }, [appmnt])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.id;
    if (Object.keys(appointment).includes(key)) {
      setAppointment({
        ...appointment,
        [key]: e.currentTarget.value
      })
    }
  }
  
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.currentTarget.id;
    if (Object.keys(appointment).includes(key)) {
      setAppointment({
        ...appointment,
        [key]: e.currentTarget.value
      })
    }
  }

  const resetForm = () => {
    setAppointment(getDefaultAppointment())

    setInfo(undefined)
  }

  const submitAppointment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      appointment.appointmentDate = dateParse(
        appointment.date + ' ' + appointment.time, 
        'yyyy-MM-dd HH:mm', 
        new Date()).toISOString()

      if (appointment.id) {
        await AppointmentAPI.update(appointment);
      } else { 
        await AppointmentAPI.post(appointment);
        resetForm();
      }


      setInfo({ type: 'info', message: 'Thank you for making appointment with us', appointment: appointment })
    } catch (err) {
      if (err instanceof Error) {
        setInfo({ type: 'error', message: err.message, appointment: appointment })
      }
    }
  }

  return (
    <>
    { info && <div className='mt-3'><AppointmentInfoAlert 
      type={info.type} 
      message={info.message} 
      appointment={info.appointment} /></div> }
    <Form onSubmit={submitAppointment} onReset={resetForm}>
      <h2 className='mb-3 mt-3'>Form</h2>
      <Row>
        <Form.Group as={Col} lg={2} md={12} className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Select 
            id='title'
            value={appointment.title}
            onChange={onChangeSelect}
            disabled={editMode}
            >
            <option value='Mr'>Mr</option>
            <option value='Ms'>Ms</option>
            <option value='Mrs'>Mrs</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group as={Col} lg={5} md={12} className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='input' 
            id='lastName'
            value={appointment.lastName} 
            onChange={onChange}
            disabled={editMode}
            />
        </Form.Group>
        
        <Form.Group as={Col} lg={5} md={12} className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='input'
            id='firstName'
            value={appointment.firstName} 
            onChange={onChange}
            disabled={editMode}
            />
        </Form.Group>
      </Row>

      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email'
          id='email'
          value={appointment.email} 
          onChange={onChange}
          disabled={editMode}
          />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Phone (e.g. +6011123456789)</Form.Label>
        <Form.Control type='tel'
          id='phone'
          value={appointment.phone} 
          onChange={onChange}
          disabled={editMode}
          />
      </Form.Group>
      
      <Form.Group className='mb-3'>
        <Form.Label>Date & Time</Form.Label>
        <Row>
          <Col>
            <Form.Control type='date'
              id='date'
              value={appointment.date} 
              onChange={onChange}/>
          </Col>
          <Col>
            <Form.Control type='time'
              id='time'
              value={appointment.time} 
              onChange={onChange}/>
          </Col>
        </Row>
      </Form.Group>

      <Button className='me-2' variant='primary' type='submit'>Send</Button>
      <Button variant='secondary' type='reset'>Clear</Button>
    </Form>
    </>
   );
}

export default AppointmentForm;