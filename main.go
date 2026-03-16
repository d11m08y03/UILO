package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Using a group to handle the "/api" prefix from your Flutter code
	api := router.Group("/api")
	{
		// 1. GET COMPANY INFO (The "Lookup" after scanning)
		// Flutter calls: /api/company/:id
		api.GET("/company/:id", func(c *gin.Context) {
			id := c.Param("id") // Removed Atoi - id is now a string

			company, err := GetCompanyByID(id)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			// Returning the fields expected by Flutter: name, present, water, food
			c.JSON(http.StatusOK, gin.H{
				"name":    company.Name,
				"present": company.Present,
				"water":   company.Water, // This maps to database 'has_water'
				"food":    company.Food,  // This maps to database 'has_food'
			})
		})

		api.GET("/reset", func(c *gin.Context) {
			if err := ResetAllStats(); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"status": "all records reset successfully"})
		})

		// 2. SET PRESENT
		// Flutter calls: /api/present/:id
		api.GET("/present/:id", func(c *gin.Context) {
			id := c.Param("id") // Removed Atoi
			if err := SetPresent(id); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		// 3. SET WATER
		// Flutter calls: /api/water/:id
		api.GET("/water/:id", func(c *gin.Context) {
			id := c.Param("id") // Removed Atoi
			if err := SetWater(id); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		// 4. SET FOOD
		// Flutter calls: /api/food/:id
		api.GET("/food/:id", func(c *gin.Context) {
			id := c.Param("id") // Removed Atoi
			if err := SetFood(id); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})
	}

	// Standard health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "up"})
	})

	router.Run(":8080")
}
