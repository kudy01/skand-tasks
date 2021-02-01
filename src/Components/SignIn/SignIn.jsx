import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignIn.styles.css";
import { useHistory } from "react-router-dom";


const SignIn = (props) => {
  
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
   
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("You must enter an email"),
      password: Yup.string()
        .required("You must enter a password"),
    }),
    onSubmit: values => {
		alert(JSON.stringify(values));
	    sessionStorage.setItem('user', JSON.stringify(values));
	    fetch('/api/v2/users/tokens', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        email: formik.values.email,
	        password: formik.values.password
	      })
	    })
	    .then(response => {
	            if(response.ok){
	              history.push('/profile');
	              localStorage.setItem('token', response.headers.map.authorization);
	            }
	            else{
	              setLoginError("Email or password is incorrect");
	            }
	          })
    }
  }); 

	return (
    <div className="br3 ba bg-white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
	    <main className="pa4">
	    	<div className="measure">
		      <h1 className="f1 fw6 ph0 mh0 logo black">Log In</h1>
		      <form onSubmit={formik.handleSubmit}>
		        <div className="mt3">
		          <label className="black">Email</label>
		          <input
		            type="text"
		            name="email"
		            value={formik.values.email}
		            onChange={formik.handleChange}
		            placeholder="Email"
		            className="mt1 pa2 input-reset ba b--black bw1 bg-transparent w-100 br3"
		          />
		          {formik.errors.email && formik.touched.email && (
		            <p className="input-error">{formik.errors.email}</p>
		          )}
		        </div>
		        <div className="mv4">
		          <label className="black">Password</label>
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
		          {loginError && (    
                    <div style={{ color: "red" }}>
                      <p>{loginError}</p>
                    </div>    
                  )}
		        </div>
		        <div>
				  <button 
		            type="submit"
		            className=" buttonSignUpSignInWidth b no-underline ph5 mb2 pv2 input-reset ba b--near-white white grow pointer f3 dib bg-SignIn br-pill buttonFont" 
		          >
		            Log In
		          </button>
		        </div>
		      </form>
			</div>
		</main>
    </div>
  );
}

export default SignIn;