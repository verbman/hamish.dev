import React from "react";

const ReadMore: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height,
  width,
  className,
  color
}) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fill={color} d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path>
  </svg>
);

export default ReadMore;
