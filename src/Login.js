import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "./App";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import "./login.scss";
import { webapibaseurl } from "./environment";
export default function Login() {
  const alert = useAlert();
  const { dispatch } = useContext(AuthContext);
  const initialValues = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(
    JSON.stringify({ isAuthenticated: false })
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(),
  });
  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify({ authValue: false }));
    localStorage.setItem("isAuth", JSON.stringify({ isAuthenticated: false }));
  }, []);
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const auth_url = `${webapibaseurl}/login`;
    
      axios
        .post(
          auth_url,
       values
         
          
        )
        .then((response) => {
            console.log(response)
          var token = response.data.token;
        
          var userInfo = JSON.stringify(response.data.userinfo);
          setIsAuthorized(JSON.stringify({ isAuthenticated: true }));
          localStorage.setItem("userInfo", userInfo);

          axios.defaults.headers.common["Authorization"] = token;
          localStorage.setItem("token", token);
     
          dispatch({ type: "LOGIN" });
          localStorage.setItem(
            "isAuth",
            JSON.stringify({ isAuthenticated: true })
          );

         navigate("/dashboard");
        })
        .catch((err) => {
          setIsSubmitting(false);

          if (err.response === 500) {
            alert.error(`Please connect to a stable network!`);
          } else alert.error(`Invalid Username or Password`); // alert("Please enter a valid username or password")
        });
    },
  });
  return (
    <div className="wrapper">
      <form className="login full-height" onSubmit={formik.handleSubmit}>
        <p className="title">Log in</p>
        <input type="text" placeholder="Username"   {...formik.getFieldProps("username")}/>
        {formik.touched.username && formik.errors.username ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block" style={{ color: "red" }}>
                  *{formik.errors.username}
                </div>
              </div>
            ) : null}
        <i className="fa fa-user"></i>
        <input type="password" placeholder="Password"  {...formik.getFieldProps("password")} />
        {formik.touched.password && formik.errors.password ? (
              <div
                className="fv-plugins-message-container"
                style={{ margin: 10 }}
              >
                <div className="fv-help-block" style={{ color: "red" }}>
                  *{formik.errors.password}
                </div>
              </div>
            ) : null}
        <i className="fa fa-key"></i>
        <a href="#">.</a>
        <button type="submit">
          <i className="spinner"></i>
          <span className="state">Log in</span>
        </button>
      </form>
      <footer>CCODE</footer>
      
    </div>
  );
}
