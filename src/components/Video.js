import React from "react";
import { findDOMNode } from "react-dom";

export const Video = ( {postUrl}) => {
  const handelMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  // as the video ends scroll to next video
  const handelScroll = (e) => {
    let next = findDOMNode(e.target)?.parentNode?.parentNode?.nextSibling;
    //console.log(findDOMNode(e.target)?.parentNode?.parentNode?.nextSibling)
    if (next) {
      next?.scrollIntoView();
      //console.log(next?.childNodes[0]?.childNodes[0]?.play())
      //next?.childNodes[0]?.play();
    }
  };
  return (
    <div className="flex justify-center">
      <video controls onEnded={handelScroll}  muted  onClick={handelMute}  className="border border-gray-100 snap-start h-[30rem] w-[17rem] rounded-xl">
        <source src={postUrl} type="video/mp4" />Your browser does not support the video tag.
      </video>
    </div>
  );
};

 