package repo

import (
	"github.com/lukitoki1/score-board/pkg/entity"
	"gorm.io/gorm"
)

func FindGameScores(db *gorm.DB, games *[]entity.GameScore) *gorm.DB {
	queryParams := map[string]any{
		"status": entity.GameStatusActive,
	}

	query := `
		SELECT g.id,
       		g.home_name,
       		g.away_name,
       		s.home_score,
       		s.away_score,
       		(s.home_score + s.away_score) as score_sum
		FROM games g
		JOIN (
			SELECT DISTINCT ON (game_id) game_id,
				created_at,
				id,
				home_score,
				away_score
			FROM scores
			ORDER BY game_id, created_at DESC
		) s on s.game_id = g.id
		WHERE g.status = @status
		ORDER BY score_sum desc, s.created_at desc;`

	return db.Raw(query, queryParams).Find(&games)
}
