import React from 'react'
import './ImageSlider.css'
import Slider from "react-slick";
import MovieDetails from '../Layout/MovieDetails';



const ImageSlider = (props) => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
        

      };
    let movieArray = []
    for(let i=0;i<=5;i++){
      movieArray.push(props.movies[Math.floor(Math.random() * 20)])
    }
  let content = movieArray.map(movie => <div key={movie.id} className="banner-movie"> <MovieDetails banner={true} movie={movie} series={false}/> <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title || movie.name || ''}/></div>)
      return (
      
        <Slider {...settings} className={'img-slider'}>
        
          {content}
        
        </Slider>
       
      );
  
}

export default React.memo(ImageSlider)