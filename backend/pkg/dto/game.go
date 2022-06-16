package dto

import (
	"github.com/google/uuid"
)

type Game struct {
	ID        uuid.UUID `json:"id,omitempty"`
	HomeName  string    `json:"homeName" validate:"required"`
	AwayName  string    `json:"awayName" validate:"required"`
	HomeScore int       `json:"homeScore" validate:"required,number,min=0"`
	AwayScore int       `json:"awayScore" validate:"required,number,min=0"`
}

type GameID struct {
	ID uuid.UUID `json:"id"`
}
