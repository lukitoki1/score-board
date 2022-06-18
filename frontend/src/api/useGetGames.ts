import { useQuery } from "react-query";
import { Query } from "../values/query";
import { useAxios } from "./useAxios";
import { GameDTO } from "../dto/game";

export const useGetGames = () => {
  const { axiosInstance } = useAxios()
  return useQuery([Query.GAMES], (): Promise<GameDTO[]> => axiosInstance.get('/games'))
}