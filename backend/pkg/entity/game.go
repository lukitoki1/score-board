package entity

type GameStatus string

const (
	GameStatusActive   GameStatus = "ACTIVE"
	GameStatusFinished GameStatus = "FINISHED"
)

type Game struct {
	Entity
	Status   GameStatus
	HomeName string
	AwayName string
}
