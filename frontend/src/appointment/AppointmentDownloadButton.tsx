import Button from 'react-bootstrap/Button';
import { createEvent } from 'ics';
import { Appointment } from './AppointmentModel';
import dateParseISO from 'date-fns/parseISO';
import dateFormat from 'date-fns/format';


type AppoinmentDownloadButtonProps = {
  appointment: Appointment,
  children?: string,
}

function createICS(appointment:Appointment): Promise<File> {
  return new Promise((resolve, reject) => {
    const dt = dateParseISO(appointment.appointmentDate);
    const fileName = 'Appoinment-' + dateFormat(dt, 'yyyy-MM-dd-hh-mm') + '.ics';

    createEvent({
      start: [dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes()],
      title: 'Appointment',
      duration: { hours: 1 }
    }, (error, value) => {
      if (error) reject(error); 

      resolve(new File([value], fileName, { type: 'plain/text' }))
    });
  })
}

function AppointmentDownloadButton({ appointment }: AppoinmentDownloadButtonProps) {
  async function handleDownload() {
    const file = await createICS(appointment);
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = file.name;
    
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    URL.revokeObjectURL(url);
  }
  
  return (
    <Button variant='success' className='me-2' onClick={handleDownload}>Download</Button>
  );
}

export default AppointmentDownloadButton;