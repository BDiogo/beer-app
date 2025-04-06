import React, { memo, useMemo } from "react";
import { useAppSelector } from "../store/hook";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Utils } from "../utils/Utils";
import { BeerSelector } from "../store/beer/BeerSelector";
import { BrewerySection } from "../brewery/BrewerySection";
import bottleImage from "../assets/bottle.svg";

export const BeerDetails = memo((): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { ibu, ibuRange, srm, srmRange, abv, abvRange } = useAppSelector(
    (state) => BeerSelector.selectConstants(state)
  );
  const beer = useAppSelector((state) => BeerSelector.selectById(state, id));

  const ibuColor = useMemo(
    () => Utils.converBeerValueToColor(ibu, ibuRange, beer?.ibu),
    [beer?.ibu, ibu, ibuRange]
  );
  const abvColor = useMemo(
    () => Utils.converBeerValueToColor(abv, abvRange, beer?.abv),
    [beer?.abv, abv, abvRange]
  );
  const srmColor = useMemo(
    () => Utils.converBeerValueToColor(srm, srmRange, beer?.srm),
    [beer?.srm, srm, srmRange]
  );

  if (!beer) {
    return <div>Beer not found</div>;
  }

  return (
    <Container>
      <Grid container spacing={2} sx={SX.BEER}>
        <Grid size={{ xs: 12, sm: 7 }} sx={SX.COLUMN}>
          <Box sx={SX.STATS}>
            <Box sx={SX.STAT_ROW}>
              <Box>
                <Typography variant="h5" sx={SX.STAT_TITLE}>
                  {beer.abv}% ABV
                </Typography>
                <Typography variant="caption" sx={SX.STAT_DETAIL}>
                  ABV varies by craft beer style from around 3% to more than
                  20%.
                </Typography>
              </Box>
              <Box sx={SX.BALL(abvColor)}></Box>
            </Box>
            {beer.ibu !== null && (
              <Box sx={SX.STAT_ROW}>
                <Box>
                  <Typography variant="h5" sx={SX.STAT_TITLE}>
                    {beer.ibu} IBU
                  </Typography>
                  <Typography variant="caption" sx={SX.STAT_DETAIL}>
                    IBU is the measure of hops’ contribution to a beer's
                    bitterness [0 to 100].
                  </Typography>
                </Box>
                <Box sx={SX.BALL(ibuColor)}></Box>
              </Box>
            )}
            <Box sx={SX.STAT_ROW}>
              <Box>
                <Typography variant="h5" sx={SX.STAT_TITLE}>
                  {beer.srm}% SRM
                </Typography>
                <Typography variant="caption" sx={SX.STAT_DETAIL}>
                  SRM refers to a beer’s color [1 to 40].
                </Typography>
              </Box>
              <Box sx={SX.BALL(srmColor)}></Box>
            </Box>
          </Box>
          <Box
            component="img"
            src={beer.image ? beer.image : bottleImage}
            alt="Beer Bottle"
            loading="lazy"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h3">{beer.name}</Typography>
          <Typography
            variant="h5"
            sx={{ color: "text.secondary", marginBottom: 2 }}
          >
            {beer.style}
          </Typography>
          <Typography variant="body1">{beer.description}</Typography>
        </Grid>
        <BrewerySection brewery={beer.brewery} />
      </Grid>
    </Container>
  );
});

class SX {
  static BEER: SxProps<Theme> = {
    padding: (t) => `${t.spacing(3)} 0`,
    alignItems: "center",
  };

  static COLUMN: SxProps<Theme> = {
    textAlign: "right",
    padding: (t) => `${t.spacing(3)} 0`,
    flexDirection: "row",
    display: "flex",

    "& img": {
      padding: (t) => `${t.spacing(2)} `,
      width: "calc(100% - 200px)",
      position: "relative",
      objectFit: "cover",
      zIndex: 0,
    },
  };

  static STATS: SxProps<Theme> = {
    flex: 1,
    width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "end",
    zIndex: 1,
  };
  static STAT_ROW: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: (t) => `${t.spacing(1)} 0`,
    justifyContent: "center",
  };

  static STAT_TITLE: SxProps<Theme> = {
    flex: 1,
    fontFamily: "Caveat,sans-serif",
    fontWeight: 700,
  };

  static STAT_DETAIL: SxProps<Theme> = {
    color: "text.secondary",
    lineHeight: "1.2em",
    display: "block",
  };

  static BALL = (color: { r: number; g: number; b: number }): SxProps => ({
    width: "60px",
    minWidth: "60px",
    height: "60px",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "background.paper",
    borderRadius: "50%",
    transform: "translateX(50%)",
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    margin: "0 auto",
  });
}
