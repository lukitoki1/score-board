install:
	go install github.com/pressly/goose/v3/cmd/goose@latest

up:
	docker-compose up -d

migrate:
	goose postgres "user=postgres password=postgres dbname=postgres sslmode=disable" up