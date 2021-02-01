// import React, { useEffect } from "react";
// import Navigation from "../Navigation/Navigation.jsx";
// import "./UserProfile.styles.css";
// import { FullNameContainer, ButtonContainer } from "./UserProfile.styles";
// import { useHistory } from "react-router-dom";
// import { requestCurrentUser } from '../../redux/currentUser/currentUser.actions';
// import { connect } from 'react-redux';
 
// const UserProfile = ({ user, onRequestCurrentUser }) => {

//     const history = useHistory();

//     useEffect(() => {
//         onRequestCurrentUser();
//     }, [onRequestCurrentUser]);    

//     const { email, first_name, id, jobs_count, last_name, slack_username } = user
//     return (
//         <div>
//             <Navigation customHeading="Profile"/> 

//             <div className="tr mr4"> 
//                 <ButtonContainer onClick={() => history.push("/editprofile", {id: user.id})} className='grow'>
//                     Edit Profile
//                 </ButtonContainer>
//             </div>
//             <h1 className="f3 tc DarkYellow titleGoalsETCFont">FULL NAME</h1> 
//             <FullNameContainer >{first_name} {last_name}</FullNameContainer>
//             <div className="ml4 mt5">
//                 <div className="tl pb1">
//                     <h1 className="f4 DarkYellow titleGoalsETCFont">USER ID</h1> 
//                     <h1 className="f4 white textFont">{id}</h1>
//                 </div>
//                 <div className="tl pb1">
//                     <h1 className="f4 DarkYellow titleGoalsETCFont">EMAIL</h1> 
//                     <h1 className="f4 white textFont">{email}</h1>
//                 </div> 
//                 <div className="tl pb1">
//                     <h1 className="f4 DarkYellow titleGoalsETCFont">JOBS COUNT</h1> 
//                     <h1 className="f4 white textFont">{jobs_count}</h1>
//                 </div> 
//                 { 
//                     slack_username && 
//                         <div className="tl pb1">
//                             { 
//                                 slack_username && 
//                                     <h1 className="f4 DarkYellow titleGoalsETCFont">SLACK USERNAME</h1> 
//                             }
//                             <h1 className="f4 white textFont">{slack_username}</h1>
//                         </div>
//                 }
//             </div>

//         </div>
//     );

// }

// const mapStateToProps = (state) => ({
//     user: state.requestCurrentUser.user,
//     isPending: state.requestCurrentUser.isPending,
//     error: state.requestCurrentUser.error
// })

// const mapDispatchToProps = (dispatch) => ({
//     onRequestCurrentUser: () => dispatch(requestCurrentUser())
// })

 
// export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

import React, { useState, useEffect } from "react"; 
import Navigation from "../Navigation/Navigation.jsx"; 
import "./UserProfile.styles.css"; 
import { FullNameContainer, ButtonContainer } from "./UserProfile.styles"; 
import { useHistory } from "react-router-dom"; 

const UserProfile = () => { 
    const history = useHistory(); 
    const [currentId, setCurrentId] = useState(''); 
    const [currentEmail, setCurrentEmail] = useState(''); 
    const [currentFirstName, setCurrentFirstName] = useState(''); 
    const [currentLastName, setCurrentLastName] = useState(''); 
    const [currentJobCount, setCurrentJobCount] = useState(''); 
    const [currentSlackUsername, setCurrentSlackUsername] = useState(''); 
    let user = JSON.parse(sessionStorage.getItem('user')); 

    const getId = () => { 
        const id = fetch('/api/v2/users', 
            { 
                method: 'get', 
                headers: 
                { 
                    'Content-Type': 'application/json',
                     Authorization: localStorage.getItem('token') 
                } 
            }) 
            .then((response) => response.json()) 
            .then((users) => { 
                return users.users.filter(data => ( 
                    data.email === user.email && data.id 
                    )) 
            }); 
            
            id.then(function(data) { 
                sessionStorage.setItem('currentId', data[0].id) 
                fetch(`/api/v2/users/${data[0].id}`, { 
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
            }) 
        } 

        useEffect(() => { 
            getId(); 
        }, []); 

 return (
<div>
    <Navigation customHeading="Profile" />
    <div className="tr mr4">
        <ButtonContainer onClick={()=> history.push("/editprofile", {id: user.id})} className='grow'> Edit Profile </ButtonContainer>
    </div>
    <h1 className="f3 tc DarkYellow titleGoalsETCFont">FULL NAME</h1>
    <FullNameContainer>{currentFirstName} {currentLastName}</FullNameContainer>
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


export default UserProfile;
  