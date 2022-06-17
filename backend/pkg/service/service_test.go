package service

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/lukitoki1/score-board/pkg/database"
	"github.com/lukitoki1/score-board/pkg/dto"
	"github.com/lukitoki1/score-board/pkg/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
	"gorm.io/gorm"
	"testing"
	"time"
)

func TestLocalService(t *testing.T) {
	suite.Run(t, new(ServiceTestSuite))
}

type ServiceTestSuite struct {
	suite.Suite
	ctx     context.Context
	service *Service
}

func (s *ServiceTestSuite) SetupSuite() {
	s.ctx = context.Background()

	if err := database.Init(); err != nil {
		panic(fmt.Errorf("failed to initialize DB: %w", err))
	}

	s.clearTestDB()
}

func (s *ServiceTestSuite) TearDownTest() {
	s.clearTestDB()
}

func (s *ServiceTestSuite) clearTestDB() {
	db := database.Get(s.ctx)

	if result := db.Where("created_at < ?", time.Now()).Delete(entity.Score{}); result.Error != nil {
		panic(fmt.Errorf("failed to clear score entities: %w", result.Error))
	}

	if result := db.Where("created_at < ?", time.Now()).Delete(entity.Game{}); result.Error != nil {
		panic(fmt.Errorf("failed to clear game entities: %w", result.Error))
	}
}

func (s *ServiceTestSuite) TestCreateGame() {
	db := database.Get(s.ctx)

	//given
	request := newGameDTO("name1", "name2", 1, 2)

	//when
	response, err := s.service.CreateGame(db, request)

	//then
	require.NoError(s.T(), err)

	games := getDBGames(s.T(), db, 1)

	game := games[0]
	assert.Equal(s.T(), game.ID, response.ID)
	assert.Equal(s.T(), request.HomeName, game.HomeName)
	assert.Equal(s.T(), request.AwayName, game.AwayName)
	assert.Equal(s.T(), entity.GameStatusActive, game.Status)

	scores := getDBScores(s.T(), db, 1)

	score := scores[0]
	assert.Equal(s.T(), game.ID, score.GameID)
	assert.Equal(s.T(), request.HomeScore, score.HomeScore)
	assert.Equal(s.T(), request.AwayScore, score.AwayScore)
}

func (s *ServiceTestSuite) TestUpdateGame_GameExists() {
	db := database.Get(s.ctx)

	//given
	createRequest := newGameDTO("name1", "name2", 1, 2)

	response, err := s.service.CreateGame(db, createRequest)
	require.NoError(s.T(), err)

	//when
	updateRequest := newGameDTO("name3", "name4", 3, 4)

	err = s.service.UpdateGame(db, response.ID, updateRequest)

	//then
	require.NoError(s.T(), err)

	games := getDBGames(s.T(), db, 1)

	game := games[0]
	assert.Equal(s.T(), game.ID, response.ID)
	assert.Equal(s.T(), updateRequest.HomeName, game.HomeName)
	assert.Equal(s.T(), updateRequest.AwayName, game.AwayName)
	assert.Equal(s.T(), entity.GameStatusActive, game.Status)

	scores := getDBScores(s.T(), db, 2)

	score := scores[0]
	assert.Equal(s.T(), game.ID, score.GameID)
	assert.Equal(s.T(), updateRequest.HomeScore, score.HomeScore)
	assert.Equal(s.T(), updateRequest.AwayScore, score.AwayScore)

	score = scores[1]
	assert.Equal(s.T(), game.ID, score.GameID)
	assert.Equal(s.T(), createRequest.HomeScore, score.HomeScore)
	assert.Equal(s.T(), createRequest.AwayScore, score.AwayScore)
}

func (s *ServiceTestSuite) TestUpdateGame_GameNotExists() {
	db := database.Get(s.ctx)

	//given
	request := newGameDTO("name1", "name2", 1, 2)

	//when
	err := s.service.UpdateGame(db, uuid.New(), request)

	//then
	require.ErrorIs(s.T(), err, gorm.ErrRecordNotFound)

	_ = getDBGames(s.T(), db, 0)
	_ = getDBScores(s.T(), db, 0)
}

func (s *ServiceTestSuite) TestFinishGame_GameExists() {
	db := database.Get(s.ctx)

	//given
	createRequest := newGameDTO("name1", "name2", 1, 2)

	response, err := s.service.CreateGame(db, createRequest)
	require.NoError(s.T(), err)

	//when
	err = s.service.FinishGame(db, response.ID)

	//then
	require.NoError(s.T(), err)
	games := getDBGames(s.T(), db, 1)

	game := games[0]
	assert.Equal(s.T(), entity.GameStatusFinished, game.Status)
}

func (s *ServiceTestSuite) TestFinishGame_GameNotExists() {
	db := database.Get(s.ctx)
	//given

	//when
	err := s.service.FinishGame(db, uuid.New())

	//then
	require.ErrorIs(s.T(), err, gorm.ErrRecordNotFound)
}

