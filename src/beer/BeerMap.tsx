import React, { Suspense } from "react";
import { memo } from "react";
import { DivIcon, LatLngExpression } from "leaflet";
import { Grid, SxProps, Theme } from "@mui/material";
import "leaflet/dist/leaflet.css"; // Correct path to the CSS file
import { Utils } from "../utils/Utils";
import { BeerSelector } from "../store/beer/BeerSelector";
import { useAppSelector } from "../store/hook";
import { BeerSingle } from "./BeerListSingle";

const Map = React.lazy(() =>
  import("../common/Map").then((module) => ({ default: module.Map }))
);

export const BeerMap = memo((): React.ReactElement => {
  const { srm, srmRange } = useAppSelector((state) =>
    BeerSelector.selectConstants(state)
  );
  const beers = useAppSelector((state) => BeerSelector.selectFilteredDetails(state));

  const markers = beers.map((beer) => ({
    position: Utils.shiftCoordinate([
      beer.brewery.longitude,
      beer.brewery.latitude,
    ]) as LatLngExpression,
    title: beer.name,
    iconProp: beer.srm,
    customPopup: <BeerSingle beer={beer} isSmall={true} />,
  }));

  const createCustomIcon = (markerSrm: number | string) => {
    const srmColor = Utils.converBeerValueToColor(
      srm,
      srmRange,
      markerSrm as number
    );

    return new DivIcon({
      className: "custom-marker",
      html: `<div class="marker-container" style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgb(${srmColor.r}, ${srmColor.g}, ${srmColor.b});
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };
  return (
    <Grid container spacing={2} sx={SX.BEER_MAP}>
      <Grid size={{ xs: 12, sm: 12 }}>
        <Suspense fallback={<div>Loading map...</div>}>
          <Map
            markers={markers}
            icon={createCustomIcon}
            zoom={3}
            center={[20, 0]}
            height="calc(100vh - 16rem)"
          />
        </Suspense>
      </Grid>
    </Grid>
  );
});

class SX {
  static BEER_MAP: SxProps<Theme> = {
    width: "100%",
    paddingTop: (t) => `${t.spacing(2)}`,
    overflow: "hidden",
  };
}
