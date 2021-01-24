import React from "react";
import "./Card.css";

const Card = ({ appointment, deleteAppointment }) => {

  

  return (
    <div data-testid="appointment" className="card-container">
      {Object.keys(appointment).map((k) => k !== 'id' ? (
        <p>
          <strong>{k}: </strong>
          {appointment[k]}
        </p>
      ): null)}
      <button data-testid="deleteBtn" onClick={()=>deleteAppointment(appointment)} className="button delete u-full-width">
        Delete &times;
      </button>
    </div>
  );
};

export default Card;
