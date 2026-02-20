// react
import * as React from "react";
// @emotion
import styled from "@emotion/styled";

const Root = styled("a")({
  position: "relative",
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  "&:before": {
    backgroundColor: "currentcolor",
    bottom: 0,
    content: '""',
    display: "block",
    height: "2px",
    left: 0,
    position: "absolute",
    transform: "scaleX(0)",
    transition: "transform 0.3s ease",
    width: "100%",
  },
  "&:hover:before": {
    transform: "scaleX(1)",
  },
  ":focus-visible": {
    outline: "none",
    ":before": {
      transform: "scaleX(1)",
    },
  },
});

const CustomAnchor = (props) => {
  const { children, ...otherProps } = props;

  return <Root {...otherProps}>{children}</Root>;
};

export default CustomAnchor;
