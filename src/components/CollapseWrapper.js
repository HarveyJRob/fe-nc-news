import { useState } from "react";

const CollapseWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible((currIsVisible) => {
      return !currIsVisible;
    });
  };

  return (
    <>
      {isVisible && children}
      <button onClick={handleClick}>{isVisible ? "...show less" : "...show more"}</button>
    </>
  );
};

export default CollapseWrapper;
