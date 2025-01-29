package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	distDir := "./frontend/dist"

	r.Static("/assets", distDir + "/assets")

	r.NoRoute(func(c *gin.Context) {
		c.File(distDir + "/index.html")
	})

	r.Run(":8000")
}
