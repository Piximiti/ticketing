import { useState } from "react";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import Alert from "@/app/components/Alert";
import { IErrorResponse, IRequest } from "@/app/types/interfaces";

export default function useRequest({ url, method, body, onSuccess }: IRequest) {
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const doRequest = async <T = {},>(params: T = {} as T) => {
    try {
      setErrors(null);
      const { data }: AxiosResponse<any> = await axios[method](url, {
        ...body,
        ...params,
      });
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const err = error as AxiosError<IErrorResponse>;
        setErrors(<Alert errors={err?.response?.data?.errors || []} />);
      }
    }
  };

  return { doRequest, errors };
}
