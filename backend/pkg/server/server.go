package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/database"
)

const localhostIP = "127.0.0.1"

type ScoreBoardServer struct {
	engine *gin.Engine
}

func New() *ScoreBoardServer {
	return &ScoreBoardServer{}
}

func (s *ScoreBoardServer) Run() error {
	s.engine = gin.Default()
	s.addRoutes()

	if err := s.engine.SetTrustedProxies([]string{localhostIP}); err != nil {
		return fmt.Errorf("failed to set engine trusted proxies: %w", err)
	}

	if err := database.Init(); err != nil {
		return fmt.Errorf("failed to initialize DB: %w", err)
	}

	if err := s.engine.Run(); err != nil {
		return fmt.Errorf("failed to run engine: %w", err)
	}
	return nil
}
