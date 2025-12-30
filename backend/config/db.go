package config

import (
	"log"
	"marketplace-backend/models"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Tidak dapat menemukan file env")
	}
	dsn := os.Getenv("DATABASE_URL")
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Gagal tersambung ke Database")
	}
	database.AutoMigrate(&models.User{}, &models.Product{})
	DB = database
	log.Println("Database berhasil tersambung dan terkoneksi")
}
