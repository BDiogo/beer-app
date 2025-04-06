import React, { memo } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { SxProps, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorFilter } from "../common/ColorFilter";
import { BeerSelector } from "../store/beer/BeerSelector";
import { setFilter } from "../store/beer/BeerSlice";
import { useAppSelector, useAppDispatch } from "../store/hook";

export const Navigation = memo((): React.ReactElement => {
  const { ibu, ibuRange, srm, srmRange, abv, abvRange } = useAppSelector(
    (state) => BeerSelector.selectConstants(state)
  );
  const filter = useAppSelector((state) => BeerSelector.selectFilter(state));
  const dispatch = useAppDispatch();

  function setIbuFilter(value: [number, number]) {
    dispatch(setFilter({ ibu: value }));
  }

  function setSrmFilter(value: [number, number]) {
    dispatch(setFilter({ srm: value }));
  }

  function setAbvFilter(value: [number, number]) {
    dispatch(setFilter({ abv: value }));
  }
  return (
    <Box>
      <AppBar position="static" sx={SX.APP_BAR} elevation={0}>
        <Box sx={SX.APP_OPTIONS}>
          <Link to={"/list"}>
            <Typography sx={SX.LINK}>List </Typography>
          </Link>
          <Link to={"/map"}>
            <Typography sx={SX.LINK}>Map</Typography>
          </Link>
        </Box>

        <Box sx={{ flex: "1", display: { xs: "block", sm: "none" } }}>
          <Link to={"/list"}>
            <Typography sx={SX.LINK}>List</Typography>
          </Link>
        </Box>
        <Box sx={SX.LOGO}>
          <Typography variant="h1" sx={{ lineHeight: ".85em" }}>
            Beers
          </Typography>
          <Typography
            variant="h4"
            sx={{ lineHeight: ".7em", fontFamily: "Caveat" }}
          >
            of the World
          </Typography>
        </Box>

        <Box sx={{ flex: "1", display: { xs: "block", sm: "none" } }}>
          <Link to={"/map"}>
            <Typography sx={SX.LINK}>Map</Typography>
          </Link>
        </Box>
        <Box sx={SX.FILTER_ROW}>
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            Filtering
          </Typography>
          <ColorFilter
            colors={ibu}
            rangeMin={ibuRange[0]}
            rangeMax={ibuRange[1]}
            value={filter.ibu}
            label="Bitterness"
            setValue={setIbuFilter}
          ></ColorFilter>

          <ColorFilter
            colors={srm}
            rangeMin={srmRange[0]}
            rangeMax={srmRange[1]}
            value={filter.srm}
            label="Color"
            setValue={setSrmFilter}
          />

          <ColorFilter
            colors={abv}
            rangeMin={abvRange[0]}
            rangeMax={abvRange[1]}
            value={filter.abv}
            label="Alcohol%"
            setValue={setAbvFilter}
          />
        </Box>
      </AppBar>
    </Box>
  );
});

class SX {
  static APP_OPTIONS: SxProps<Theme> = {
    flexDirection: "row",
    gap: (t) => t.spacing(4),
    flex: 1,
    display: { xs: "none", sm: "flex" },
  };

  static FILTER_ROW: SxProps<Theme> = {
    flexDirection: "row",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: (t) => `${t.spacing(1)}`,
    paddingTop: (t) => `${t.spacing(4)}`,
    flex: { xs: "1 1 100%", sm: "1" },
  };

  static APP_BAR: SxProps<Theme> = {
    width: "100%",
    justifyContent: "space-between",
    bgcolor: "common.white",
    flexDirection: "row",
    gap: (t) => t.spacing(4),
    display: "flex",
    alignItems: "center",
    padding: (t) => `0 ${t.spacing(4)}`,
    flexWrap: { xs: "wrap", sm: "nowrap" },
  };

  static LOGO: SxProps<Theme> = {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    position: "relative",
    lineHeight: ".5em",

    "& :after": {
      content: '""',
      position: "absolute",
      left: "15%",
      width: "70%",
      height: "6px",
      top: "120%",
      borderRadius: "2px",
      backgroundColor: (t) => ` ${t.palette.primary.main}`,
    },
  };

  static LINK: SxProps<Theme> = {
    textDecoration: "none",
    color: "text.primary",
    fontWeight: 700,
    textShadow: "none",
    fontSize: "1.2rem",
  };
}
