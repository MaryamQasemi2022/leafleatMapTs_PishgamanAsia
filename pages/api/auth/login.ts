import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import cookie from "cookie";
type ResponseData = {
  message: string;
  userToken?: string | null;
};
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://exam.pishgamanasia.com/webapi/Account/Login",
        req.body
      );
      if (response.data.data) {
        const { userToken } = response.data.data;

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", userToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })
        );
        res.status(200).json({ message: response.data.message, userToken });
      } else {
        res
          .status(200)
          .json({ message: response.data.message, userToken: null });
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
