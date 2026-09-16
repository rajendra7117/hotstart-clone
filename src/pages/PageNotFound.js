import React from 'react'
import NoResults from '../components/SearchResults/NoResults'

const PageNotFound = () => {
  return (
    <div style={{height: '100vh', marginInline: 'auto' ,marginTop: '12rem', width: '100vw'}}>
        <NoResults message={'Page not found!'}/>
    </div>
  )
}

export default PageNotFound