package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/service"
	"github.com/lukitoki1/score-board/pkg/validator"
)

const localhostIP = "127.0.0.1"

type ScoreBoardServer struct {
	engine  *gin.Engine
	service *service.Service
}

func New() *ScoreBoardServer {
	return &ScoreBoardServer{}
}

func (s *ScoreBoardServer) Run() error {
	s.engine = gin.Default()
	s.addRoutes()

	validator.Init()

	if err := s.engine.SetTrustedProxies([]string{localhostIP}); err != nil {
		return fmt.Errorf("failed to set engine trusted proxies: %w", err)
	}

	if err := database.Init(); err != nil {
		return fmt.Errorf("failed to initialize DB: %w", err)
	}

	s.service = service.New()

	if err := s.engine.Run(); err != nil {
		return fmt.Errorf("failed to run engine: %w", err)
	}
	return nil
}
