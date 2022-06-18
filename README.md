# score-board

Football World Cup Score Board

## Prerequisites

* Docker, docker-compose
* Go 1.18
* node.js, yarn

## Running locally


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
but because I wanted to create one local docker-compose deployment for the entire application,
plus I do not expect anyone to synchronize my module into their app, I decided to create a Go module
in a repository's subdirectory, alongside the frontend app and database migrations.
