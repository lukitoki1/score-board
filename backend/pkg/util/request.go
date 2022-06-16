package util

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/validator"
)

func BindAndValidate(c *gin.Context, request any) error {
	if err := c.ShouldBindJSON(&request); err != nil {
		return fmt.Errorf("failed to bind JSON: %w", err)
	}

	if err := validator.Validate(request); err != nil {
		return fmt.Errorf("failed to validate request: %w", err)
	}

	return nil
}
