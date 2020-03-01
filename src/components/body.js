import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import validator from "validator";
import CsvCreator from "react-csv-creator";

const Body = ({ data }) => {
  const initData = {
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Email: "",
    Address: "",
    ContactNumber: "",
    Gender: ""
  };
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState([initData]);
  const [selectedValue, setSelectedValue] = useState([]);
  let rows = []; // csv creation row data

  useEffect(() => {
    updateProgressBar();
  });

  const multiSelectDataToDisplay = data => {
    let result = [];
    data.forEach((el, index) => {
      result.push({
        name: el,
        id: index
      });
    });
    return result;
  };

  const objectMap = {
    "First Name": "FirstName",
    "Last Name": "LastName",
    "Date of Birth": "DateOfBirth",
    Email: "Email",
    Address: "Address",
    "Contact Number": "ContactNumber",
    Gender: "Gender"
  };

  const handleInputEvent = event => {
    event.preventDefault();
    const newData = formData.map(el => {
      let rObj = el;
      rObj[objectMap[event.target.name]] = event.target.value;
      return rObj;
    });
    setFormData(newData);
    validateData(event.target);
  };

  const onSelect = selectedList => {
    setSelectedValue(selectedList);
    validateData({
      id: 8,
      value: selectedList,
      name: "Areas of Recommendation"
    });
  };

  const onRemove = selectedList => {
    setSelectedValue(selectedList);
    const value = selectedList.length === 0 ? "" : selectedList;
    validateData({ id: 8, value: value, name: "Areas of Recommendation" });
  };

  const formHtmlElement = data.map(el => {
    return (
      <Form
        el={el}
        key={el.id}
        handleInputEvent={handleInputEvent}
        formData={formData}
        multiSelectDataToDisplay={multiSelectDataToDisplay}
        onSelect={onSelect}
        onRemove={onRemove}
        selectedValue={selectedValue}
      ></Form>
    );
  });

  const validateData = target => {
    setErrorMessage("");
    if (target.value === "") {
      setErrorMessage(`${target.name} is required to submit the form`);
    } else if (
      parseInt(target.id) === 4 &&
      validator.isEmail(target.value) === false
    ) {
      setErrorMessage("Please enter a valid Email");
    } else if (
      parseInt(target.id) === 6 &&
      validator.isMobilePhone(target.value) === false
    ) {
      setErrorMessage("Please enter a valid Contact Number");
    }
    updateProgressBar();
  };

  const updateProgressBar = () => {
    const getKeys = Object.keys(formData[0]);
    let countNumberofFieldFilled = 0;
    getKeys.forEach(el => {
      if (formData[0][el] !== "") {
        countNumberofFieldFilled++;
      }
    });
    if (selectedValue.length > 0) {
      countNumberofFieldFilled++;
    }
    setProgress(countNumberofFieldFilled * (100 / (getKeys.length + 1)));
  };

  const generateCsvRows = () => {
    // Prepare the data for csv generation
    const areaOfRecommendationSelected = [];
    selectedValue.forEach(el => {
      areaOfRecommendationSelected.push(el.name);
    });
    formData[0]["areaOfRecommendations"] = areaOfRecommendationSelected;
    // Feed data for csv creation
    rows.push(formData[0]);
    // Reset the form
    setFormData([initData]);
    setSelectedValue([]);
    setProgress(0);
  };

  return (
    <>
      <div className="container" id="progress">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            data-testid="form-progress-bar"
          ></div>
        </div>
      </div>

      <div className="container" id="body">
        <div className="card">
          {errorMessage !== "" ? (
            <div className="card-header">
              <div className="alert alert-primary" role="alert">
                <i className="fas fa-exclamation-triangle"></i> {errorMessage}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="card-body">{formHtmlElement}</div>
          <div className="card-body">
            <CsvCreator filename="submissions" rows={rows}>
              <button
                type="button"
                className="btn btn-lg btn-primary float-right"
                disabled={progress < 100 ? true : false}
                onClick={generateCsvRows}
                data-testid="submit-form-id"
              >
                <i class="fas fa-paper-plane"></i> Submit
              </button>
            </CsvCreator>
          </div>
        </div>
      </div>
    </>
  );
};

Body.propTypes = {
  data: PropTypes.array,
  el: PropTypes.object,
  handleInputEvent: PropTypes.func,
  formData: PropTypes.array,
  multiSelectDataToDisplay: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  selectedValue: PropTypes.array
};

export default Body;
