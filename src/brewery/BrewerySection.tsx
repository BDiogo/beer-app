import React, { Suspense } from "react";
import { memo } from "react";
import { Brewery } from "./interface/brewery";
import { DivIcon, LatLngExpression } from "leaflet";
import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css"; // Correct path to the CSS file

interface Props {
  brewery: Brewery;
}

const Map = React.lazy(() =>
  import("../common/Map").then((module) => ({ default: module.Map }))
);

export const BrewerySection = memo((props: Props): React.ReactElement => {
  const { brewery } = props;
  const markers = [
    {
      position: [brewery.longitude, brewery.latitude] as LatLngExpression,
      title: brewery.name,
      iconProp: brewery.image,
    },
  ];
  const createCustomIcon = (iconProp: string | number) => {
    return new DivIcon({
      className: "custom-marker",
      html: `<div class="marker-container">
              <img src="${iconProp}" alt="brewery" style="width:50px" />
            </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };
  return (
    <Box sx={SX.BOX}>
      <Grid size={{ xs: 12, sm: 12 }}>
        <Typography variant="h3">Brewery - {brewery.name}</Typography>
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          {brewery.type}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <Suspense fallback={<div>Loading map...</div>}>
          <Map
            markers={markers}
            icon={createCustomIcon}
            zoom={12}
            height="40vh"
            center={[brewery.longitude, brewery.latitude]}
          />
        </Suspense>
      </Grid>
    </Box>
  );
});

class SX {
  static BOX: SxProps<Theme> = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: (t) => `${t.spacing(3)}`,
    marginBottom: (t) => `${t.spacing(5)}`,
  };
}
