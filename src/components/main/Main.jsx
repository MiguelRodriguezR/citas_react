import React, { useState, useEffect } from "react";
import "./Main.css";
import Form from "../form/Form";
import Card from "../card/Card";

function Main() {
  let storag = JSON.parse(localStorage.getItem("appointments"));
  storag = storag ? storag : [];

  const [appointments, updateAppointments] = useState(storag);

  useEffect(() => {
    let storag = JSON.parse(localStorage.getItem("appointments"));
    storag
      ? localStorage.setItem("appointments", JSON.stringify(appointments))
      : localStorage.setItem("appointments", JSON.stringify([]));
  }, [appointments]);

  const addAppointment = (appointment) =>
    updateAppointments([...appointments, appointment]);

  const deleteAppointment = (appointment) => {
    updateAppointments(appointments.filter((a) => a !== appointment));
  };

  let cardTitle =
    appointments.length > 0 ? "Your Appointments" : "No Appointments";

  return (
    <div className="main">
      <Form addAppointment={addAppointment}></Form>
      <div className="cards-container">
        <h3>{cardTitle}</h3>
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            appointment={appointment}
            deleteAppointment={deleteAppointment}
          ></Card>
        ))}
      </div>
    </div>
  );
}


export default Main;
