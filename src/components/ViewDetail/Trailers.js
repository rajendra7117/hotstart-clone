import React from 'react'
import './Trailers.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Trailers = (props) => {

  return (
    <div className='trailers'>
        <h1>{`Trailers & Extra`}</h1>
        <div className='trailer-div'>
            <span className='length'> 30 sec</span>
            <img src={`https://image.tmdb.org/t/p/w400/${props.movie.backdrop_path}`} alt={props.series ? props.movie.original_name : props.movie.original_title}/>
            <div className='trailer-text'><PlayArrowIcon fontSize="small"/> <span>{props.series ? props.movie.original_name : props.movie.original_title} - Trailer </span></div>
        </div>
    </div>
  )
}

export default Trailers