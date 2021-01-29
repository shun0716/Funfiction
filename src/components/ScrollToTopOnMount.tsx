import React, { useState, useEffect } from "react";

const ScrollToTopOnMount: React.FC = () => {
  const [setScroll] = useState(window.scrollTo(0, 0));
  useEffect((): void => {}, [setScroll]);

  return null;
};

export default ScrollToTopOnMount;
