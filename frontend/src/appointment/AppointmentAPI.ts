import Axios, { AxiosInstance } from 'axios';
import { Appointment } from './AppointmentModel';

interface IQueryAppointment {
  email: string
}

class AppointmentAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = Axios.create({
      baseURL: 'http://localhost:3001/v1'
    });
  }

  getAll(query?: IQueryAppointment) {
    return this.api.get<Appointment[]>('/appointment', { params: query })
      .then(({ data }) => data)
      .catch(error => {
        if (error.response?.status === 400) {
          throw new Error(error.response.data?.message.join(', '));
        } else {
          throw new Error('500 - Internal Server Error');
        }
      });
  }

  getById(id: number) {
    return this.api.get<Appointment>(`/appointment/${id}`)
      .then(({ data }) => data);
  }

  post(data: Appointment) {
    return this.api.post<Appointment>('/appointment', data)
      .catch(error => {
        if (error.response?.status === 400) {
          throw new Error(error.response.data?.message.join(', '));
        } else {
          throw new Error('500 - Internal Server Error');
        }
      });
  }

  update(data: Appointment) {
    return this.api.patch(`/appointment/${data.id}`, data)
      .catch(error => {
        if (error.response?.status === 400) {
          throw new Error(error.response.data?.message.join(', '));
        } else {
          throw new Error('500 - Internal Server Error');
        }
      });
  }

  remove(id: number) {
    return this.api.delete(`/appointment/${id}`)
      .catch(() => {
          throw new Error('500 - Internal Server Error');
      })
  }
}


const appointmentAPI = new AppointmentAPI();

export default appointmentAPI;
