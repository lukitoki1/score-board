package server

func (s *ScoreBoardServer) addRoutes() {
	apiGroup := s.engine.Group("/api")

	apiGroup.POST("/games", s.createGame)
	apiGroup.DELETE("/games/:gameID", s.finishGame)
}
