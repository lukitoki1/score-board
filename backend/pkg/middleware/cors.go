package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lukitoki1/score-board/pkg/util"
	"net/http"
	"strings"
)

func CorsHandler(allowOrigins []string, allowedHeaders []string) gin.HandlerFunc {
	return func(c *gin.Context) {
		currentOrigin := c.Request.Header.Get("Origin")
		if currentOrigin != "" && !isOriginValid(currentOrigin, allowOrigins) {
			errResp := fmt.Errorf("not allowed origin: %s", currentOrigin)
			util.AbortWithForbiddenError(c, errResp)
			return
		}

		allowedHeadersString := strings.Join(allowedHeaders, ", ")

		c.Writer.Header().Set("Access-Control-Allow-Origin", currentOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", allowedHeadersString)

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
		} else {
			c.Next()
		}
	}
}

func isOriginValid(currentOrigin string, validOrigins []string) bool {
	for _, value := range validOrigins {
		validOrigin := strings.TrimSpace(value)

		if validOrigin == "*" {
			return true
		}

		if validOrigin == currentOrigin {
			return true
		}
	}

	return false
}
