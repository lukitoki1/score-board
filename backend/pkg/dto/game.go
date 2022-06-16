package dto

import (
	"github.com/google/uuid"
	"github.com/lukitoki1/score-board/pkg/entity"
)

type GameID struct {
	ID uuid.UUID `json:"id"`
}

type Game struct {
	ID        uuid.UUID `json:"id,omitempty"`
	HomeName  string    `json:"homeName" validate:"required"`
	AwayName  string    `json:"awayName" validate:"required"`
	HomeScore int       `json:"homeScore" validate:"required,number,min=0"`
	AwayScore int       `json:"awayScore" validate:"required,number,min=0"`
}

func (g Game) GetGameEntity() *entity.Game {
	return &entity.Game{
		HomeName: g.HomeName,
		AwayName: g.AwayName,
	}
}

func (g Game) GetScoreEntity() *entity.Score {
	return &entity.Score{
		HomeScore: g.HomeScore,
		AwayScore: g.AwayScore,
	}
}
