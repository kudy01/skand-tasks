import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation.jsx";
import "./IndividualUserFromIndexProfile.styles.css";
import { useHistory, useLocation } from "react-router-dom";
 
const IndividualUserFromIndexProfile = () => {
    const history = useHistory();
    const location = useLocation();
    let id = location.state.id;

    const [currentId, setCurrentId] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');
    const [currentJobCount, setCurrentJobCount] = useState('');
    const [currentSlackUsername, setCurrentSlackUsername] = useState('');

    useEffect(() => {
        fetch(`/api/v2/users/${id}`, { 
          method: 'get',
          headers: {
                      'Content-Type': 'application/json',
                      'Authorization': localStorage.getItem('token')
          },
        })    
        .then(response => response.json())
        .then(response => {
                setCurrentId(response.users.id);
                setCurrentEmail(response.users.email);
                setCurrentFirstName(response.users.first_name);
                setCurrentLastName(response.users.last_name);
                setCurrentJobCount(response.users.jobs_count);
                setCurrentSlackUsername(response.users.slack_username);

              })

    }, [id]);    


    return (
        <div>
            <Navigation customHeading="Profile"/> 

            <div className="tr mr4"> 
                <button
                    onClick={() => {
                        history.push(`/editprofile:${id}`, {id: id});
                    }}
                    className="tc b no-underline ph3 mb2 pv2 ba b--near-white grow pointer f5 dib bg-white black br-pill buttonFont"
                >
                    Edit Profile
                </button>
            </div>
            <h1 className="f3 tc DarkYellow titleGoalsETCFont">FULL NAME</h1> 
            <p className="f3 tc titleFont white">{currentFirstName} {currentLastName}</p>
            <div className="ml4 mt5">
                <div className="tl pb1">
                    <h1 className="f4 DarkYellow titleGoalsETCFont">USER ID</h1> 
                    <h1 className="f4 white textFont">{currentId}</h1>
                </div>
                <div className="tl pb1">
                    <h1 className="f4 DarkYellow titleGoalsETCFont">EMAIL</h1> 
                    <h1 className="f4 white textFont">{currentEmail}</h1>
                </div> 
                <div className="tl pb1">
                    <h1 className="f4 DarkYellow titleGoalsETCFont">JOBS COUNT</h1> 
                    <h1 className="f4 white textFont">{currentJobCount}</h1>
                </div> 
                { 
                    currentSlackUsername && 
                        <div className="tl pb1">
                            { 
                                currentSlackUsername && 
                                    <h1 className="f4 DarkYellow titleGoalsETCFont">SLACK USERNAME</h1> 
                            }
                            <h1 className="f4 white textFont">{currentSlackUsername}</h1>
                        </div>
                }
            </div>

        </div>
    );

}
export default IndividualUserFromIndexProfile;
