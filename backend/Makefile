build:
	go build -o bin/score-board cmd/score-board/main.go

run:
	DATASOURCE_NAME="host=localhost port=5432 user=postgres password=postgres dbname=postgres sslmode=disable" go run cmd/score-board/main.go

test_local:
	DATASOURCE_NAME="host=localhost port=5432 user=postgres password=postgres dbname=postgres sslmode=disable" go test ./... -v -run "^TestLocal"