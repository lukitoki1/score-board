import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { Query } from "../values/query";
import { useAppToast } from "../hooks/useToast";
import { useAxios } from "./useAxios";
import { CreateGameDTO } from "../dto/game";

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios()
  const { triggerToast } = useAppToast()
  const { t } = useTranslation()


  return useMutation((payload: CreateGameDTO) => axiosInstance.post('/games', payload), {
    onMutate: () => {
      queryClient.cancelQueries([Query.GAMES]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([Query.GAMES]);
      triggerToast({
        title: t('toast.success.createGame.title'),
        description: t('toast.success.createGame.description'),
        status: "success"
      });
    },
  })
}