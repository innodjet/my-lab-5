import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./form";
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
    Gender: "",
    AreasOfRecommendation: []
  };
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState([initData]);

  const handleInputEvent = event => {
    event.preventDefault();
    const newData = formData.map(el => {
      if (parseInt(event.target.id) === 1) {
        el.FirstName = event.target.value;
      } else if (parseInt(event.target.id) === 2) {
        // Last Name
        el.LastName = event.target.value;
      } else if (parseInt(event.target.id) === 3) {
        // Date Of Birth
        el.DateOfBirth = event.target.value;
      } else if (parseInt(event.target.id) === 4) {
        // Email
        el.Email = event.target.value;
      } else if (parseInt(event.target.id) === 5) {
        // Address
        el.Address = event.target.value;
      } else if (parseInt(event.target.id) === 6) {
        // Contact Number
        el.ContactNumber = event.target.value;
      } else if (parseInt(event.target.id) === 7) {
        // Gender
        el.Gender = event.target.value;
      } else if (parseInt(event.target.id) === 8) {
        console.log(event.target.value);
        // Areas of Recommendation
        const temp = document
          .getElementsByClassName("filter-option-inner-inner")[0]
          .innerHTML.toString()
          .split(",");
        if (
          temp.length === 1 &&
          temp[0] === "Choose one or more of the following..."
        ) {
          el.AreasOfRecommendation = [];
        } else {
          el.AreasOfRecommendation = temp;
        }
      }
      return el;
    });
    setFormData(newData);
    validateData(parseInt(event.target.id));
  };

  const validateData = targetId => {
    setErrorMessage("");
    const {
      FirstName,
      LastName,
      DateOfBirth,
      Email,
      Address,
      ContactNumber,
      Gender,
      AreasOfRecommendation
    } = formData[0];

    // Check if fields are empty
    if (targetId === 1 && FirstName === "") {
      // First Name
      setErrorMessage("Please enter a First Name");
    } else if (targetId === 2 && LastName === "") {
      // Last Name
      setErrorMessage("Please enter a Last Name");
    } else if (targetId === 3 && DateOfBirth === "") {
      // Date Of Birth
      setErrorMessage("Please select a Date Of Birth");
    } else if (targetId === 4 && Email === "") {
      // Email
      setErrorMessage("Please enter your Email");
    } else if (targetId === 5 && Address === "") {
      // Address
      setErrorMessage("Please enter your Address");
    } else if (targetId === 6 && ContactNumber === "") {
      // Contact Number
      setErrorMessage("Please enter your Contact Number");
    } else if (targetId === 7 && Gender === "") {
      // Gender
      setErrorMessage("Please select your Gender");
    } else if (targetId === 8 && AreasOfRecommendation === "") {
      // Areas of Recommendation
      setErrorMessage("Please select an Areas of Recommendation");
    }

    // Validate Email
    if (targetId === 4 && Email !== "" && validator.isEmail(Email) === false) {
      // Email
      setErrorMessage("Please enter a valid Email");
    }

    // Validate phone number
    if (
      targetId === 6 &&
      ContactNumber !== "" &&
      validator.isMobilePhone(ContactNumber) === false
    ) {
      // Contact Number
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
    setProgress(countNumberofFieldFilled * (100 / getKeys.length));
  };

  const formHtmlElement = data.map(el => {
    return (
      <Form
        el={el}
        key={el.id}
        handleInputEvent={handleInputEvent}
        formData={formData}
      ></Form>
    );
  });

  // Feed data for csv creation
  let rows = formData;

  const generateCsvRows = () => {
    // Reset the form
    setFormData([initData]);
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

          <div className="card-body">
            {formHtmlElement}
            <CsvCreator filename="submissions" rows={rows}>
              <button
                type="button"
                className="btn btn-lg btn-primary float-right"
                disabled={progress < 100 ? true : false}
                onClick={generateCsvRows}
              >
                Submit
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
  handleInputEvent: PropTypes.func,
  formData: PropTypes.array
};

export default Body;
