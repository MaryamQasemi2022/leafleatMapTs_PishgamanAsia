import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  message: string;
  requestNo?: string | null;
};
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { vehicleUserTypeId, source, destination } = req.body;
  const { token } = req.cookies;
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        {
          userToken: token,
          vehicleUserTypeId,
          source,
          destination,
        }
      );

      if (response.data.data) {
        const { requestNo } = response.data.data;

        res.status(200).json({ message: response.data.message, requestNo });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
};

export default handler;
