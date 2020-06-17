import React, {useState} from 'react';
import './Main.css';
import Form from '../form/Form';

function Main() {

  const [appointments, updateAppointments] = useState([]);

  const addAppointment = appointment => updateAppointments([...appointments, appointment]);

    return (
      <div className="main">
          <Form
            addAppointment = {addAppointment}
          ></Form>
      </div>
    );
  }
  
  export default Main;