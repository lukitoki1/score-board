package server

import "github.com/lukitoki1/score-board/pkg/views"

func (s *ScoreBoardServer) addRoutes() {
	apiGroup := s.engine.Group("/api")

	apiGroup.POST("/games", views.PostGame)
}
