import React from "react";
import PropTypes from "prop-types";
import { Multiselect } from "multiselect-react-dropdown";

const Form = ({
  el,
  handleInputEvent,
  formData,
  multiSelectDataToDisplay,
  onSelect,
  onRemove,
  selectedValue
}) => {
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
              {el.options.map(ol => {
                return (
                  <option value={ol} key={ol}>
                    {ol}
                  </option>
                );
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
            <Multiselect
              options={multiSelectDataToDisplay(el.options)}
              selectedValues={selectedValue}
              onSelect={onSelect}
              onRemove={onRemove}
              placeholder={selectedValue.length === 0 ? "Please select" : ""}
              showCheckbox={true}
              displayValue="name"
            />
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
  formData: PropTypes.array.isRequired,
  multiSelectDataToDisplay: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  selectedValue: PropTypes.array.isRequired
};

export default Form;
