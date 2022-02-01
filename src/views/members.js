import React from "react";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { webapibaseurl } from "../environment";
import * as Yup from "yup";
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";
import Grid from "@material-ui/core/Grid";
import { Button } from "reactstrap";
import DateFnsUtils from "@date-io/date-fns";
function Members(props) {
  const [selectValue, setValue] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [wedding_annivasery, setWeddingAnnivasery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [errorMSG, setErrorMessage] = useState(false);
  const [errorMSG2, setErrorMessage2] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let newDate = moment(date).format("L");

    setDob(newDate);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    let newDate = moment(date).format("L");

    setWeddingAnnivasery(newDate);
  };

  const member_url = `${webapibaseurl}/member`;

  function handleClose(event) {
    let data = { name: "example", type: "closed from child" };

    props.handleClose(event, data);
  }
  useEffect(() => {}, []);
  const FormSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    middlename: Yup.string(),
    lastname: Yup.string().required(),
    gender: Yup.string(),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    middlename: "",
    gender: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,

    onSubmit: (values) => {
      if (dob === "" ) {
        setErrorMessage(true);
      }
      else if(gender ==="")
      {
        setErrorMessage2(true);
      }
       else {
        values.dob = dob;
        values.wedding_annivasery = wedding_annivasery;
        values.gender = gender;

        axios.post(member_url, values).then((response) => {
          setErrorMessage(false);
          setErrorMessage2(false);
          handleClose();
        });

      }
    },
  });

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a new Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="form-group">
          <label>First Name</label>
          <input
            name="firstname"
            placeholder="firstname"
            className="form-control"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block" style={{ color: "red" }}>
                *{formik.errors.firstname}
              </div>
            </div>
          ) : null}
          <label>Middle Name</label>
          <input
            name="middlename"
            placeholder="middlename"
            className="form-control"
            {...formik.getFieldProps("middlename")}
          />

          <label>Last Name</label>
          <input
            name="lastname"
            placeholder="lastname"
            className="form-control"
            {...formik.getFieldProps("lastname")}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block" style={{ color: "red" }}>
                *{formik.errors.lastname}
              </div>
            </div>
          ) : null}
          <label>Gender</label>
          <select
            className="form-control"
            value={selectValue}
            onChange={(e) => {
              setValue(e.target.value);
              console.log(e.target.value);

              setGender(e.target.value);
            }}
          >
            <option defaultValue>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div style={{ paddingTop: 20 }}>
          {errorMSG2 ? (
            <div style={{ color: "red" }}>
              {" "}
              *Please select a gender
            </div>
          ) : (
            <></>
          )}
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid>
              <DatePicker
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={selectedDate}
                onChange={handleDateChange}
              />
              <DatePicker
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                style={{ marginLeft: 20 }}
                value={selectedDate2}
                onChange={handleDateChange2}
              />
            </Grid>
            <Grid container justifyContent="right"></Grid>
          </MuiPickersUtilsProvider>

          {errorMSG ? (
            <div style={{ color: "red" }}>
              {" "}
              *Please choose a valid date of birth
            </div>
          ) : (
            <></>
          )}

          <button
            type="submit"
            className="btn btn-sm btn-info"
            style={{ marginTop: 20 }}
          >
            Submit
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default Members;
