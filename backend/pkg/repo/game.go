package repo

import (
	"github.com/lukitoki1/score-board/pkg/entity"
	"gorm.io/gorm"
)

func CreateGame(db *gorm.DB, game *entity.Game) *gorm.DB {
	return db.Create(game)
}
