package service

import (
	"fmt"
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
	game := &entity.Game{
		Status:   entity.GameStatusActive,
		HomeName: request.HomeName,
		AwayName: request.AwayName,
	}

	score := &entity.Score{
		HomeScore: request.HomeScore,
		AwayScore: request.AwayScore,
	}

	if err := db.Transaction(func(db *gorm.DB) error {

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
