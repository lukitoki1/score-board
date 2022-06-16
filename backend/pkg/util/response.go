package util

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AbortWithNotFoundError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusNotFound, "could not find entity", err)
}

func AbortWithInternalServerError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusInternalServerError, "internal server error occurred", err)
}

func AbortWithValidationError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusBadRequest, "failed to bind or validate request", err)
}

func abortWithStatus(c *gin.Context, status int, message string, err error) {
	_ = c.AbortWithError(status, fmt.Errorf("%s: %w", message, err))
}
