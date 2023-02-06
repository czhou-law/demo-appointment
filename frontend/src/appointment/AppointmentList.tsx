import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AppointmentCard from './AppointmentCard';
import { useState, useRef } from 'react';
import AppointmentAPI from './AppointmentAPI';
import { Appointment } from './AppointmentModel';

function AppointmentList() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [error, setError] = useState<string>()

  const navigate = useNavigate();
  const findAppointment = async () => {
    const emailInput = emailRef.current?.value;
    if (emailInput) {
      try {
        const data = await AppointmentAPI.getAll({ email: emailInput });
        if (data.length) {
          setAppointments(data);
          setError('');
        } else {
          setError('No records found.')
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  }
  
  const cancelAppointment = async (id: any) => {
    if (id) {
      await AppointmentAPI.remove(id);
    }

    setAppointments(appointments.filter(appointment => appointment.id !== id))
  }

  const editAppointment = (id: any) => {
    if (id) {
      appointments.find(appointment => appointment.id === id)
      navigate(`/appointment/${id}`)
    }
  }

  const renderAppointments = () => {
    return appointments.map(appointment =>
      <Col key={appointment.id}><AppointmentCard 
        appointment={appointment} 
        onCancel={cancelAppointment}
        onEdit={editAppointment}
        /></Col>
    ) 
  }

  return (
    <Container>
      <Row className='mb-3'>
        <Col className='mt-3'>
        <Form>
          { error && <Alert variant='danger'>{error}</Alert>}
          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control ref={emailRef} type='email' />
          </Form.Group>

          <Button onClick={findAppointment}>Find</Button>
        </Form>
        </Col>
      </Row>
      <Row>{ renderAppointments() } </Row>
    </Container>
   ); 
}

export default AppointmentList;