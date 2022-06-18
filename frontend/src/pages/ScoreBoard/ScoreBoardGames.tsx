import { FC, useState } from "react";
import { useGetGames } from "../../api/useGetGames";
import { Center, Spinner, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ScoreBoardGamesItem } from "./ScoreBoardGamesItem";
import { useFinishGame } from "../../api/useFinishGame";
import { GameDTO } from "../../dto/game";
import { ScoreBoardUpdateGame } from "./ScoreBoardUpdateGame";

export const ScoreBoardGames: FC = () => {
  const [gameToUpdate, setGameToUpdate] = useState<GameDTO | undefined>();

  const { data, isLoading, isError } = useGetGames()
  const mutation = useFinishGame()
  const { t } = useTranslation()

  const onFinish = async (game: GameDTO) => {
    await mutation.mutateAsync(game.id)
  }

  const onOpenUpdateModal = (game: GameDTO) => {
    setGameToUpdate(game)
  }

  const onCloseUpdateModal = () => {
    setGameToUpdate(undefined)
  }

  if (isLoading) {
    return (
      <Center>
        <Spinner/>
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>{t('gamesTable.error')}</Center>;
  }

  if (data.length === 0) {
    return <Center>{t('gamesTable.empty')}</Center>;
  }

  return (
    <>
      <ScoreBoardUpdateGame game={gameToUpdate} onClose={onCloseUpdateModal}/>
      <Table>
        <Thead>
          <Tr>
            <Th>{t('gamesTable.head.homeName')}</Th>
            <Th>{t('gamesTable.head.awayName')}</Th>
            <Th isNumeric>{t('gamesTable.head.homeScore')}</Th>
            <Th isNumeric>{t('gamesTable.head.awayScore')}</Th>
            <Th isNumeric>{t('gamesTable.head.actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((game) => (
            <ScoreBoardGamesItem
              key={game.id}
              game={game}
              onFinish={() => onFinish(game)}
              onUpdate={() => onOpenUpdateModal(game)}
            />
          ))}
        </Tbody>
      </Table>
    </>
  );
}