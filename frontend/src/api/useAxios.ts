import axios, { AxiosError, AxiosInstance } from "axios";
import { useEnv } from "../hooks/useEnv";
import {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  HTTP_NOT_FOUND_STATUS
} from "../values/status";
import { useAppToast } from "../hooks/useToast";
import { TIMEOUT } from "../values/api";

let axiosInstance: AxiosInstance;

export const useAxios = () => {
  const { apiURL } = useEnv()

  const createInstance = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: apiURL,
      timeout: TIMEOUT,
    })

    instance.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      (error: AxiosError) => {
        const { triggerToast } = useAppToast(true)

        switch (error.response?.status) {
        case HTTP_NOT_FOUND_STATUS:
          triggerToast({
            title: "",
            description: "",
            status: "error"
          })
          break
        case HTTP_BAD_REQUEST_STATUS:
          triggerToast({
            title: "",
            description: "",
            status: "error"
          })
          break
        case HTTP_INTERNAL_SERVER_ERROR_STATUS:
        default:
          triggerToast({
            title: "",
            description: "",
            status: "error"
          })
          break
        }

        console.log(error);
        return Promise.reject(error.response);
      },
    );

    return instance
  }

  if (!axiosInstance) {
    axiosInstance = createInstance()
  }

  return { axiosInstance }
}


