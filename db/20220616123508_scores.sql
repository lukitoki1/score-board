-- +goose Up
-- +goose StatementBegin

CREATE TABLE scores
(
    id         UUID        NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    home_score SMALLINT    NOT NULL,
    away_score SMALLINT    NOT NULL,
    game_id    UUID        NOT NULL REFERENCES games
);

-- +goose StatementEnd
-- +goose Down
