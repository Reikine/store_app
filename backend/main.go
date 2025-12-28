package main

import (
	"marketplace-backend/config"
	"marketplace-backend/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/status", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Backend Golang & Database Aktif"})
	})

	r.POST("/api/register", controllers.Register)
	r.POST("/api/login", controllers.Login)
	r.Run()
}