func (s *ServiceTestSuite) TestGetGames_GameExists() {
	//given
	db := database.Get(s.ctx)

	createRequest := newGameDTO("name1", "name2", 3, 2)
	createResponse, err := s.service.CreateGame(db, createRequest)
	require.NoError(s.T(), err)

	//when
	getResponse, err := s.service.GetGames(db)

	//then
	require.NoError(s.T(), err)
	assert.Len(s.T(), getResponse, 1)

	game := getResponse[0]
	assert.Equal(s.T(), createResponse.ID, game.ID)
	assert.Equal(s.T(), createRequest.HomeName, game.HomeName)
	assert.Equal(s.T(), createRequest.AwayName, game.AwayName)
	assert.Equal(s.T(), createRequest.HomeScore, game.HomeScore)
	assert.Equal(s.T(), createRequest.AwayScore, game.AwayScore)
}

func (s *ServiceTestSuite) TestGetGames_GameNotExists() {
	//given
	db := database.Get(s.ctx)

	//when
	getResponse, err := s.service.GetGames(db)

	//then
	require.NoError(s.T(), err)
	assert.Len(s.T(), getResponse, 0)
}

func (s *ServiceTestSuite) TestGetGames_GameFinished() {
	//given
	db := database.Get(s.ctx)

	createResponse, err := s.service.CreateGame(db, newGameDTO("name1", "name2", 0, 0))
	require.NoError(s.T(), err)

	err = s.service.FinishGame(db, createResponse.ID)
	require.NoError(s.T(), err)

	//when
	getResponse, err := s.service.GetGames(db)

	//then
	require.NoError(s.T(), err)
	assert.Len(s.T(), getResponse, 0)
}

func (s *ServiceTestSuite) TestGetGames_SameScoreSum() {
	//given
	db := database.Get(s.ctx)

	createRequest1 := newGameDTO("name1", "name2", 0, 0)
	createResponse1, err := s.service.CreateGame(db, createRequest1)
	require.NoError(s.T(), err)

	createRequest2 := newGameDTO("name1", "name2", 3, 2)
	createResponse2, err := s.service.CreateGame(db, createRequest2)
	require.NoError(s.T(), err)

	createRequest1.HomeScore = 2
	createRequest1.AwayScore = 3
	err = s.service.UpdateGame(db, createResponse1.ID, createRequest1)
	require.NoError(s.T(), err)

	//when
	getResponse, err := s.service.GetGames(db)

	//then
	require.NoError(s.T(), err)
	assert.Len(s.T(), getResponse, 2)

	assert.Equal(s.T(), createResponse1.ID, getResponse[0].ID)
	assert.Equal(s.T(), createResponse2.ID, getResponse[1].ID)
}

func (s *ServiceTestSuite) TestGetGames_MixedConditions() {
	//given
	db := database.Get(s.ctx)

	createResponse1, err := s.service.CreateGame(db, newGameDTO("name1", "name2", 2, 1))
	require.NoError(s.T(), err)

	err = s.service.FinishGame(db, createResponse1.ID)
	require.NoError(s.T(), err)

	createRequest2 := newGameDTO("name1", "name2", 3, 2)
	createResponse2, err := s.service.CreateGame(db, createRequest2)
	require.NoError(s.T(), err)

	createRequest3 := newGameDTO("name1", "name2", 2, 0)
	createResponse3, err := s.service.CreateGame(db, createRequest3)
	require.NoError(s.T(), err)

	createRequest4 := newGameDTO("name1", "name2", 0, 0)
	createResponse4, err := s.service.CreateGame(db, createRequest4)
	require.NoError(s.T(), err)

	createRequest4.HomeScore = 2
	createRequest4.AwayScore = 3
	err = s.service.UpdateGame(db, createResponse4.ID, createRequest4)
	require.NoError(s.T(), err)

	//when
	getResponse, err := s.service.GetGames(db)

	//then
	assert.Len(s.T(), getResponse, 3)
	assert.Equal(s.T(), createResponse4.ID, getResponse[0].ID)
	assert.Equal(s.T(), createResponse2.ID, getResponse[1].ID)
	assert.Equal(s.T(), createResponse3.ID, getResponse[2].ID)
}

func getDBGames(t *testing.T, db *gorm.DB, expectedLen int) []entity.Game {
	var games []entity.Game
	result := db.Order("created_at desc").Find(&games)

	require.NoError(t, result.Error)
	assert.Len(t, games, expectedLen)

	return games
}

func getDBScores(t *testing.T, db *gorm.DB, expectedLen int) []entity.Score {
	var scores []entity.Score
	result := db.Order("created_at desc").Find(&scores)

	require.NoError(t, result.Error)
	assert.Len(t, scores, expectedLen)

	return scores
}

func newGameDTO(homeName, awayName string, homeScore, awayScore int) dto.Game {
	return dto.Game{
		HomeName:  homeName,
		AwayName:  awayName,
		HomeScore: homeScore,
		AwayScore: awayScore,
	}
}
