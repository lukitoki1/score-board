import { FC } from "react";
import { ScoreBoardCreateGame } from "./ScoreBoardCreateGame";
import { ScoreBoardGames } from "./ScoreBoardGames";

export const ScoreBoard: FC = () => {
  return (
    <>
      <ScoreBoardCreateGame/>
      <ScoreBoardGames/>
    </>
  )
}