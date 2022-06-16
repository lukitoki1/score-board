package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/util"
	"net/http"
)

func (s *ScoreBoardServer) finishGame(c *gin.Context) {
	gameID, err := util.ParseUUIDParam(c, "gameID")
	if err != nil {
		util.AbortWithValidationError(c, err)
		return
	}

	if err = s.service.FinishGame(database.Get(c), gameID); err != nil {
		util.AbortWithInternalServerError(c, err)
	}

	c.Status(http.StatusOK)
}
