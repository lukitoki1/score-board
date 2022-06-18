import { useQuery } from "react-query";
import { Query } from "../values/query";
import { useAxios } from "./useAxios";
import { GetGameDTO } from "../dto/game";

export const useGetGames = () => {
  const { axiosInstance } = useAxios()
  return useQuery([Query.GAMES], (): Promise<GetGameDTO[]> => axiosInstance.get('/games'))
}