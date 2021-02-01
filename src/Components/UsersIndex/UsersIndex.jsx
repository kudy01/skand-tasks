
import React, { useEffect } from 'react';  
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";  
import SearchBox from './SearchBox';
import Navigation from "../Navigation/Navigation.jsx";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchField, requestUsers } from '../../redux/user/user.actions';


const UserIndex = ({ users, searchField, onRequestUsers, onSearchChange }) => {
  
  const history = useHistory();

  useEffect(() => {
      onRequestUsers();

    }, [onRequestUsers]);   

  const columns = [{  
       Header: 'ID',  
       accessor: 'id'  
       },
       {  
       Header: 'Email',  
       accessor: 'email', 
       },
       {  
       Header: 'First Name',  
       accessor: 'first_name', 
       },
       {  
       Header: 'Last Name',  
       accessor: 'last_name', 
       },
       {  
       Header: 'Jobs Count',  
       accessor: 'jobs_count', 
       },
       { 
       id:'active', 
       Header: 'Activity',  
       accessor: d => { return d.active ? 'Active' : 'Inactive' }, 
       },
       {  
       Header: 'Slack Username',  
       accessor: 'slack_username', 
       },
       {
       Header: '',
       Cell: row => (
           <div>
               <button onClick={() => {
                 history.push(`/profile:${row.row.id}`, {id: row.row.id})
               }}>
                 View Profile
               </button>
           </div>
       )
       }] 

      const searchByEmail = (rows) => {
        return rows.filter((row) => row.email.toLowerCase().includes(searchField.toLowerCase()))
    }

  return (  
          <div>  
            <Navigation customHeading="Users Index"/> 
            <SearchBox middle={true} searchChange={onSearchChange} />
              <ReactTable  
                  data={searchByEmail(users)}  
                  columns={columns} 
                  defaultPageSize = {4}  
                  pageSizeOptions = {[4,6, 8]}  
                  style = {{background: "white"}}
                  className="-striped -highlight"
              /> 

          </div>        
    )  
}
  

const mapStateToProps = (state) => ({
    searchField: state.searchUsers.searchField,
    users: state.requestUsers.users,
    isPending: state.requestUsers.isPending,
    error: state.requestUsers.error
})

const mapDispatchToProps = (dispatch) => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestUsers: () => dispatch(requestUsers())
})



 
export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);
