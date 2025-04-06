import React, { memo } from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";

import maltImage from "../assets/cereal-01.svg";

export const ResultsNotFound = memo((): React.ReactElement => {
  return (
    <Box sx={SX.BOX}>
      <Box component="img" src={maltImage} alt="Beer Bottle" loading="lazy" />
      <Typography variant="h2">Beer not found.</Typography>
      <Typography variant="h3">
        The brewery mice are still taste-testing.
      </Typography>
    </Box>
  );
});
class SX {
  static BOX: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    textAlign: "center",
    width: "100%",

    "& img": {
      maxWidth: "180px",
    },
  };
}
