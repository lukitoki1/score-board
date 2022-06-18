import { GameDTO } from "../../dto/game";
import { Button, HStack, Td, Tr } from "@chakra-ui/react";
import { BiArrowToRight, BiTable } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { FC, ReactNode } from "react";

export interface ScoreBoardGamesItemProps {
  game: GameDTO;
  onFinish: () => void;
  onUpdate: () => void;
}

export const ScoreBoardGamesItem: FC<ScoreBoardGamesItemProps> = ({ game, onFinish, onUpdate }) => {
  const { t } = useTranslation()

  return (
    <Tr>
      <Td>{game.homeName}</Td>
      <Td>{game.awayName}</Td>
      <ScoreDisplay>{game.homeScore}</ScoreDisplay>
      <ScoreDisplay>{game.awayScore}</ScoreDisplay>
      <Td isNumeric>
        <HStack spacing="2" justify="right">
          <Button onClick={onUpdate} leftIcon={<BiTable/>}>
            {t('gamesTable.data.update')}
          </Button>
          <Button onClick={onFinish} leftIcon={<BiArrowToRight/>}>
            {t('gamesTable.data.finish')}
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}

interface ScoreDisplayProps {
  children?: ReactNode;
}

const ScoreDisplay: FC<ScoreDisplayProps> = ({ children }) => (
  <Td fontWeight="bold" fontSize="2xl" isNumeric>{children}</Td>
)