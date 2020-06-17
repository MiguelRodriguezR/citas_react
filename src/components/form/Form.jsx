import React, { useState } from "react";
import { uuid } from "uuidv4";

const Form = ({ addAppointment }) => {
  const [appointment, updateAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    hour: "",
    symptoms: "",
  });
  

  const [error, showError] = useState({
    state: false,
    message: "none",
  });

  const { pet, owner, date, hour, symptoms } = appointment;

  const clearAppointment = () =>
    updateAppointment({
      pet: "",
      owner: "",
      date: "",
      hour: "",
      symptoms: "",
    });

  const handleChange = (e) =>
    updateAppointment({ ...appointment, [e.target.name]: e.target.value });

  const createError = (message) => showError({ state: true, message });

  const deleteActualError = () => showError({ state: false });

  const validate = () => {
    const empty = Object.values(appointment).findIndex((a) => a.trim() === "");
    if (empty >= 0) {
      createError(`${Object.keys(appointment)[empty]} is empty`);
      return false;
    }
    deleteActualError();
    return true;
  };

  const submitAppointment = (e) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    appointment.id = uuid();
    addAppointment(appointment);
    clearAppointment();
  };

  return (
    <div className="form">
      <h3>Create appointment</h3>
      <form action="" onSubmit={submitAppointment}>
        <label htmlFor="">Pet Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="..."
          onChange={handleChange}
          value={pet}
        />
        <label htmlFor="">Owner Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="..."
          onChange={handleChange}
          value={owner}
        />
        <label htmlFor="">Appointment Date</label>
        <input
          type="date"
          onChange={handleChange}
          name="date"
          className="u-full-width"
          value={date}
        />
        <label htmlFor="">Appointment Hour</label>
        <input
          type="time"
          onChange={handleChange}
          name="hour"
          className="u-full-width"
          value={hour}
        />
        <label htmlFor="">Synthoms</label>
        <textarea
          name="symptoms"
          cols="30"
          rows="10"
          className="u-full-width"
          onChange={handleChange}
          value={symptoms}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          make an appointment
        </button>
      </form>
      {error.state ? <div className="error">{error.message}</div> : void 0}
    </div>
  );
};

export default Form;
