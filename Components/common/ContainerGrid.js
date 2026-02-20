// react
import * as React from "react";
// @mui
import { Grid } from "@mui/material";

const ContainerGrid = (props) => {
  const { children, container, spacing, ...otherProps } = props;

  return (
    <Grid container spacing={2} {...otherProps}>
      {children}
    </Grid>
  );
};

export default ContainerGrid;
