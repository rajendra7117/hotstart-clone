import React, {useEffect, useState} from "react";
import './MovieDetails.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
const MovieDetails = (props) => {

  const [overview, setOverview] = useState('')
  const [date, setDate]  = useState('')



  useEffect(() => {
    let itemDate = ''
    if(props.series===true){
      itemDate = props.movie.first_air_date
    }
    
    if(props.series===false){
      if('release_date' in props.movie){
        itemDate = props.movie.release_date
      }
      else{
        itemDate = 'Not Released'
      }
      
    }
      if(itemDate==='Not Released'){
        setDate('Not Released')

      }
      else{
        setDate(itemDate.slice(0, 4))
      }
  
    const spaceIndex = [];

    let movie_overview = props.movie.overview;
  
    for (let i = 0; i <= movie_overview.length; i++) {
      if (movie_overview[i] === " ") {
     
        spaceIndex.push(i);
      }
  
    }
    
    setOverview(movie_overview.slice(0, spaceIndex[7]))
    if(props.banner===true){
     setOverview(movie_overview.slice(0, spaceIndex[20]))
    }
  }, [props.banner, props.series, props.movie])


  return (
    <div className="movie-details" >
      <div className="all-details">
      <h5>{props.series ? props.movie.original_name : props.movie.original_title}</h5>
      <span> {date}</span>
     <p> {overview}</p>
     </div>
     <div className="icons">
     
     <span><PlayArrowIcon fontSize="small"/> Watch Now</span>
     <span><AddIcon fontSize="small"/> Add To Watchlist</span>
     </div>
     
    </div>
  );
};

export default MovieDetails;
