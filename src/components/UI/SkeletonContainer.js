import React, { useState, useLayoutEffect } from "react";
import "./SkeletonContainer.css";
const SkeletonContainer = () => {
 

  const [width, setWidth] = useState(window.screen.availWidth);
  let number = 1;
  if (width > 1200) {
    number = 6;
  }
  if (width < 1200 && width > 900) {
    number = 4;
  }
  if (width < 900 && width > 550) {
    number = 3;
  }
  if (width < 560) {
    number = 2;
  }

  let contentArray = Array(number).fill({});
  const updateContainer = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", updateContainer);
    return () => {
      window.removeEventListener("resize",() => {})
    }
  }, []);


  return (
    <div className="skeletonContainer">
      {contentArray.map((item, index) => (
        <div className="skeleton" key={index}>
     
          <div className="wave"> </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonContainer;
