package database

import (
	"context"
	"fmt"
	"github.com/lukitoki1/score-board/pkg/util"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var gormDB *gorm.DB

func Init() error {
	dataSourceName, err := getDataSourceName()
	if err != nil {
		return fmt.Errorf("failed to get DB data source name: %w", err)
	}

	gormDB, err = gorm.Open(postgres.Open(dataSourceName), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to open connection: %w", err)
	}

	return nil
}

func Get(ctx context.Context) *gorm.DB {
	if gormDB == nil {
		panic("failed to get DB: not initialized")
	}

	return gormDB.WithContext(ctx)
}

func getDataSourceName() (string, error) {
	return util.MustGetEnv("DATASOURCE_NAME")
}
