package service

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/lukitoki1/score-board/pkg/dto"
	"github.com/lukitoki1/score-board/pkg/entity"
	"github.com/lukitoki1/score-board/pkg/repo"
	"gorm.io/gorm"
)

type Service struct {
}

func New() *Service {
	return &Service{}
}

func (s *Service) CreateGame(db *gorm.DB, request dto.Game) (*dto.GameID, error) {
	game := request.GetGameEntity()
	score := request.GetScoreEntity()

	if err := db.Transaction(func(db *gorm.DB) error {
		game.Status = entity.GameStatusActive
		if result := repo.CreateGame(db, game); result.Error != nil {
			return fmt.Errorf("failed to save game entity: %w", result.Error)
		}

		score.GameID = game.ID
		if result := repo.CreateScore(db, score); result.Error != nil {
			return fmt.Errorf("failed to save score entity: %w", result.Error)
		}

		return nil
	}); err != nil {
		return nil, fmt.Errorf("failed to create game: %w", err)
	}

	return &dto.GameID{ID: game.ID}, nil
}

func (s *Service) UpdateGame(db *gorm.DB, gameID uuid.UUID, request dto.Game) error {
	game := request.GetGameEntity()
	score := request.GetScoreEntity()

	if err := db.Transaction(func(db *gorm.DB) error {
		result := repo.UpdateGame(db, gameID, game)
		if result.Error != nil {
			return fmt.Errorf("failed to upadte game entity: %w", result.Error)
		}
		if result.RowsAffected == 0 {
			return gorm.ErrRecordNotFound
		}

		score.GameID = gameID
		if result = repo.CreateScore(db, score); result.Error != nil {
			return fmt.Errorf("failed to save score entity: %w", result.Error)
		}

		return nil
	}); err != nil {
		return fmt.Errorf("failed to update game: %w", err)
	}

	return nil
}

func (s *Service) FinishGame(db *gorm.DB, gameID uuid.UUID) error {
	result := repo.UpdateGameStatus(db, gameID, entity.GameStatusFinished)
	if result.Error != nil {
		return fmt.Errorf("failed to finish game %v: %w", gameID, result.Error)
	}
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}

func (s *Service) GetGames(db *gorm.DB) ([]dto.Game, error) {
	var gameScores []entity.GameScore
	if result := repo.FindGameScores(db, &gameScores); result.Error != nil {
		return nil, fmt.Errorf("failed to find games: %w", result.Error)
	}

	response := make([]dto.Game, len(gameScores))
	for i, gameScore := range gameScores {
		response[i] = dto.Game{
			ID:        gameScore.ID,
			HomeName:  gameScore.HomeName,
			AwayName:  gameScore.AwayName,
			HomeScore: gameScore.HomeScore,
			AwayScore: gameScore.AwayScore,
		}
	}

	return response, nil
}
