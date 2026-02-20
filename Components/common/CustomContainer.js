// react
import * as React from "react";
// @mui
import { Container } from "@mui/material";

const CustomContainer = (props) => {
  const { children, maxWidth = "lg", ...otherProps } = props;

  return (
    <Container maxWidth={maxWidth} {...otherProps}>
      {children}
    </Container>
  );
};

export default CustomContainer;
