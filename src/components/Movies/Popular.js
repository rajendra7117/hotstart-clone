import React, {useEffect, useState} from 'react'
import MoviesContainer from '../Layout/MoviesContainer';
import Wrapper from '../Layout/Wrapper';

const Popular = () => {
    const [data, setData] = useState([])
    const baseapi = `https://api.themoviedb.org/3/movie/popular?api_key=5b43d1ebe66750ccefbad667bde21805&language=en-US`
    useEffect(() => {
        fetch(`${baseapi}&page=${3}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data.results);
          });
      }, [baseapi]);
  return (
    <Wrapper>
        <h4>{`Popular Movies`}</h4>
        {data.length>0 && <MoviesContainer items={data} series={false}/>}
    </Wrapper>
  )
}

export default Popular