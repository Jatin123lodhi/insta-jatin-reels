import React from "react";

export const ProfileLowerShimmer = () => {
  return (
    <div className="  h-full w-full flex flex-wrap justify-center p-2">
      { Array(8).fill("").map((val,index) => (
        <div className="border border-gray-100 snap-start h-[30rem] w-[17rem] rounded-xl bg-gray-100 m-4 " key={index}>
        
        </div>
      ))}
    </div>
  );
};
