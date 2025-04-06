import React, { memo } from "react";
import { Beer } from "./interface/beer";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import bottleImage from "../assets/bottle.svg";

interface Props {
  beer: Beer;
  isSmall?: boolean;
}
export const BeerSingle = memo((props: Props): React.ReactElement => {
  const { beer, isSmall } = props;
  return (
    <Link to={`/list/${beer.id}`}>
      <Box sx={SX.BEER_SINGLE(isSmall)}>
        <Box
          component="img"
          src={beer.image ? beer.image : bottleImage}
          alt="Beer Bottle"
          loading="lazy"
        />
        <Box sx={SX.TYPOGRAPHY(isSmall)}>
          <Typography variant="h5" sx={SX.BEER_TITLE}>
            {beer.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {beer.style} | {beer.abv}%
          </Typography>
        </Box>
      </Box>
    </Link>
  );
});

class SX {
  static BEER_SINGLE = (isSmall?: boolean): SxProps<Theme> => ({
    display: "flex",
    flexDirection: isSmall ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: (t) => (isSmall ? 0 : t.spacing(2)),
    borderRadius: 2,
    position: "relative",

    "& img": {
      width: isSmall ? "50px" : "100%",
      height: isSmall ? "8rem" : "22rem",
      objectFit: "cover",
      transition: "all 0.3s ease",
      marginBottom: (t) => (isSmall ? 0 : t.spacing(3)),
      position: "relative",
      zIndex: 1,
    },

    ":before": {
      content: '""',
      position: "absolute",
      top: "35%",
      left: isSmall ? "0" : "15%",
      width: "50%",
      height: "30%",
      borderRadius: "100%",
      backgroundColor: (t) => t.palette.primary.main,
      opacity: 0.2,
      zIndex: 0,
      transition: "all 0.6s ease",
      filter: "blur(15px)",
    },

    ":hover ": {
      cursor: "pointer",
      "& img": {
        transform: "scale(1.1) rotate(5deg)",
        transition: "transform 0.3s ease",
      },

      ":before": {
        content: '""',
        position: "absolute",
        top: "15%",
        left: isSmall ? "-10%" : "5%",
        width: "80%",
        height: "60%",
        opacity: 0.4,
        filter: "blur(20px)",
      },
    },
  });
  static TYPOGRAPHY = (isSmall?: boolean): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "column",
    alignItems: isSmall ? "start" : "center",
    justifyContent: isSmall ? "start" : "center",
    textAlign: isSmall ? "left" : "center",
    paddingRight: (t) => (isSmall ? 0 : t.spacing(3)),
  });

  static BEER_TITLE: SxProps<Theme> = {
    fontFamily: "Caveat, sans-serif",
    color: "text.primary",
  };
}
