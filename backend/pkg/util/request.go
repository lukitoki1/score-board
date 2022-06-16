package util

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/lukitoki1/score-board/pkg/validator"
)

func ParseUUIDParam(c *gin.Context, key string) (uuid.UUID, error) {
	id, err := uuid.Parse(c.Param(key))
	if err != nil {
		return uuid.Nil, fmt.Errorf("failed to parse UUID param '%v': %w", key, err)
	}
	return id, err
}

func BindAndValidate(c *gin.Context, request any) error {
	if err := c.ShouldBindJSON(&request); err != nil {
		return fmt.Errorf("failed to bind JSON: %w", err)
	}

	if err := validator.Validate(request); err != nil {
		return fmt.Errorf("failed to validate request: %w", err)
	}

	return nil
}
