import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./store/hook";
import {
  alpha,
  IconButton,
  Paper,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { BeerThunk } from "./store/beer/BeerThunk";
import { BreweryThunk } from "./store/beer/BreweryThunk";
import { Loader } from "./common/Loader";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export function Layout(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { list, loading, brewery } = useAppSelector((state) => state.beers);

  useEffect(() => {
    if (!list.length) {
      dispatch(BeerThunk.fetchBeers());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    if (!brewery.length) {
      dispatch(BreweryThunk.fetchBrewerys());
    }
  }, [dispatch, brewery.length]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Navigation />
      <Outlet />
      <Paper sx={SX.CARD} elevation={0}>
        <Typography variant="h3">
          Life is too short to drink bad beer.
        </Typography>
      </Paper>
      <Link to="/list/add">
        <Tooltip title="Beer">
          <IconButton sx={SX.BUTTON_ADD} size="large">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
}
class SX {
  static CARD: SxProps<Theme> = {
    backgroundColor: (t) => t.palette.primary.main,
    color: (t) => t.palette.background.paper,
    justifyContent: "center",
    padding: (t) => `${t.spacing(4)} ${t.spacing(2)}`,
    textAlign: "center",
    borderRadius: 0,
  };
  static BUTTON_ADD: SxProps<Theme> = {
    position: "fixed",
    right: (t) => t.spacing(2),
    bottom: (t) => t.spacing(2),
    width: "60px",
    height: "60px",
    boxShadow: (t) => t.shadows[3],
    backgroundColor: (t) => t.palette.background.paper,

    "&:hover": {
      backgroundColor: (t) => alpha(t.palette.background.paper, 0.8),
    },

    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  };
}
