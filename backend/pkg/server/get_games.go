package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/util"
	"net/http"
)

func (s *ScoreBoardServer) getGames(c *gin.Context) {
	response, err := s.service.GetGames(database.Get(c))
	if err != nil {
		util.AbortWithInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusOK, response)
}
