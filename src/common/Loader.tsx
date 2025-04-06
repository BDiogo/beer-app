import React, { memo, useEffect, useState } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import {
  Liquor,
  LocalDrinkOutlined,
  LocalFloristOutlined,
  Spa,
  SportsBarOutlined,
  WineBar,
} from "@mui/icons-material";

export const Loader = memo((): React.ReactElement => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const icons = [
    <SportsBarOutlined key={0} />,
    <LocalFloristOutlined key={1} />,
    <LocalDrinkOutlined key={2} />,
    <Spa key={3} />,
    <WineBar key={4} />,
    <Liquor key={5} />,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 250);

    return () => clearInterval(timer);
  }, [icons.length]);

  return (
    <Box sx={SX.BOX}>
      <CircularProgress sx={SX.PROGRESS} size={120} />
      <Box sx={SX.RANDOM}>{icons[currentIconIndex]}</Box>
    </Box>
  );
});
class SX {
  static BOX: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  static PROGRESS: SxProps<Theme> = {
    width: "200px",
  };
  static RANDOM: SxProps<Theme> = {
    position: "absolute",
    fontSize: "2.5rem",

    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
      color: (t) => t.palette.text.secondary,
    },
  };
}
