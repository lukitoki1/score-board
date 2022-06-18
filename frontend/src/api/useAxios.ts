import axios, { AxiosError, AxiosInstance } from "axios";
import { useEnv } from "../hooks/useEnv";
import {
  HTTP_BAD_REQUEST_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  HTTP_NOT_FOUND_STATUS
} from "../values/status";
import { useAppToast } from "../hooks/useToast";
import { TIMEOUT } from "../values/api";
import { useTranslation } from "react-i18next";

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
        const { t } = useTranslation()

        switch (error.response?.status) {
        case HTTP_NOT_FOUND_STATUS:
          triggerToast({
            title: t("errors.notFound.title"),
            description: t("errors.notFound.description"),
            status: "error"
          })
          break
        case HTTP_BAD_REQUEST_STATUS:
          triggerToast({
            title: t("errors.badRequest.title"),
            description: t("errors.badRequest.description"),
            status: "error"
          })
          break
        case HTTP_INTERNAL_SERVER_ERROR_STATUS:
        default:
          triggerToast({
            title: t("errors.internal.title"),
            description: t("errors.internal.description"),
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


