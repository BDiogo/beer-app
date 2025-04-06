import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon, LatLngExpression } from "leaflet";
import { memo, ReactElement } from "react";

interface MapProps {
  markers: Array<{
    position: LatLngExpression;
    title: string;
    iconProp: string | number;
    customPopup?: ReactElement;
  }>;
  icon: (iconProp: number | string) => DivIcon;
  zoom: number;
  height: string;
  center: [number, number];
}

export const Map = memo((props: MapProps): React.ReactElement => {
  const { markers, icon, zoom, center, height } = props;
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={2}
      style={{ width: "100%", height }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={icon(marker.iconProp)}
        >
          <Popup maxWidth={260}>
            {marker.customPopup ? marker.customPopup : marker.title}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});
