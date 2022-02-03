import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { webapibaseurl } from "../environment";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";

function Contact(props) {

    const member_url = `${webapibaseurl}/contact`;
    function AlertFunc(event){
      let alertMsg = "Contact Created";
      props.AlertFunc(event, alertMsg)
    }

    function handleClose2(event) {
        
        let data = { name: 'example', type: 'closed from child' };
        props.handleClose2(event, data);
      }
    useEffect(()=>{
        
    },[])
    const FormSchema = Yup.object().shape({
        address: Yup.string().required(),
        phonenumber:Yup.string(),
        email: Yup.string().required(),
        nextofkin: Yup.string().required(),
        nextofkin_address: Yup.string().required(),
        nextofkin_phonenumber: Yup.string().required(),
      });
    
      const initialValues = {
        address: "",
        phonenumber: "",
        email: "",
        nextofkin_address:"",
        nextofkin_phonenumber:"",
        nextofkin:""
      };
    
      const formik = useFormik({
        initialValues,
        validationSchema: FormSchema,
       
        onSubmit: (values) => {
           
          values.member_id = props.member_id
     
         axios.post(member_url, values).then(
             ()=>{
               handleClose2()
               AlertFunc() 
             }
         )
        },
      });

    return (
        <Modal
show={props.show}
onHide={handleClose2}
backdrop="static"
keyboard={false}
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
  <Modal.Title>Add Contact Detail</Modal.Title>
</Modal.Header>
<Modal.Body>
<form onSubmit={formik.handleSubmit} className="form-group">
        <label>Email</label>
        <input
          name="email"
          placeholder="email"
          className="form-control"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block" style={{ color: "red" }}>
              *{formik.errors.email}
            </div>
          </div>
        ) : null}
        <label>Phone Number</label>
        <input
          name="phonenumber"
          placeholder="phonenumber"
          className="form-control"
          {...formik.getFieldProps("phonenumber")}
        />

        <label>Address</label>
        <textarea
          name="address"
          placeholder="address"
          className="form-control"
          {...formik.getFieldProps("address")}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block" style={{ color: "red" }}>
              *{formik.errors.address}
            </div>
          </div>
        ) : null}
        <label>Next of Kin</label>
        <input
          name="Next of Kin"
          placeholder="nextofkin"
          className="form-control"
          {...formik.getFieldProps("nextofkin")}
        />
           {formik.touched.nextofkin && formik.errors.nextofkin ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block" style={{ color: "red" }}>
              *{formik.errors.nextofkin}
            </div>
          </div>
        ) : null}
        <div style={{ paddingTop: 20 }}>
          {formik.touched.nextofkin && formik.errors.nextofkin ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block" style={{ color: "red" }}>
                *{formik.errors.nextofkin}
              </div>
            </div>
          ) : null}

         
        </div>
        <label>Next of Kin Phone Number</label>
        <input
          name="nextofkin_phonenumber"
          placeholder="Next of Kin Phone Number"
          className="form-control"
          {...formik.getFieldProps("nextofkin_phonenumber")}
        />
          {formik.touched.nextofkin_phonenumber && formik.errors.nextofkin_phonenumber ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block" style={{ color: "red" }}>
              *{formik.errors.nextofkin_phonenumber}
            </div>
          </div>
        ) : null}
        <label>Next of Kin Address</label>
        <textarea
          name="nextofkin_address"
          placeholder="Next of Kin Address"
          className="form-control"
          {...formik.getFieldProps("nextofkin_address")}
        />
        {formik.touched.nextofkin_address && formik.errors.nextofkin_address ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block" style={{ color: "red" }}>
              *{formik.errors.nextofkin_address}
            </div>
          </div>
        ) : null}
        
        <button type="submit" className="btn btn-sm btn-primary" style={{marginTop:10}}>
            Submit
          </button>
      </form>
    
    
    </Modal.Body></Modal>
    )
       
}

export default Contact
