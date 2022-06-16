-- +goose Up
-- +goose StatementBegin

CREATE TABLE games
(
    id         UUID        NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    status     VARCHAR(20) NOT NULL,
    home_name  VARCHAR(50) NOT NULL,
    away_name  VARCHAR(50) NOT NULL
);

-- +goose StatementEnd
-- +goose Down
