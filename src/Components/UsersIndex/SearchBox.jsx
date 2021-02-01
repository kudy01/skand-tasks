import React from 'react';

import './SearchBox.styles.css';

const SearchBox =({ searchChange, middle }) => {
	const discoverSearchIcon = {
		left: '35rem'
	}

	return (
		<div className={`${middle && 'tc search'} search`}>
		  <span className="fa fa-search" style={middle ? discoverSearchIcon : null}></span>
		  <input 
		  	aria-label='Search by Email'
		  	type='search' 
		  	placeholder='Search by Email'
			onChange={searchChange}
		  />
		</div>
		);
}

export default SearchBox;
