import React, { useEffect, useState } from 'react'
import MoviesContainer from '../Layout/MoviesContainer';
import Wrapper from '../Layout/Wrapper';

const LatestSeries = () => {
    const [data, setData] = useState([])
   
    const baseapi = `https://api.themoviedb.org/3/tv/airing_today?api_key=5b43d1ebe66750ccefbad667bde21805&language=en-US&page=1`
   
    useEffect(() => {
            fetch(`${baseapi}`)
            .then(res => {
               return res.json()
            })
            .then(data => {
                setData(Array.isArray(data.results) ? data.results : [])
            })
            .catch(() => {
                setData([])
            })
           
    },[baseapi])
 
    
  return (
    <Wrapper>
    <h4>{`Latest Shows`}</h4>
    {data.length>0 && <MoviesContainer items={data} series={true}/>}
  
</Wrapper>
  )
}

export default LatestSeries



