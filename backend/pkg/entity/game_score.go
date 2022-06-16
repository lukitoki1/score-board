package entity

import "github.com/google/uuid"

type GameScore struct {
	ID        uuid.UUID
	HomeName  string
	AwayName  string
	HomeScore int
	AwayScore int
}
