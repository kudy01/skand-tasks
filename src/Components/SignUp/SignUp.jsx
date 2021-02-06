import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.styles.css";
import { Link, useHistory } from "react-router-dom";
import "date-input-polyfill";


const SignUp = (props) => {
   
    const history = useHistory();
    const [signUpError, setSignUpError] = useState("");
   
    const formik = useFormik({
        initialValues: {
              first_name: "",
		      last_name: "",
		      email: "", 
		      password: "",
		      confirm_password: "",
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
		      password: Yup.string()
		        .min(8, "Minimum 8 characters")
		        .required("Required!"), 
		      confirm_password: Yup.string()
		        .oneOf([Yup.ref("password")], "Password's not match")
		        .required("Required!"),
		      jobs_count: Yup.string()
		        .required("Required!"),
		      slack_username: Yup.string()
		    }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            fetch('/api/v2/users', {
	          method: 'post',
	          headers: {
	                      'Content-Type': 'application/json',
	                      'Authorization': '112' 
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
	            	sessionStorage.setItem('user', JSON.stringify(user.users))
	            	localStorage.setItem('token', '112');
	            	history.push('/profile');
	            }
	            else {
	            	setSignUpError("Unable to create a new user, try again.");
	            }
	          })
        },
    });

	return (
    <div className="br3 ba bg-white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
	    <main className="pa4">
	    	<div className="measure">
		      <h1 className="f1 fw6 ph0 mh0 black b">Sign Up</h1>
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
		        <div className="mt3">
		          <label>Slack Username</label>
		          <input
		            type="text"
		            name="slack_username"
		            placeholder="Slack Username"
		            value={formik.values.slack_username}
		            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
		            onChange={formik.handleChange}
		          />
		          {formik.errors.slack_username && formik.touched.slack_username && (
		            <p className="input-error">{formik.errors.slack_username}</p>
		          )}
		        </div>
		        <div className="mt3">
		          <label className="black">Create a password</label>
		          <input
		            type="password"
		            name="password"
		            value={formik.values.password}
		            onChange={formik.handleChange}
		            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
		            placeholder="Password"
		          />
		          {formik.errors.password && formik.touched.password && (
		            <p className="input-error">{formik.errors.password}</p>
		          )}
		        </div>
		        <div className="mv4">
		          <label className="black">Confirm your password</label>
		          <input
		            type="password"
		            name="confirm_password"
		            value={formik.values.confirm_password}
		            onChange={formik.handleChange}
		            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
		            placeholder="Confirm Password"
		          />
		          {formik.errors.confirm_password && formik.touched.confirm_password && (
		            <p className="input-error">{formik.errors.confirm_password}</p>
		          )}
		          {signUpError && (    
                    <div style={{ color: "red" }}>
                      <p>{signUpError}</p>
                    </div>    
                  )}
		        </div>
		        <div>
		          <button 
		            type="submit"
		            className="buttonSignUpSignInWidth b no-underline ph5 mb2 pv2 input-reset ba b--near-white white grow pointer f3 dib bg-SignUp br-pill buttonFont" 
		          >
		            Next
		          </button>
		          <br />
		          <div className="lh-copy mt3">
					<Link to="signin" className="f6 link dim black db pointer tc">Already have an account?</Link>
				  </div>
		        </div>
		      </form>
			</div>
		</main>
    </div>
  );
}

export default SignUp;
