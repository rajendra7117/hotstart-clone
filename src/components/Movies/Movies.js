import React, {useState, useEffect} from 'react'
import './Movies.css'
import { useSelector } from 'react-redux'
import ImageSlider from '../Home/ImageSlider'
import Latest from './Latest'
import Popular from './Popular'
import TopRated from './TopRated'
import Login from '../Auth/Login'

import SignUp from '../Auth/SignUp'
const Movies = () => {
    const [data, setData] = useState([])
    const showModal = useSelector(state => state.toggleForm.showModal)
  const toggleForm = useSelector(state => state.toggleForm.toggleForm)

  
  const baseapi =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=5b43d1ebe66750ccefbad667bde21805&language=en-US";

useEffect(() => {
  fetch(`${baseapi}&page=${1}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setData(data.results);
    });
}, []);

  return (
    <div className='movies'>
         {data.length>0 && <ImageSlider movies={data}/>}
      
        <div>
          <Latest />
        </div>
        <div>
          <Popular />
        </div>
        <div>
          <TopRated />
        </div>
       
        {showModal && <React.Fragment>{!toggleForm ? <Login /> : <SignUp />}</React.Fragment>}
      
        
    </div>
  )
}

export default Movies