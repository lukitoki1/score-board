package entity

import (
	"github.com/google/uuid"
	"time"
)

type Entity struct {
	ID        uuid.UUID `gorm:"primarykey;type:uuid;default:gen_random_uuid()"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
