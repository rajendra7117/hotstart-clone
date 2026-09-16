import React from 'react'
import './NoResults.css'
import noResults from '../../Images/no-results.png'
const NoResults = (props) => {
  return (
    <div className='no-results'>
        <img src={noResults} alt="No results found"/>
        <span>{props.message}</span>
        <span>Try searching for something else</span>
    </div>
  )
}

export default NoResults