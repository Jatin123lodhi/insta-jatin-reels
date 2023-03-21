import React, { useEffect } from 'react'
import vid1 from '../videos/vid1.mp4'
import vid2 from '../videos/vid2.mp4'
import vid3 from '../videos/vid3.mp4'
export const Ioa = () => {     // Intersection Observer API 
    
    const playVideo = (entries)=>{
        entries.forEach((entry)=>{
            console.log(entry.target)
            let ele = entry.target
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(playVideo, {threshold:0.6});
    useEffect(()=>{
        let videoElements = document.getElementsByTagName("video");
        videoElements = [...videoElements]
        videoElements.forEach((element)=>{
            observer.observe(element)
        }) 
    },[])
    

  return (
    <div className=" ">
      <video controls    muted     className="border border-gray-100 snap-start h-[30rem] w-[17rem] rounded-xl">
        <source src={vid1} type="video/mp4" />Your browser does not support the video tag.
      </video>
      <video controls    muted     className="border border-gray-100 snap-start h-[30rem] w-[17rem] rounded-xl">
        <source src={vid2} type="video/mp4" />Your browser does not support the video tag.
      </video>
      <video controls    muted     className="border border-gray-100 snap-start h-[30rem] w-[17rem] rounded-xl">
        <source src={vid3} type="video/mp4" />Your browser does not support the video tag.
      </video>
    </div>
  )
}
