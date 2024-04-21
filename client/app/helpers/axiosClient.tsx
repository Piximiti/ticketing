import axios from "axios";
import { headers } from "next/headers";

export default function axiosClient() {
  const headersObj: Record<string, string> = {};
  headers().forEach((header, key) => {
    headersObj[key] = header;
  });

  return axios.create({
    baseURL: "http://www.digibay.pw/",
    headers: headersObj,
  });
}
