// react
import * as React from "react";
// @mui
import { Box, Typography } from "@mui/material";
// custom component
// import CenterBox from "components/common/CenterBox";
// type

const ProjectNotFound = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography component="h2" variant="h4">
        Sorry, couldn&apos;t find the project.
      </Typography>
      <Typography
        color="text.secondary"
        component="p"
        marginTop="1rem"
        variant="body1"
      >
        You can check projects page to see all project.
      </Typography>
    </Box>
  );
};

export default ProjectNotFound;
