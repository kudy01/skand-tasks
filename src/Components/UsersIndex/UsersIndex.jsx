
import React, { useEffect } from 'react';  
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";  
import SearchBox from './SearchBox';
import Navigation from "../Navigation/Navigation.jsx";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestApiData, setSearchField } from '../../redux/user/user.actions';


const UserIndex = ({ data, requestApiData, searchField, setSearchField }) => {
  
  const history = useHistory();

  useEffect(() => {
      requestApiData();

    }, [requestApiData]);   

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
            {
              data && 
                <div>
                  <SearchBox middle={true} searchChange={setSearchField} />
                  <ReactTable  
                      data={searchByEmail(data)}  
                      columns={columns} 
                      defaultPageSize = {4}  
                      pageSizeOptions = {[4,6, 8]}  
                      style = {{background: "white"}}
                      className="-striped -highlight"
                  /> 
                </div>
            }
          </div>        
    )  
}
  


const mapStateToProps = state => ({ data: state.data.users, searchField: state.setSearchField.searchField });

const mapDispatchToProps = dispatch => ({
  requestApiData: () => dispatch(requestApiData()),
  setSearchField: (event) => dispatch(setSearchField(event.target.value)),
})




 
export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);
