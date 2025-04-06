import React from "react";
import { memo } from "react";
import { Brewery } from "./brewery";
import Leaflet, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css"; // Correct path to the CSS file

interface Props {
  brewery: Brewery;
}

const Map = React.lazy(() => import("./Map"));

export const BrewerySection = memo((props: Props): React.ReactElement => {
  const { brewery } = props;
  const markers = [
    {
      position: [brewery.longitude, brewery.latitude] as LatLngExpression,
      title: brewery.name,
    },
  ];

  return (
    <Box sx={SX.MAP_BOX}>
      <MapContainer center={[51.505, -0.09]} zoom={3}>
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
});
class SX {
  static MAP_BOX = {
    display: "block",
    width: "100%",
    height: "500px",
  };
}
