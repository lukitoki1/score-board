package main

import (
	"fmt"
	"github.com/lukitoki1/score-board/pkg/server"
)

func main() {
	srv := server.New()

	if err := srv.Run(); err != nil {
		panic(fmt.Errorf("server initialization failed: %w", err))
	}
}
