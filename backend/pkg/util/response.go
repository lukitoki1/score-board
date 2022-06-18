package util

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AbortWithNotFoundError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusNotFound, "failed to find entity", err)
}

func AbortWithInternalServerError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusInternalServerError, "internal server error occurred", err)
}

func AbortWithValidationError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusBadRequest, "failed to validate request", err)
}

func AbortWithForbiddenError(c *gin.Context, err error) {
	abortWithStatus(c, http.StatusForbidden, "forbidden", err)
}

func abortWithStatus(c *gin.Context, status int, message string, err error) {
	_ = c.AbortWithError(status, fmt.Errorf("%s: %w", message, err))
}
