install:
	go install github.com/pressly/goose/v3/cmd/goose@latest

migrate:
	goose postgres "user=postgres password=postgres dbname=postgres sslmode=disable" up