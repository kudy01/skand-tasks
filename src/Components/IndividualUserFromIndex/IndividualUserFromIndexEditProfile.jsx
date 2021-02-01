import React, { useState } from 'react';
import Navigation from "../Navigation/Navigation.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import './IndividualUserFromIndexEditProfile.styles.css'
import { useHistory, useLocation } from "react-router-dom";

const IndividualUserFromIndexEditProfile = () => {

    const history = useHistory();
    const location = useLocation();
    let id = location.state.id;
    const [editError, setEditError] = useState("");

    const formik = useFormik({
        initialValues: {
          first_name: "",
          last_name: "",
          email: "",
          jobs_count: "",
          slack_username: "" 
        },
        validationSchema: Yup.object({
          first_name: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(30, "Maximum 30 characters")
            .required("Required!"),
          last_name: Yup.string()
            .min(2, "Mininum 2 characters")
            .max(30, "Maximum 30 characters")
            .required("Required!"),
          email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
          jobs_count: Yup.string()
          .required("Required!"),
          slack_username: Yup.string()
        }),
        onSubmit: values => {
            
            alert(JSON.stringify(values));
            fetch(`/api/v2/users/${id}`, { 
            method: 'patch',
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: formik.values.email,
                first_name: formik.values.first_name,
                last_name: formik.values.last_name,
                jobs_count: formik.values.jobs_count,
                active: true,
                slack_username: formik.values.slack_username
              })
          })    
          .then(response => response.json())
          .then(user => {
              if(user) {
                sessionStorage.setItem('userFromIndex', JSON.stringify(user.users))
                history.push(`/profile:${id}`, {id: id})
              }
              else {
                setEditError("Unable to edit details, try again.");
              }

                })
        }
      });

    const cancelEditProfile = () => {
        history.push(`/profile:${id}`, {id: id})
    }

    const removeTokenOnUpdate = () => {
      sessionStorage.removeItem('userFromIndex')
    }

    const removeUserProfile = () => {
            fetch(`/api/v2/users/${id}`, { 
            method: 'delete',
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
            },
          })    
          .then(response => response.json())
          .then(data => {
            if(data.message){
              setEditError("No such user exists, please login again");
            }
            else {
              sessionStorage.removeItem('userFromIndex')
              history.push('/')
            }
          })
    }

    return(
    <div>
        <Navigation customHeading="Edit Profile"/> 
            <div className="tr mr4">
                <button 
                    onClick={cancelEditProfile}
                    className="ml4 tc b no-underline ph3 mb2 pv2 ba b--near-white grow pointer f5 dib bg-white black br-pill buttonFont" 
                  >
                    Cancel
                   </button>
            </div>
            <div className="br3 ba bg-white mv4 w-100 w-50-m w-35-l mw6 shadow-5 center" >
                <main className="pa4">
                    <div className="measure">
                      <form onSubmit={formik.handleSubmit}>  
                         <div className="mt3">
                          <label className="black">First Name</label>
                          <input
                            type="text"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
                            placeholder="First Name"
                          />
                          {formik.errors.first_name && formik.touched.first_name && (
                            <p className="input-error">{formik.errors.first_name}</p>
                          )}
                        </div>
                        <div className="mt3">
                          <label className="black">Last Name</label>
                          <input
                            type="text"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
                            placeholder="First Name"
                          />
                          {formik.errors.last_name && formik.touched.last_name && (
                            <p className="input-error">{formik.errors.last_name}</p>
                          )}
                        </div>
                        <div className="mt3">
                          <label className="black">What's your email?</label>
                          <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
                            placeholder="Email"
                          />
                          {formik.errors.email && formik.touched.email && (
                            <p className="input-error">{formik.errors.email}</p>
                          )}
                        </div>
                        <div className="mt3">
                          <label className="black">What's your Jobs Count?</label>
                          <input
                            placeholder="Jobs Count"
                            type="text"
                            name="jobs_count"
                            value={formik.values.jobs_count}
                            onChange={formik.handleChange}
                            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
                          />
                          {formik.errors.jobs_count && formik.touched.jobs_count && (
                            <p className="input-error">{formik.errors.jobs_count}</p>
                          )}
                        </div>
                        <div className="mv3">
                          <label>Slack Username</label>
                          <input
                            type="text"
                            placeholder="Slack Username"
                            name="slack_username"
                            value={formik.values.slack_username}
                            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
                            onChange={formik.handleChange}
                          />
                          {formik.errors.slack_username && formik.touched.slack_username && (
                            <p className="input-error">{formik.errors.slack_username}</p>
                          )}
                          {editError && (    
                            <div style={{ color: "red" }}>
                              <p>{editError}</p>
                            </div>    
                          )}
                        </div>
                        <div>
                          <div>
                              <button 
                                type="submit"
                                className="buttonSignUpSignInWidth tc b no-underline ph3 mb2 pv2 ba b--near-white grow pointer f5 dib bg-SignUp black br-pill buttonFont"
                                onClick={removeTokenOnUpdate} 
                              >
                                Done
                              </button>
                              <button 
                                type="submit"
                                className="buttonSignUpSignInWidth tc b no-underline ph3 mb2 pv2 ba b--near-white grow pointer f5 dib bg-SignIn black br-pill buttonFont"
                                onClick={removeUserProfile} 
                              >
                                Delete Profile
                              </button>
                          </div>
                        </div>
                      </form>
                    </div>
                </main>
            </div>
    </div>
    )
}

export default IndividualUserFromIndexEditProfile;

