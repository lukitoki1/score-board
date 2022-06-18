import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "./useAxios";
import { useAppToast } from "../hooks/useToast";
import { useTranslation } from "react-i18next";
import { Query } from "../values/query";

export const useFinishGame = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios()
  const { triggerToast } = useAppToast()
  const { t } = useTranslation()

  return useMutation((gameID: string) => axiosInstance.delete(`/games/${gameID}`), {
    onMutate: () => {
      queryClient.cancelQueries([Query.GAMES]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([Query.GAMES]);
      triggerToast({
        title: t('toast.success.finishGame.title'),
        description: t('toast.success.finishGame.description'),
        status: "success"
      });
    },
  })
}