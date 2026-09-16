import React from 'react'
import MovieDetails from '../Layout/MovieDetails'
import './DetailsContainer.css'
const DetailsContainer = (props) => {
  
  return (
    <div>
        <div className='poster'>
            <MovieDetails movie={props.movie} series={props.series} banner={true}/>
            <img src={`https://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`} alt={props.movie.title || props.movie.name || ''}/>
        </div>
    </div>
  )
}

export default DetailsContainer