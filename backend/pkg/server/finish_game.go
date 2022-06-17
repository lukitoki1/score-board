package server

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/util"
	"gorm.io/gorm"
	"net/http"
)

func (s *ScoreBoardServer) finishGame(c *gin.Context) {
	gameID, err := util.ParseUUIDParam(c, "gameID")
	if err != nil {
		util.AbortWithValidationError(c, err)
		return
	}

	if err = s.service.FinishGame(database.Get(c), gameID); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			util.AbortWithNotFoundError(c, err)
			return
		}

		util.AbortWithInternalServerError(c, err)
		return
	}

	c.Status(http.StatusOK)
}
