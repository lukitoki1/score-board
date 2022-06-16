package utils

import (
	"fmt"
	"os"
)

func MustGetEnv(key string) (string, error) {
	v := os.Getenv(key)
	if v == "" {
		return "", fmt.Errorf("%s environment variable not set", key)
	}
	return v, nil
}
