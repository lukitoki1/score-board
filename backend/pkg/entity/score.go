package entity

import "github.com/google/uuid"

type Score struct {
	Entity
	HomeScore int
	AwayScore int

	GameID uuid.UUID
	Game   Game
}
