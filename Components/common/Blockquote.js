// react
import * as React from "react";
// @mui
import { Box, styled } from "@mui/material";

const BlockquoteRoot = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "1rem",
  borderLeft: `0.25rem solid ${theme.palette.primary.contrastText}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const Blockquote = (props) => {
  const { children, ...otherProps } = props;

  return <BlockquoteRoot {...otherProps}>{children}</BlockquoteRoot>;
};

export default Blockquote;
