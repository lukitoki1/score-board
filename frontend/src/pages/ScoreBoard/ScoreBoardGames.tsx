import { FC } from "react";
import { useGetGames } from "../../api/useGetGames";
import { Center, Spinner, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ScoreBoardGamesItem } from "./ScoreBoardGamesItem";
import { useFinishGame } from "../../api/useFinishGame";
import { GetGameDTO } from "../../dto/game";

export const ScoreBoardGames: FC = () => {
  const { data, isLoading, isError } = useGetGames()
  const finishMutation = useFinishGame()
  const { t } = useTranslation()

  const onFinish = async (game: GetGameDTO) => {
    await finishMutation.mutateAsync(game.id)
  }

  const onUpdate = (game: GetGameDTO) => {
    console.log("update")
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
            onUpdate={() => onUpdate(game)}
          />
        ))}
      </Tbody>
    </Table>
  );
}