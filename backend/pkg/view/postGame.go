package view

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func PostGame(c *gin.Context) {
	response := gin.H{"message": "message"}
	c.JSON(http.StatusCreated, response)
}
