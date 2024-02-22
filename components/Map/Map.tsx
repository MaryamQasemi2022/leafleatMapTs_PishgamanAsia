import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import UserLocation from "./UserLocation";
interface LocListInterface {
  id: string;
  name: string;
  position: [number, number];
  icon: string;
  selected: boolean;
}

interface PropType {
  locList: LocListInterface[];
  setLocList: (value: React.SetStateAction<LocListInterface[]>) => void;
  pos: L.LatLngExpression | null;
  setPos: (value: React.SetStateAction<L.LatLngExpression | null>) => void;
}
const Map = ({ locList, setLocList, pos, setPos }: PropType) => {
  return (
    <div className="map_box">
      <MapContainer
        style={{ position: "absolute", width: "100%", height: "100%" }}
        center={[29.616894267129265, 412.5258990515247]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://map.pishgaman.ir/copyright">OpenStreetMap</a> contributors'
          url="https://map.pishgamanasia.ir/tile/{z}/{x}/{y}.png
          "
        />
        <LocationMarker locList={locList} setLocList={setLocList} />
        <UserLocation pos={pos} setPos={setPos} />
      </MapContainer>
    </div>
  );
};

export default Map;
