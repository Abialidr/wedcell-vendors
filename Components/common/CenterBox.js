// react
import * as React from "react";

const CenterBox = (props) => {
  const { children, height = "100vh", ...otherProps } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
        ...otherProps,
      }}
    >
      {children}
    </div>
  );
};

export default CenterBox;
