import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Colours from "../constants.js/Colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(Colours.Champagne_Gold.Dark),
  m: 1,
  textTransform: "none",
  // color: Colours.Navy_Blue.Dark,
  backgroundColor: Colours.Champagne_Gold.Dark,
  "&:hover": {
    backgroundColor: Colours.Champagne_Gold.Dark,
  },
}));

export const ButtonSolidOne = ({ title, onClick }) => {
  return (
    <ColorButton variant="outlined" onClick={onClick}>
      {title}
    </ColorButton>
  );
};
