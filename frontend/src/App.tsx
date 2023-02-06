import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './common/header';
import AppointmentForm from './appointment/AppointmentForm';
import AppointmentList from './appointment/AppointmentList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentEdit from './appointment/AppointmentEdit';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path='/appointment' element={<AppointmentForm />} />
              <Route path='/appointment/:id' element={<AppointmentEdit />} />
              <Route path='/appointment/search' element={<AppointmentList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
