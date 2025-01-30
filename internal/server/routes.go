package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:8000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	alreadyShuffled := false

	// API routes
	api := r.Group("/api")
	{
		api.GET("/companies", func(ctx *gin.Context) {

			if !alreadyShuffled {
				err := s.db.ShuffleCompanies()

				if err != nil {
					ctx.JSON(http.StatusInternalServerError, gin.H{
						"error":   "Failed to retrieve companies",
						"details": err.Error(),
					})

					return
				}
				alreadyShuffled = true
			}

			companies, err := s.db.GetCompanies()
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to retrieve companies",
					"details": err.Error(),
				})
				return
			}

			ctx.JSON(http.StatusOK, gin.H{
				"companies": companies,
			})
		})

		api.GET("/reset", func(ctx *gin.Context) {
			err := s.db.ShuffleCompanies()
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to retrieve companies",
					"details": err.Error(),
				})

				return
			}

			ctx.Status(http.StatusOK)
		})
	}

	return r
}
