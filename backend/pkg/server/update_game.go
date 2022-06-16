package server

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/dto"
	"github.com/lukitoki1/score-board/pkg/util"
	"gorm.io/gorm"
	"net/http"
)

func (s *ScoreBoardServer) updateGame(c *gin.Context) {
	gameID, err := util.ParseUUIDParam(c, "gameID")
	if err != nil {
		util.AbortWithValidationError(c, err)
		return
	}

	var request dto.Game
	if err := util.BindAndValidate(c, &request); err != nil {
		util.AbortWithValidationError(c, err)
		return
	}

	response, err := s.service.UpdateGame(database.Get(c), gameID, request)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			util.AbortWithNotFoundError(c, err)
			return
		}

		util.AbortWithInternalServerError(c, err)
		return
	}

	c.JSON(http.StatusCreated, response)
}
