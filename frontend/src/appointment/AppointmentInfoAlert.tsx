import Alert from 'react-bootstrap/Alert';
import AppointmentDownloadButton from './AppointmentDownloadButton';
import { Appointment } from './AppointmentModel';

export interface IAppointmentInfo {
  type: string,
  message: string,
  appointment: Appointment
}

function AppointmentInfoAlert({ type, message, appointment }: IAppointmentInfo) {
  if (type === 'error') {
    return (
      <Alert key='danger' variant='danger'>
        <Alert.Heading>Error</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
    );
  } else {
    return (
      <Alert key='success' variant='success'>
        <Alert.Heading>
          {message}
        </Alert.Heading>
        <hr />
        <div className='d-flex'>
          <AppointmentDownloadButton appointment={appointment}>Add to Calendar</AppointmentDownloadButton>
        </div>
      </Alert>
    )
  }
}

export default AppointmentInfoAlert;