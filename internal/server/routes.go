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

		api.GET("/company/:id", func(ctx *gin.Context) {
			companyID := ctx.Param("id")

			details, err := s.db.GetCompanyBooleans(companyID)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to retrieve company details",
					"details": err.Error(),
				})

				return
			}

			ctx.JSON(http.StatusOK, details)
		})

		api.GET("/present/:id", func(ctx *gin.Context) {
			companyID := ctx.Param("id")

			err := s.db.ToggleCompanyBoolean("Present", companyID)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to mark company as present",
					"details": err.Error(),
				})

				return
			}

			ctx.Status(http.StatusOK)
		})

		api.GET("/water/:id", func(ctx *gin.Context) {
			companyID := ctx.Param("id")

			err := s.db.ToggleCompanyBoolean("Water", companyID)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to mark company field water",
					"details": err.Error(),
				})

				return
			}

			ctx.Status(http.StatusOK)
		})

		api.GET("/food/:id", func(ctx *gin.Context) {
			companyID := ctx.Param("id")

			err := s.db.ToggleCompanyBoolean("Food", companyID)
			if err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to mark company field food",
					"details": err.Error(),
				})

				return
			}

			ctx.Status(http.StatusOK)
		})
	}

	return r
}
