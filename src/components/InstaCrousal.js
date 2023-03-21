import React from 'react'
import instaBg from "../assests/insta.png"
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';

import img1 from "../assests/img1.jpg"
import img2 from "../assests/img2.jpg"
import img3 from "../assests/img3.jpg"
import img4 from "../assests/img4.jpg"
import img5 from "../assests/img5.jpg"
export const InstaCrousal = () => {
  return (
    <div className=" h-[35rem] w-96  bg-cover relative   " style={{backgroundImage: `url(${instaBg})` }}>
        <div className='absolute w-56 h-[24rem] top-[86px] left-[133px]'>
          <CarouselProvider
          interval={2000}
          naturalSlideWidth={70}
          naturalSlideHeight={125}
          totalSlides={5}
          className="w-full"
          isPlaying={true} 
          dragEnabled={false}
          touchEnabled={false}
          infinite={true}
          >
          <Slider>
            <Slide index={0}><Image src={img1} /></Slide>
            <Slide index={1}><Image src={img2} /></Slide>
            <Slide index={2}><Image src={img3} /></Slide>
            <Slide index={3}><Image src={img4} /></Slide>
            <Slide index={4}><Image src={img5} /></Slide>
            
            
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  )
}
