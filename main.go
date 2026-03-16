package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "up"})
	})

	router.POST("/company", func(c *gin.Context) {
		name := c.PostForm("name")
		id, err := CreateCompany(name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"id": id})
	})

	router.GET("/company/:id/present", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if err := SetPresent(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	router.GET("/company/:id/water", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if err := SetWater(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	router.GET("/company/:id/food", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		if err := SetFood(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Listen and serve on 0.0.0.0:8080
	router.Run(":8080")
}
