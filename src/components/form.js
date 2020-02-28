import React from "react";
import PropTypes from "prop-types";

const displayOption = (el, id) => {
  return (
    <option value={el} key={id}>
      {el}
    </option>
  );
};

const Form = ({ el, handleInputEvent, formData }) => {
  let element;
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Email,
    Address,
    Gender,
    ContactNumber
  } = formData[0];
  const toltips = el.description ? (
    <a href="/#" data-toggle="tooltip" title={el.description}>
      <i className="fas fa-info-circle"></i>
    </a>
  ) : (
    ""
  );

  switch (el.type) {
    case "short-text":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <input
              type="text"
              className="form-control"
              id={el.id}
              name={el.name}
              key={el.id}
              placeholder=""
              value={el.id === 1 ? FirstName : LastName}
              onChange={handleInputEvent}
            ></input>
          </div>{" "}
        </>
      );
      break;
    case "date":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <input
              type="date"
              className="form-control"
              name={el.name}
              id={el.id}
              placeholder=""
              value={DateOfBirth}
              onChange={handleInputEvent}
            ></input>
          </div>{" "}
        </>
      );
      break;
    case "email":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <input
              type="email"
              className="form-control"
              id={el.id}
              name={el.name}
              value={Email}
              placeholder=""
              onChange={handleInputEvent}
            ></input>
          </div>{" "}
        </>
      );
      break;
    case "long-text":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <textarea
              className="form-control"
              name={el.name}
              id={el.id}
              rows="3"
              value={Address}
              onChange={handleInputEvent}
            ></textarea>
          </div>{" "}
        </>
      );
      break;
    case "phone-number":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <input
              type="text"
              className="form-control"
              name={el.name}
              id={el.id}
              placeholder=""
              value={ContactNumber}
              onChange={handleInputEvent}
            ></input>
          </div>{" "}
        </>
      );
      break;
    case "dropdown":
      element = (
        <>
          {" "}
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <select
              className="form-control"
              name={el.name}
              id={el.id}
              value={Gender}
              onChange={handleInputEvent}
            >
              <option value="">Please select</option>
              {el.options.map((ol, index) => {
                return displayOption(ol, index);
              })}
            </select>
          </div>{" "}
        </>
      );
      break;
    case "multi-select":
      element = (
        <>
          <div className="form-group" key={el.id}>
            <label>{el.name}</label> {toltips}
            <select
              className="form-control selectpicker"
              title="Choose one or more of the following..."
              name={el.name}
              id={el.id}
              onChange={handleInputEvent}
              multiple
            >
              {el.options.map((ol, index) => {
                return displayOption(ol, index + 10);
              })}
            </select>
          </div>
        </>
      );
      break;
    default:
      element = "";
      break;
  }
  return element;
};

Form.propTypes = {
  el: PropTypes.object.isRequired,
  handleInputEvent: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired
};

export default Form;
