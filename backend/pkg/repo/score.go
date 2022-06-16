package repo

import (
	"github.com/lukitoki1/score-board/pkg/entity"
	"gorm.io/gorm"
)

func CreateScore(db *gorm.DB, score *entity.Score) *gorm.DB {
	return db.Create(score)
}
