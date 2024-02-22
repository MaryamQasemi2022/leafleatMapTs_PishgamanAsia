import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { toast } from "react-toastify";
interface PropType {
  pos: L.LatLngExpression | null;
  setPos: (value: React.SetStateAction<L.LatLngExpression | null>) => void;
}
const UserLocation = ({ pos, setPos }: PropType) => {
  const map = useMap();
  const ShowLocation = () => {
    map
      .locate()
      .on("locationfound", (e) => {
        setPos(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      })
      .on("locationerror", (error) => {
        toast.warn(error.message);
      });
  };

  useEffect(() => {
    ShowLocation();
  }, []);
  return (
    <>
      {pos && (
        <Marker
          position={pos}
          icon={L.icon({
            iconUrl: "/images/markerIcon.png",
            iconSize: [25, 40],
          })}
        />
      )}
    </>
  );
};

export default UserLocation;
