import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  message: string;
  data?: [] | null | [{ id: number; name: string }];
};
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { searchTerm } = req.query; //{searchTerm:"taxi"}
  const token = req.cookies.token;

  try {
    const response = await axios.get(
      `https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?SearchTerm=${searchTerm}&UserToken=${token}`,
      {}
    );
    if (response.data.status === 1) {
      res
        .status(200)
        .json({ message: response.data.message, data: response.data.data });
    } else {
      res.status(200).json({ message: response.data.message, data: null });
    }
  } catch (e: any) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
export default handler;
