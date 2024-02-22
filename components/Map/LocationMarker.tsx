import React, { useState } from "react";
import L from "leaflet";

import { Marker, useMapEvent } from "react-leaflet";
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
}

const LocationMarker = ({ locList, setLocList }: PropType) => {
  useMapEvent("mousemove", (e) => {
    const locStart = locList.find((loc) => loc.name === "start");
    const locEnd = locList.find((loc) => loc.name === "end");
    let updateLocList: LocListInterface[];
    if (!locStart?.selected) {
      updateLocList = locList.map((item) => {
        if (item.name === "start") {
          return {
            ...item,
            position: [e.latlng.lat, e.latlng.lng],
          };
        } else {
          return item;
        }
      });
      setLocList(updateLocList);
    } else if (!locEnd?.selected) {
      updateLocList = locList.map((item) => {
        if (item.name === "end") {
          return {
            ...item,
            position: [e.latlng.lat, e.latlng.lng],
          };
        } else {
          return item;
        }
      });
      setLocList(updateLocList);
    }
  });
  useMapEvent("click", (e) => {
    const locStart = locList.find((loc) => loc.name === "start");
    const locEnd = locList.find((loc) => loc.name === "end");
    let updateLocList: LocListInterface[];
    if (!locStart?.selected) {
      updateLocList = locList.map((item) => {
        if (item.name === "start") {
          return {
            ...item,
            position: [e.latlng.lat, e.latlng.lng],
            selected: !item.selected,
          };
        } else {
          return item;
        }
      });
      setLocList(updateLocList);
    } else if (!locEnd?.selected) {
      updateLocList = locList.map((item) => {
        if (item.name === "end") {
          return {
            ...item,
            position: [e.latlng.lat, e.latlng.lng],
            selected: !item.selected,
          };
        } else {
          return item;
        }
      });
      setLocList(updateLocList);
    }
  });

  return (
    <>
      {locList.map((item) => (
        <Marker
          key={item.id}
          position={item.position}
          icon={L.icon({
            iconUrl: item.icon,
            iconSize: [35, 61],
          })}
        />
      ))}
    </>
  );
};

export default LocationMarker;
