import React, { useEffect, useState } from 'react'
import MoviesContainer from '../Layout/MoviesContainer';
import Wrapper from '../Layout/Wrapper';

const PopularSeries = () => {
    const [data, setData] = useState([])
    const baseapi = `https://api.themoviedb.org/3/tv/popular?api_key=5b43d1ebe66750ccefbad667bde21805&language=en-US`

    useEffect(() => {
            fetch(`${baseapi}&page=${1}`)
            .then(res => {
               return res.json()
            })
            .then(data => {
                setData(data.results)
            })
           
    },[baseapi])
 
    console.log(data)
    
  return (
    <Wrapper>
    <h4>{`Popular Shows`}</h4>
    {data.length>0 && <MoviesContainer items={data} series={true}/>}
  
</Wrapper>
  )
}

export default PopularSeries