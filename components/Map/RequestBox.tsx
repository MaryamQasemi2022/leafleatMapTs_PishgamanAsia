import React, { ChangeEvent, useEffect, useState } from "react";
import L from "leaflet";

import axios from "axios";
import { toast } from "react-toastify";
interface LocListInterface {
  id: string;
  name: string;
  position: [number, number];
  icon: string;
  selected: boolean;
}
interface PropType {
  locList: LocListInterface[];
  pos: L.LatLngExpression | null | any;
}
const RequestBox = ({ locList, pos }: PropType) => {
  const locSource: LocListInterface | undefined = locList.find(
    (loc) => loc.name === "start"
  );
  const locDestrition: LocListInterface | undefined = locList.find(
    (loc) => loc.name === "end"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allowedToSendReq, setAllowedToSendReq] = useState<boolean>(false);
  const [vehicleUserTypeId, setVehicleUserTypeId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    if (locSource?.selected && locDestrition?.selected && vehicleUserTypeId) {
      setAllowedToSendReq(true);
    }
  }, [locList, searchTerm, vehicleUserTypeId]);

  const handleGetVehicleUser = async () => {
    if (searchTerm.length < 2) {
      toast.error("متن جستجو میبایست حداقل دو کاراکتر باشد. ");

      return;
    }
    try {
      const response = await axios.get(
        `/api/getVehicle?searchTerm=${searchTerm}`
      );
      if (response.data.data) {
        setVehicleUserTypeId(response.data.data.id ? response.data.data.id : 1);
        setInfo("ok");

        toast.success(response.data.message);
      } else {
        toast.warn(response.data.message);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
    return;
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post("/api/sendRequest", {
        vehicleUserTypeId: vehicleUserTypeId,
        source: `${locSource?.position[0]},${locSource?.position[1]}`,
        destination: `${locDestrition?.position[0]},${locDestrition?.position[1]}`,
      });
      const { requestNo } = response.data;

      toast.success(`__${requestNo}__در خواست شما با شماره پیگیری ارسال شد`);
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    e.target.value.length > 1
      ? setError("")
      : setError("متن جستجو میبایست حداقل دو کاراکتر باشد.");
  };
  return (
    <div className="request_box">
      {pos && (
        <div className="my-location">
          <img src="/images/markerIcon.png" />
          <span> موقعیت کنونی</span>

          {pos.lat ? (
            <div>
              <span>
                {pos.lat}_{pos.lng}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <div className="source">
        <img src="/images/Flag_icon_green.png" />
        <span> مبدا</span>

        <div>
          <span>{locSource?.selected ? locSource?.position[1] : ""}</span> _
          <span>{locSource?.selected ? locSource?.position[0] : ""}</span>
        </div>
      </div>
      <div className="destination">
        <img src="/images/Flag_icon_orange.png" />
        <span> مقصد</span>
        <div>
          <span>
            {locDestrition?.selected ? locDestrition?.position[1] : ""}
          </span>
          _
          <span>
            {locDestrition?.selected ? locDestrition?.position[0] : ""}
          </span>
        </div>
      </div>

      <div className="search_box">
        <input
          value={searchTerm}
          onChange={handleChange}
          type="text"
          placeholder=" نوع ماشین الات را جستجو کن.."
        />
        <button onClick={handleGetVehicleUser}>
          <i className="bi bi-search"></i>
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {info && (
        <p style={{ color: "blue" }}>{`${searchTerm}_${vehicleUserTypeId}`}</p>
      )}

      <button
        onClick={handleSendRequest}
        disabled={!allowedToSendReq}
        type="submit"
        className="btn "
        style={{
          width: "100%",
          backgroundColor: "#FFC107",
          boxShadow: "5px 5px 10px #958b8b",
          borderRadius: "14px",
        }}
      >
        {allowedToSendReq
          ? "ثبت درخواست"
          : "ابتدا مبدا و مقصد و نوع ماشین را انتخاب کنید"}
      </button>
    </div>
  );
};

export default RequestBox;
