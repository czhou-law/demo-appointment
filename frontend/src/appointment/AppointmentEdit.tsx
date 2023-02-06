import { useState, useEffect } from 'react';
import { Appointment } from './AppointmentModel';
import AppointmentAPI from './AppointmentAPI';
import { useParams, useNavigate  } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';

function AppointmentEdit() {
  const navigate = useNavigate();
  const { id } = useParams ();
  const [appointment, setAppointment] = useState<Appointment>();

  useEffect(() => {
    const editAppointment = async () => {
      if (id) {
        try {
          const data = await AppointmentAPI.getById(+id);
          setAppointment(data);
        } catch {
          navigate('/appointment')
        }
      }
    }
    editAppointment();
  }, [id, navigate])

  return (
    <>
      <AppointmentForm appointment={appointment}></AppointmentForm>
    </>
  );
}

export default AppointmentEdit;