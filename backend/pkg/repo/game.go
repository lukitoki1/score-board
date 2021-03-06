package repo

import (
	"github.com/google/uuid"
	"github.com/lukitoki1/score-board/pkg/entity"
	"gorm.io/gorm"
)

func CreateGame(db *gorm.DB, game *entity.Game) *gorm.DB {
	return db.Create(game)
}

func UpdateGame(db *gorm.DB, gameID uuid.UUID, game *entity.Game) *gorm.DB {
	return db.Where(gameID).Where(entity.Game{Status: entity.GameStatusActive}).Updates(game)
}

func UpdateGameStatus(db *gorm.DB, gameID uuid.UUID, status entity.GameStatus) *gorm.DB {
	return db.Model(entity.Game{}).Where(gameID).Updates(entity.Game{Status: status})
}
