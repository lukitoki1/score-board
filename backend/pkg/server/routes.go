package server

func (s *ScoreBoardServer) addRoutes() {
	apiGroup := s.engine.Group("/api")

	apiGroup.POST("/games", s.createGame)
	apiGroup.GET("/games", s.getGames)
	apiGroup.PUT("/games/:gameID", s.updateGame)
	apiGroup.DELETE("/games/:gameID", s.finishGame)
}
