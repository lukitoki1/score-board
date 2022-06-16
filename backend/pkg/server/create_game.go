package server

import (
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/dto"
	"github.com/lukitoki1/score-board/pkg/util"
	"net/http"
)

func (s *ScoreBoardServer) createGame(c *gin.Context) {
	var request dto.Game
	if err := util.BindAndValidate(c, &request); err != nil {
		util.AbortWithValidationError(c, err)
		return
	}

	response, err := s.service.CreateGame(database.Get(c), request)
	if err != nil {
		util.AbortWithInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusCreated, response)
}
