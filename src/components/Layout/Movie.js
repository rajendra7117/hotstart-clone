import React, {useState} from 'react'
import './Movie.css'
import { motion } from 'framer-motion'
import MovieDetails from './MovieDetails'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { detailsSliceActions } from '../../store/DetailsSlice'
import dummy from '../../Images/dummy.jpg'
const Movie = (props) => {
 
    const [showDetails, setShowDetails] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
   
    const showInfo = e => {
        setShowDetails(true)
    }
  
    const hideDetails = e => {
        setShowDetails(false)
    }
    const viewDetail = e => {
     dispatch(detailsSliceActions.viewDetails({id: props.movie.id, series: props.series}))
        history.push(`/details/${props.movie.id}`)
    }
    
    let image;
    if(props.img){
      image=`https://image.tmdb.org/t/p/w500/${props.img}`
    }
    if(!props.img){
      image=dummy
    }
  return (
    <motion.div className='movie'
    
    whileHover={{scale: 1.3}}
    transition={{duration: 0.2}}
    onMouseOver={showInfo}
    onMouseLeave={hideDetails}
    onClick={viewDetail}
    >
        <img src={image} alt={props.movie.original_title || props.movie.original_name || ''}/>
        {showDetails && <MovieDetails banner={false} movie={props.movie} series={props.series}/>}
        

    </motion.div>
  )
}

export default Movie