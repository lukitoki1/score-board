# score-board

Football World Cup Score Board

## Prerequisites

* Docker, docker-compose
* Go 1.18
* node.js, yarn

## Running locally

### DB

1. navigate to `db`
2. Execute `make install`
3. Execute `make up`
4. After the DB server started successfully, execute `make migrate`

### Backend server 

1. Navigate to `backend`
2. Execute `make install`
3. Execute `make up`

## Frontend dev server

1. Navigate to `frontend`
2. Execute `make install`
3. Execute `make up`

The App is available at http://localhost:3000

## Further development

### Common

* Remote env deployment/docker-compose deployment
* CI/CD jobs for ensuring code quality and building artifacts
* User authentication and session
* Endpoint rate limiting

### Backend

* Swagger generation
* e2e tests or local tests to test DTO validation
* Implement robust logging
* Extract configuration to local or remote storage; Integrate remote secret manager

### Frontend

* Routing (react-router)
* Custom theming/fonts based on UI design (e.g. Figma)
* Translations (i18n)
* Make layout scalable to mobile screens

## Considerations

It is a good practice to make an entire VCS repository dedicated to one Go module,
but because I wanted to create one monorepo for the entire application,
plus I do not expect anyone to synchronize my module into their app, I decided to create a Go module
in a repository's subdirectory, alongside the frontend app and database migrations.
