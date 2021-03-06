import React, { useState } from "react";
import { uuid } from "uuidv4";
import PropTypes from "prop-types";

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
      <h3 data-testid="title">Create appointment</h3>
      <form action="" onSubmit={submitAppointment}>
        <label htmlFor="">Pet Name</label>
        <input
          data-testid="pet"
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="..."
          onChange={handleChange}
          value={pet}
        />
        <label htmlFor="">Owner Name</label>
        <input
          data-testid="owner"
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="..."
          onChange={handleChange}
          value={owner}
        />
        <label htmlFor="">Appointment Date</label>
        <input
        data-testid="date"
          type="date"
          onChange={handleChange}
          name="date"
          className="u-full-width"
          value={date}
        />
        <label htmlFor="">Appointment Hour</label>
        <input
        data-testid="time"
          type="time"
          onChange={handleChange}
          name="hour"
          className="u-full-width"
          value={hour}
        />
        <label htmlFor="">Synthoms</label>
        <textarea
        data-testid="symptoms"
          name="symptoms"
          cols="30"
          rows="10"
          className="u-full-width"
          onChange={handleChange}
          value={symptoms}
        ></textarea>

        <button
          data-testid="submitButton"
          type="submit"
          className="u-full-width button-primary"
        >
          make an appointment
        </button>
      </form>
      {error.state ? (
        <div data-testid="alert" className="error">
          {error.message}
        </div>
      ) : (
        void 0
      )}
    </div>
  );
};

Form.propTypes = {
  addAppointment: PropTypes.func,
};

export default Form;
