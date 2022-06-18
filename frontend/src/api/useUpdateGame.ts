import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { useAppToast } from "../hooks/useToast";
import { useTranslation } from "react-i18next";
import { UpdateGameDTO } from "../dto/game";
import { Query } from "../values/query";

interface UpdateGameRequest {
  gameID: string;
  payload: UpdateGameDTO;
}

export const useUpdateGame = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios()
  const { triggerToast } = useAppToast()
  const { t } = useTranslation()

  return useMutation(({
    gameID,
    payload
  }: UpdateGameRequest) => axiosInstance.put(`/games/${gameID}`, payload), {
    onMutate: async () => {
      await queryClient.cancelQueries([Query.GAMES]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([Query.GAMES]);
      triggerToast({
        title: t('toast.success.updateGame.title'),
        description: t('toast.success.updateGame.description'),
        status: "success"
      });
    },
  })
}