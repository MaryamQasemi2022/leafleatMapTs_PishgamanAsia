import React, { useMemo, useState } from "react";
import L from "leaflet";
import dynamic from "next/dynamic";
import RequestBox from "@/components/Map/RequestBox";

const MapPage = () => {
  interface LocListInterface {
    id: string;
    name: string;
    position: [number, number];
    icon: string;
    selected: boolean;
  }

  const [locList, setLocList] = useState<LocListInterface[]>([
    {
      id: "1",
      name: "start",
      position: [29.616894267129265, 412.5258990515247],
      icon: "/images/Flag_icon_green.png",
      selected: false,
    },
    {
      id: "2",
      name: "end",
      position: [29.606894267129265, 412.5258990515247],
      icon: "/images/Flag_icon_orange.png",
      selected: false,
    },
  ]);
  const [pos, setPos] = useState<null | L.LatLngExpression>(null);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div
      style={{
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <RequestBox locList={locList} pos={pos} />
      <Map
        locList={locList}
        setLocList={setLocList}
        pos={pos}
        setPos={setPos}
      />
    </div>
  );
};

export default MapPage;
